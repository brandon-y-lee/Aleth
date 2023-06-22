import React, { useState } from 'react';
import { Button, TextField, Box, useTheme } from '@mui/material';
// import { useForm } from 'react-hook-form';

const PurchaseForm = () => {
  const theme = useTheme();
  // const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 3"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      backgroundColor={theme.palette.background.alt}
      component="form"
      onSubmit={onSubmit}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="style"
        label="Style"
        name="style"
        autoComplete="style"
        autoFocus
        // {...register('style', { required: 'Style is required' })}
        // error={Boolean(errors.style)}
        // helperText={errors.style?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="description"
        label="Description"
        id="description"
        autoComplete="description"
        // {...register('description', { required: 'Description is required' })}
        // error={Boolean(errors.description)}
        // helperText={errors.description?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="material"
        label="Material"
        id="material"
        autoComplete="material"
        // {...register('material', { required: 'Material is required' })}
        // error={Boolean(errors.material)}
        // helperText={errors.material?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="color"
        label="Color"
        id="color"
        autoComplete="color"
        // {...register('color', { required: 'Color is required' })}
        // error={Boolean(errors.color)}
        // helperText={errors.color?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="yardPiece"
        label="Yard/Piece"
        id="yardPiece"
        autoComplete="yardPiece"
        // {...register('yardPiece', { required: 'Yard/Piece is required' })}
        // error={Boolean(errors.yardPiece)}
        // helperText={errors.yardPiece?.message}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default PurchaseForm;
