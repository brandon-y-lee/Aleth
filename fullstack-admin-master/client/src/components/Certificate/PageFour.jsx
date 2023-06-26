import React from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const PageFour = ({ recipient, material, files }) => {
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
          STEP 4 OF 4
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
          Please review your Certificate details below
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
          If you would like to make amendments, click back to make changes.
        </Typography>        
      </Box>
      
      <Card sx={{ width: '75%', m: 4 }}>
        <CardContent>
          <Typography variant="h6">Recipient: {recipient}</Typography>
          <Typography variant="h6">Material: {material}</Typography>
          <Typography variant="h6">Files:</Typography>
          {files.map((file, index) => (
            <Typography key={index} variant="body2">
              {file.name}
            </Typography>
          ))}
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
        }}
      >
        Publish Certificate
      </Button>
    </Box>
  );
};

export default PageFour;