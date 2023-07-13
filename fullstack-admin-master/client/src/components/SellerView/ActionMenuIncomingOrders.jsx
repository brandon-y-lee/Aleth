import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { useUpdateOrderMutation } from "state/api";
import { OrderStatus } from "configs/OrderStatus";
import { RequestType } from "configs/RequestType";
import { getLoggedInUser } from "utils/auth";

const ActionMenuIncomingOrders = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userInfo = getLoggedInUser();
    const userId = userInfo._id;
    const [openDialog, setOpenDialog] = useState(false);
    const [updateOrder, { isLoading: updatingOrder }] = useUpdateOrderMutation();
    const [notes, setNotes] = React.useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewDetails = () => {
        setOpenDialog(true);
    };

    const handleAccept = () => {
        updateOrder({ requestType: RequestType.SELLERACCEPT, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true, notes })
        .unwrap()
        .then(() => {
          console.log("Order Accepted Successfully successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error accepting order:", error);
        });
    };

    const handleReject = () => {
        updateOrder({ requestType: RequestType.SELLERREJECT, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true })
        .unwrap()
        .then(() => {
          console.log("Order rejected Successfully successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error rejecting order:", error);
        });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

  return (
    <div>
      <IconButton
        variant="contained"
        color= "primary"
        onClick={handleClick}
      >
        <MoreHorizIcon color="action" />
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleViewDetails}>View Details</MenuItem>
      </Menu>
      
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
                    <Typography variant="h6">Material: {props.orderData.material.join(", ")}</Typography>
                    <Typography variant="h6">Price Range: {props.orderData.priceRange.join(" - ")}</Typography>
                    <Typography variant="h6">Unit Weight: {props.orderData.unitWeight}</Typography>
                    <Typography variant="h6">Pattern Print: {props.orderData.patternPrint}</Typography>
                    <Typography variant="h6">Color: {props.orderData.color}</Typography>
                    <Typography variant="h6">Country Of Origin: {props.orderData.countryOfOrigin}</Typography>
                    <Typography variant="h6">Quantity: {props.orderData.quantity}</Typography>
                    <Typography variant="h6">Delivery Date: {new Date(props.orderData.deliveryDate).toLocaleDateString()}</Typography>

                    <TextField 
                        sx={{marginTop: 2}}
                        id="outlined-basic" 
                        label="Add additional notes here.." 
                        variant="outlined" 
                        fullWidth
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </DialogContent>
        <DialogActions>
          <Button onClick={handleReject} color="secondary">
            Reject
          </Button>
          <Button onClick={handleAccept} color="secondary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default ActionMenuIncomingOrders;
