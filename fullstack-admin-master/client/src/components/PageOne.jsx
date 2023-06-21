import React from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const PageOne = ({ onButtonClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',
        bgcolor: 'background.default',
        m: 1,
        color: 'text.primary',
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Let's start by finding the recipient of your Certificate
        </Typography>
      </Box>
      <Box sx={{ width: '75%' }}>
        <Typography variant="body1" gutterBottom>
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
