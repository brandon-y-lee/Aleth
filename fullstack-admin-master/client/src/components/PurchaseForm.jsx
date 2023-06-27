import React from 'react';
import { Button, TextField, Box, useTheme } from '@mui/material';
import { useFormik } from 'formik';

const PurchaseForm = ({ onSearch }) => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      style: '',
      description: '',
      material: '',
      color: '',
      yardPiece: '',
    },
    onSubmit: values => {
      console.log(values);
      onSearch(values);
    },
  });

  const handleClear = () => {
    formik.resetForm();
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        gridColumn="span 4"
        gridRow="span 3"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor={theme.palette.background.alt}
        component="form"
        onSubmit={formik.handleSubmit}
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
          onChange={formik.handleChange}
          value={formik.values.style}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Description"
          id="description"
          autoComplete="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="material"
          label="Material"
          id="material"
          autoComplete="material"
          onChange={formik.handleChange}
          value={formik.values.material}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="color"
          label="Color"
          id="color"
          autoComplete="color"
          onChange={formik.handleChange}
          value={formik.values.color}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="yardPiece"
          label="Yard/Piece"
          id="yardPiece"
          autoComplete="yardPiece"
          onChange={formik.handleChange}
          value={formik.values.yardPiece}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
        >
          Search
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleClear}
        >
          Reset
        </Button>
      </Box>
    </form>
  );
};

export default PurchaseForm;