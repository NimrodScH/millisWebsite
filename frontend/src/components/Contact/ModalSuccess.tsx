import React from "react";
import { Modal, Box, Typography } from "@mui/material";

type ModalSuccessProps = {
  open: boolean;
  handleClose: () => void;
  handleReset: () => void;
};

const ModalSuccess: React.FC<ModalSuccessProps> = ({
  open,
  handleClose,
  handleReset,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        handleReset();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "rgba(255, 138, 66, 1)",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "#fff" }}
        >
          טופס נשלח בהצלחה
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: "#fff" }}>
          ניצור קשר בהקדם!
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalSuccess;
