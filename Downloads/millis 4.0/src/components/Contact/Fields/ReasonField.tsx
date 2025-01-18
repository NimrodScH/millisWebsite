import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FormState } from "../Types";

type ReasonFieldProps = {
  formState: FormState;
  handleChange: (field: string, value: string) => void;
};

const ReasonField: React.FC<ReasonFieldProps> = ({
  formState,
  handleChange,
}) => (
  <FormControl fullWidth>
    {formState.errors?.contactingReason ? (
      <InputLabel sx={{ color: "#D32F2F" }} id="contactingReason-label">
        סיבת הפניה?
      </InputLabel>
    ) : (
      <InputLabel id="contactingReason-label">סיבת הפניה?</InputLabel>
    )}

    <Select
      required
      labelId="contactingReason-label"
      id="contactingReason"
      name="contactingReason"
      value={formState.enteredValues?.contactingReason || ""}
      error={!!formState.errors["contactingReason"]}
      onChange={(e) => handleChange("contactingReason", e.target.value)}
    >
      <MenuItem value="הצעת מחיר">הצעת מחיר</MenuItem>
    </Select>
  </FormControl>
);

export default ReasonField;
