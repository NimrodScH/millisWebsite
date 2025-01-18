import { useActionState, useState } from "react";
import { Box } from "@mui/material";
import InputFields from "./Fields/InputFields";
import ReasonField from "./Fields/ReasonField";
import AcquisitionChannel from "./Fields/AcquisitionChannel";
import TermsAndConditions from "./Fields/TermsAndConditions";
import AdditionalInfo from "./Fields/AdditionalInfo";
import FormActions from "./FormActions";
import ModalSuccess from "./ModalSuccess";
import validate from "./FormValidation";
import { FormState, initialFormState, Payload } from "./Types";

export default function muiForm() {
  const [isFetching, setFetching] = useState(false);
  const [formState, action] = useActionState<FormState, Payload>(
    (currentState, payload) => {
      if (payload.field === "errors" && typeof payload.value === "object") {
        return {
          ...currentState,
          errors: payload.value as { [key: string]: string | null },
        };
      }

      return {
        ...currentState,
        enteredValues: {
          ...currentState.enteredValues,
          [payload.field]: payload.value as string,
        },
        errors: {
          ...currentState.errors,
          [payload.field]: payload.skipValidation
            ? null
            : validate(payload.field, payload.value as string),
        },
      };
    },
    initialFormState
  );

  const handleChange = (field: string, value: string) => {
    action({ field, value });
  };

  const handleReset = () => {
    Object.keys(formState.enteredValues).forEach((key) => {
      action({ field: key, value: "", skipValidation: true });
    });
    Object.keys(formState.errors).forEach((key) => {
      action({ field: key, value: "", skipValidation: true });
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasErrors = false;

    const updatedErrors: { [key: string]: string | null } = {};

    Object.keys(formState.enteredValues).forEach((key) => {
      const typedKey = key as keyof typeof formState.enteredValues;
      const value = !formState.enteredValues[typedKey]
        ? ""
        : formState.enteredValues[typedKey];
      const error = validate(typedKey, value);
      updatedErrors[typedKey] = error;

      if (error) {
        hasErrors = true;
      }
    });
    action({
      field: "errors",
      value: updatedErrors,
      skipValidation: true,
    });

    if (hasErrors) {
      console.log("Form has errors. Fix them before submitting.");
      console.log("Updated Errors:", updatedErrors);
      console.log("Has Errors:", hasErrors);
      return;
    }

    console.log("Form submitted successfully:", formState.enteredValues);

    try {
      setFetching(true);
      const response = await fetch("http://localhost:3000/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState.enteredValues),
      });

      if (response.ok) {
        console.log("Form data successfully sent!");
        setFetching(false);
        handleOpen();
        setTimeout(() => {
          handleClose()
          handleReset()
        }, 3000);
      } else {
        console.error("Error submitting form:", await response.text());
      }
    } catch (error) {
      setFetching(false)
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        borderRadius: "8px",
        padding: "3rem",
        maxWidth: "600px",
        mb: "3rem",
        mt: "3rem",
      }}
      noValidate
      autoComplete="on"
    >
      <InputFields formState={formState} handleChange={handleChange} />
      <ReasonField formState={formState} handleChange={handleChange} />
      <AcquisitionChannel formState={formState} handleChange={handleChange} />
      <AdditionalInfo formState={formState} handleChange={handleChange} />
      <TermsAndConditions formState={formState} handleChange={handleChange} />
      <FormActions handleReset={handleReset} isFetching={isFetching} />
      <ModalSuccess
        open={open}
        handleClose={handleClose}
        handleReset={handleReset}
      />
    </Box>
  );
}
