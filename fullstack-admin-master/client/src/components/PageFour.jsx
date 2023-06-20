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
      <Card
        sx={{
          width: '80%',
          mt: 3,
          mb: 3,
          p: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h2" align="center">
            Congratulations, Eren!
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            You have completed the onboarding, you can start using the Eden!
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
        }}
      >
        Launch Eden
      </Button>
    </Box>
  );
};

export default PageFour;
