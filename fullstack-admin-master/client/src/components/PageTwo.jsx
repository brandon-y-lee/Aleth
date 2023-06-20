import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const PageTwo = ({ onButtonClick }) => {
  const [material, setMaterial] = useState("");

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
        height: '40vh',
        bgcolor: 'background.default',
        m: 1,
        color: 'text.primary',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Let's define your material
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please select material you are working with and how much of it you want to sell.
      </Typography>
      <TextField
        id="material"
        label="Material"
        variant="outlined"
        placeholder="Ex: 100% organic cotton"
        fullWidth
        margin="normal"
        value={material}
        onChange={handleMaterialChange}
      />
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
