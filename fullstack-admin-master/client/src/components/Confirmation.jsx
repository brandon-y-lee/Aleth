import { React, useEffect, useState } from 'react';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Checkbox,
  ListItemText,
  List,
  ListItemButton
} from '@mui/material';
import { useCreateNewOrderMutation } from "state/api";


const Confirmation = ({ open, onClose, data }) => {
  const [createOrder, { isLoading: creatingOrder }] = useCreateNewOrderMutation();

  const handleSubmit = async () => {
    try {
      await createOrder(data);
      console.log("Order created successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Your Selection</DialogTitle>
      <DialogContent>
        {Object.entries(data).map(([key, value]) => (
          <Typography variant="body1" key={key}>{`${key}: ${value}`}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          style={{"backgroundColor":"#00994c"}}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Confirmation;