import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const PageOne = ({ onButtonClick, setRecipient }) => {

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
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
          STEP 1 OF 4
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
          Let's start by finding the recipient of your Certificate
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
          Type the name of their company, or paste their company ID into the search field below.
        </Typography>        
      </Box>
      
      <Box sx={{ width: '50%', m: 4 }}>
        <TextField
          id="recipient"
          label="Select Your Recipient"
          variant="outlined"
          placeholder="Contact Name or ID"
          fullWidth
          margin="normal"
          onChange={handleRecipientChange}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => onButtonClick("pagetwo")}
        sx={{
          mt: 3,
        }}
      >
        Proceed
      </Button>
    </Box>
  );
};

export default PageOne;