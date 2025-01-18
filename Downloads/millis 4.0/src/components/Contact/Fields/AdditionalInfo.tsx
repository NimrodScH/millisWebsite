import React from "react";
import { TextField } from "@mui/material";
import { FormState } from "../Types";

type AdditionalInfoProps = {
  formState: FormState;
  handleChange: (field: string, value: string) => void;
};

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  formState,
  handleChange,
}) => (
  <TextField
    fullWidth
    multiline
    rows={4}
    id="textBox"
    label="מידע נוסף"
    value={formState.enteredValues?.textBox}
    onChange={(e) => handleChange("textBox", e.target.value)}
  />
);

export default AdditionalInfo;
