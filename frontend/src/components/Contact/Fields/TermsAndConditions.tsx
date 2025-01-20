import React from "react";
import { Box, Typography, FormControl, Checkbox } from "@mui/material";
import { FormState } from "../Types";

type TermsAndConditionsProps = {
  formState: FormState;
  handleChange: (field: string, value: string) => void;
};

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  formState,
  handleChange,
}) => (
  <Box sx={{marginLeft:"0"}}>
        <Checkbox
          id="terms"
          name="terms"
          checked={!!formState.enteredValues.terms}
          onChange={(e) => {
            console.log("Checkbox clicked, current state:", e.target.checked);
            handleChange("terms", e.target.checked ? "true" : "");
          }}
    />
    {formState.errors?.terms ? (
      <Typography sx={{ color: "#D32F2F", margin:"auto" }} component="label">
        אני מסכים לתנאים ולשירותים
      </Typography>
    ) : (
      <Typography component="label">אני מסכים לתנאים ולשירותים</Typography>
    )}
  </Box>
);

export default TermsAndConditions;
