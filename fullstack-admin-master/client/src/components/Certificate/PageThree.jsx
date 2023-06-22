import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

const PageThree = ({ onButtonClick }) => {
  const [singleUser, setSingleUser] = useState(false);
  const [multiUser, setMultiUser] = useState(false);

  const onClickSingleUser = () => {
    setSingleUser((prevSingleUser) => !prevSingleUser);
    setMultiUser(false);
  };

  const onClickMultiUser = () => {
    setMultiUser((prevMultiUser) => !prevMultiUser);
    setSingleUser(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onButtonClick("pagefour");
  };

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
          Share entity certificates, files, or other information
        </Typography>
      </Box>
      <Box sx={{ width: '75%', mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          Please upload your files below. You can choose to make it transparent or private.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
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