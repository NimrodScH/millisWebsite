import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FormState } from "../Types";

type AcquisitionChannelProps = {
  formState: FormState;
  handleChange: (field: string, value: string) => void;
};

const AcquisitionChannel: React.FC<AcquisitionChannelProps> = ({
  formState,
  handleChange,
}) => (
  <>
    <Box component="fieldset" sx={{ border: "none", mt: 2 }}>
      {formState.errors?.acquisitionChannel ? (
        <Typography sx={{ color: "#D32F2F" }} component="legend">
          איך הגעת אלינו?
        </Typography>
      ) : (
        <Typography component="legend">איך הגעת אלינו?</Typography>
      )}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              id="google"
              name="acquisition"
              value="google"
              checked={formState.enteredValues?.acquisitionChannel?.includes(
                "google"
              )}
              onChange={(e) =>
                handleChange(
                  "acquisitionChannel",
                  e.target.checked ? "google" : ""
                )
              }
            />
          }
          label="גוגל"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="friend"
              name="acquisition"
              value="friend"
              checked={formState.enteredValues?.acquisitionChannel?.includes(
                "friend"
              )}
              onChange={(e) =>
                handleChange(
                  "acquisitionChannel",
                  e.target.checked ? "friend" : ""
                )
              }
            />
          }
          label="המלצה"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="other"
              name="acquisition"
              value="other"
              checked={formState.enteredValues?.acquisitionChannel?.includes(
                "other"
              )}
              onChange={(e) =>
                handleChange(
                  "acquisitionChannel",
                  e.target.checked ? "other" : ""
                )
              }
            />
          }
          label="רשת חברתית"
        />
      </FormGroup>
    </Box>
  </>
);

export default AcquisitionChannel;
