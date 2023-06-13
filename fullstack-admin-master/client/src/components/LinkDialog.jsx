import { React, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';

const LinkDialog = ({ open, onClose }) => {
  const [checked, setChecked] = useState([]);

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
      <DialogTitle>Link Shipments</DialogTitle>
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
              <ListItemText primary={`ID: ${shipment.id}, Seller: ${shipment.seller}, Material: ${shipment.material}, Amount: ${shipment.amount}, Unit: ${shipment.unit}, Date: ${shipment.date}, Certificates: ${shipment.certificates}`} />
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

export default LinkDialog;