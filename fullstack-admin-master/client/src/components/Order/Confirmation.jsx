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
  TextField
} from '@mui/material';
import { useCreateNewOrderMutation } from "state/api";

const Confirmation = ({ open, onClose, data }) => {
  const [createOrder, { isLoading: creatingOrder }] = useCreateNewOrderMutation();
  const [newFields, setNewFields] = useState([]);

  const handleSubmit = async () => {
    data["CustomParams"]={};
    const updatedData = { ...data };
    newFields.forEach(field => {
      updatedData["CustomParams"][field] = "";
    });

    try {
      console.log(updatedData);
      // await createOrder(updatedData);
      console.log("Order created successfully!");
      onClose();
      // window.location.reload();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleAddField = () => {
    setNewFields([...newFields, ""]);
  };

  const handleFieldChange = (index, event) => {
    const values = [...newFields];
    values[index] = event.target.value;
    setNewFields(values);
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

        <u>Additional Quote Requirements (optional)</u>
        
        {newFields.map((field, index) => (
          <div key={index}>
          <TextField 
            sx={{marginTop:1, margin:1}}
            key={index}
            label="Quote" 
            value={field} 
            onChange={(event) => handleFieldChange(index, event)} 
          />
          </div>

        ))}
        <Button variant="contained" onClick={handleAddField}>Add Field</Button>
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
