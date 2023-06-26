import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import FileUpload from "components/FileUpload";

const PageThree = ({ onButtonClick, setFiles }) => {
  const handleFilesChange = (files) => {
    setFiles(files);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        bgcolor: 'background.default',
        m: 1,
        color: 'text.primary',
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography 
          variant="h4"
          component="h1"
          gutterTop
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '30px',
            letterSpacing: '0.01em',
            color: '#33654D',
          }}
        >
          STEP 3 OF 4
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: 550,
            fontSize: '20px',
            lineHeight: '30px',
            textAlign: 'center',
            letterSpacing: '0.01em',
            color: '#000000',
          }}
        >
          Share entity certificates, files, or other information
        </Typography>
      </Box>
      
      <Box sx={{ width: '75%' }}>
        <Typography 
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '12px',
            lineHeight: '18px',
            textAlign: 'center',
            letterSpacing: '0.01em',
            color: '#000000',
          }}
          gutterBottom
        >
          Please upload your files below. You can choose to make it transparent or private.
        </Typography>
      </Box>

      <Box sx={{ width: '75%', m: 4 }}>
        <FileUpload onFilesChange={handleFilesChange} />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => onButtonClick("pagefour")}
        sx={{
          mt: 3,
        }}
      >
        Next Step
      </Button>
    </Box>
  );
};

export default PageThree;