import React from "react";
import { Box, Button, CircularProgress  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";



const FormActions = (props:{
  handleReset: () => void,
  isFetching: boolean
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        mt: 3,
      }}
    >
      <Button
        sx={{ marginRight: "1rem" }}
        variant="text"
        onClick={props.handleReset}
        color="error"
        endIcon={<DeleteIcon />}
      >
        איפוס
      </Button>
      <Button
        id="submitBtn"
        variant="contained"
        type="submit"
        color="primary"
        endIcon={!props.isFetching ? <SendIcon /> : null}
      >
        {!props.isFetching ? "שלח" : <CircularProgress size={20} color="inherit" />}
      </Button>
    </Box>
  );
};

export default FormActions;
