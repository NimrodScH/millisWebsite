import React from "react";
import { Grid, TextField } from "@mui/material";
import { FormState } from "../Types";

type NameFieldsProps = {
  formState: FormState;
  handleChange: (field: string, value: string) => void;
};

const InputFields: React.FC<NameFieldsProps> = ({
  formState,
  handleChange,
}) => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="firstName"
          label="שם פרטי"
          value={formState.enteredValues["firstName"]}
          error={!!formState.errors["firstName"]}
          helperText={formState.errors["firstName"]}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="שם משפחה"
          value={formState.enteredValues["lastName"]}
          error={!!formState.errors["lastName"]}
          helperText={formState.errors["lastName"]}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </Grid>
    </Grid>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          id="email"
          label="דואר אלקטרוני"
          type="email"
          value={formState.enteredValues.email}
          error={!!formState.errors["email"]}
          helperText={formState.errors["email"]}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          id="phone"
          label="מספר פלאפון"
          type="tel"
          value={formState.enteredValues?.phone}
          error={!!formState.errors["phone"]}
          helperText={formState.errors["phone"]}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </Grid>
    </Grid>
  </>
);

export default InputFields;
