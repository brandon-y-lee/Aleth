import { React, useEffect, useState } from 'react';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useCreateNewOrderMutation } from "state/api";

const Confirmation = ({ open, onClose, data }) => {
  console.log(data);
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
        <List>
          {Object.entries(data).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText 
                primary={<Typography variant="h6">{key}</Typography>} 
                secondary={<Typography variant="body1">{Array.isArray(value) ? value.join(', ') : value}</Typography>} 
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
