import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from './Link';
import Session from 'react-session-api';
import { useUpdateOrderMutation } from "state/api";
import { OrderStatus } from "configs/OrderStatus";
import { RequestType } from "configs/RequestType";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import {  Button } from '@mui/material'; // Updated import statements


const ActionMenuIncomingOrders = (props) => {

    console.log(props);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userId = Session.get("username");
    const [openDialog, setOpenDialog] = useState(false);
    const [updateOrder, { isLoading: updatingOrder }] = useUpdateOrderMutation();
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccept = () => {
        console.log(props);
        updateOrder({ requestType: RequestType.SELLERACCPET, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true })
          .unwrap()
          .then(() => {
            // window.location.reload(false);
            console.log("Order Accepted Successfully successfully!");
            // onClose();
          })
          .catch((error) => {
            console.error("Error accepting order:", error);
          });
      };

    const handleReject = () => {
        // console.log(this);
        updateOrder({ requestType: RequestType.SELLERREJECT, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true })
          .unwrap()
          .then(() => {
            window.location.reload(false);
            console.log("Order Accepted Successfully successfully!");
            // onClose();
          })
          .catch((error) => {
            console.error("Error accepting order:", error);
          });
      };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    let acceptRejectMenu = [];
    if(props.orderData.sellerStatuses[userId] == OrderStatus.NEWORDER)
    {
        acceptRejectMenu.push(
            <MenuItem key="1" onClick={handleAccept}>
                Accept Order
            </MenuItem>
        );

        acceptRejectMenu.push(
          <MenuItem key="2" onClick={handleReject}>
                Reject Order
            </MenuItem>
        );
    }

    else if(props.orderData.sellerStatuses[userId] == OrderStatus.SELLERACCEPT)
        acceptRejectMenu.push(
            <MenuItem key="1" onClick={handleReject}>
                Reject Order
            </MenuItem>
        )
    else if(props.orderData.sellerStatuses[userId] == OrderStatus.SELLERDENIED)
        acceptRejectMenu.push(
            <MenuItem key="1" onClick={handleAccept}>
                Accept Order
            </MenuItem>
        )

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
        sx={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
    
      {acceptRejectMenu}
      <Dialog open={openDialog}>
        <DialogTitle>Check Status</DialogTitle>
        <DialogContent>
          {/* Add content here */}
          {/* <Typography>Status: {text} </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        
      </Menu>
    </div>
  );
};

export default ActionMenuIncomingOrders;