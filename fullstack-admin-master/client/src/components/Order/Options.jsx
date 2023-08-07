import React, { useState } from 'react';
import { Select, Button, MenuItem, FormControl, InputLabel, IconButton, Box, Input, InputAdornment } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Options = () => {
  const [techPack, setTechPack] = useState('');
  const [orderId, setOrderId] = useState('');
  const [material, setMaterial] = useState('');

  const handleTechPackChange = (event) => {
    setTechPack(event.target.value);
  };

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Tech Pack</InputLabel>
          <Select
            value={techPack}
            onChange={handleTechPackChange}
            label="Tech Pack"
            input={
              <Input
                endAdornment={
                    techPack && (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setTechPack('')}>
                        <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                    )
                }
              />
            }
        >
            {/* Replace with your options */}
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Order ID</InputLabel>
          <Select value={orderId} onChange={handleOrderIdChange} label="Order ID">
            {/* Replace with your options */}
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Material</InputLabel>
          <Select value={material} onChange={handleMaterialChange} label="Material">
            {/* Replace with your options */}
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Options;
