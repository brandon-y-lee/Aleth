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
import Certificate from "components/Certificate/Certificate";

const NotificationButton = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openCertificate, setOpenCertificate] = useState(false);

    const handleCertificateClick = () => {
      setOpenCertificate(true);
    };
  
    const handleCloseCertificate = () => {
      setOpenCertificate(false);
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
              onClick={handleCertificateClick}
            >
              <UploadFileOutlined sx={{ mr: "10px" }} />
              Incoming Requests
            </Button>
          </FlexBetween>

          <Dialog open={openCertificate} onClose={handleCloseCertificate}>
            <DialogTitle
              sx={{
                textAlign: 'center',
                fontWeight: 'semibold',
                fontSize: '1.5rem',
                margin: '1rem',
              }}
            >
              Incoming Requests
            </DialogTitle>
            <DialogContent>
              <Certificate />
            </DialogContent>
          </Dialog>
        </Box>
    );
};

export default NotificationButton;