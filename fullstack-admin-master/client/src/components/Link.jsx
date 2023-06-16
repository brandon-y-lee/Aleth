import { React, useEffect, useState } from 'react';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  ListItemText,
  ListItem,
  List,
  ListItemButton
} from '@mui/material';

// Need to add shipments prop
const Link = ({ open, onClose }) => {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (open) {
      setChecked([]);
    }
  }, [open]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Link To Received Shipment</DialogTitle>
      <DialogContent>
        <List>
          {/*
          {shipments.map((shipment) => (
            <ListItemButton key={shipment.id} onClick={handleToggle(shipment.id)}>
              <Checkbox
                edge="start"
                checked={checked.indexOf(shipment.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`ID: ${shipment.id}, Seller: ${shipment.seller}, Material: ${shipment.material}, Amount: ${shipment.amount}, Unit: ${shipment.unit}, Date: ${shipment.date}`} />
            </ListItemButton>
          ))}
          */}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>Cancel</Button>
        <Button onClick={() => {
          // handle submit here
          console.log(checked);
          onClose();
        }}>Confirm & Link</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Link;