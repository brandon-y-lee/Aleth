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

const CertificateButton = () => {
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
                backgroundColor: theme.palette.secondary[200],
                color: "white",
                fontSize: "14px",
                fontWeight: "semibold",
                padding: "10px 20px",
              }}
              onClick={handleCertificateClick}
            >
              <UploadFileOutlined sx={{ mr: "10px" }} />
              Create Certificate
            </Button>
          </FlexBetween>

          <Dialog open={openCertificate} onClose={handleCloseCertificate}>
            <DialogTitle
              sx={{
                fontFamily: 'Poppins, sans-serif',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '1.5rem',
                margin: '1rem',
              }}
            >
              Create Your Shipment Certificate
            </DialogTitle>
            <DialogContent>
              <Certificate />
            </DialogContent>
          </Dialog>
        </Box>
    );
};

export default CertificateButton;