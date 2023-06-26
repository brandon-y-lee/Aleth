import { React, useState } from "react";
import { 
  Box, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme } from "@mui/material";
import {
    DownloadOutlined,
    UploadFileOutlined
  } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Outgoing from "components/Outgoing";

const RequestsButton = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openOutgoing, setOpenOutgoing] = useState(false);

  const handleOutgoingClick = () => {
    setOpenOutgoing(true);
  };

  const handleCloseOutgoing = () => {
    setOpenOutgoing(false);
  };

  return (
    <Box>
      <FlexBetween gap="1rem">
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={handleOutgoingClick}
        >
          <UploadFileOutlined sx={{ mr: "10px" }} />
          Your Requests
        </Button>
      </FlexBetween>

      <Outgoing open={openOutgoing} onClose={handleCloseOutgoing} />
    </Box>
  );
};

export default RequestsButton;