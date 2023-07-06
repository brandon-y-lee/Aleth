import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const PageTwo = ({ onButtonClick, setMaterial }) => {
  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
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
          STEP 2 OF 4
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
          Let's define your material
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
          Please select material you are working with and how much of it you want to sell.
        </Typography>
      </Box>

      <Box sx={{ width: '50%', m: 4 }}>
        <TextField
          id="material"
          label="Material"
          variant="outlined"
          placeholder="Ex: 100% organic cotton"
          fullWidth
          margin="normal"
          onChange={handleMaterialChange}
        />
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        onClick={() => onButtonClick("pagethree")}
        sx={{
          mt: 3,
        }}
      >
        Continue
      </Button>
    </Box>    
  );
};

export default PageTwo;