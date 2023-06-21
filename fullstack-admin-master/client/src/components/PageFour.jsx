import React from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const PageFour = () => {
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
          Please review your Certificate details below
        </Typography>
      </Box>
      <Box sx={{ width: '75%' }}>
        <Typography variant="body1" gutterBottom>
          If you would like to make amendments, click back to make changes.
        </Typography>
      </Box>
      
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