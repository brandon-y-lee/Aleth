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
import TextField from '@mui/material/TextField';
import {  Button } from '@mui/material'; // Updated import statements


const ActionMenuIncomingOrders = (props) => {

    console.log(props);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userId = Session.get("username");
    const [openDialog, setOpenDialog] = useState(false);
    const [updateOrder, { isLoading: updatingOrder }] = useUpdateOrderMutation();
    const [notes, setNotes] = React.useState('');

    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccept = () => {
        setOpenDialog(true);
        // updateOrder({ requestType: RequestType.SELLERACCPET, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true })
        //   .unwrap()
        //   .then(() => {
        //     // window.location.reload(false);
        //     console.log("Order Accepted Successfully successfully!");
        //     // onClose();
        //   })
        //   .catch((error) => {
        //     console.error("Error accepting order:", error);
        //   });
      };

    const handleReject = () => {
        // console.log(this);
        updateOrder({ requestType: RequestType.SELLERREJECT, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true })
          .unwrap()
          .then(() => {
            window.location.reload(false);
            console.log("Order rejected Successfully successfully!");
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
      {/* <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}fullWidth maxWidth="md">
        <DialogTitle>Confirm order?</DialogTitle>
        <DialogContent>

          <TextField 
            id="outlined-basic" 
            label="Add Notes (optional)" 
            variant="outlined" 
            fullWidth
            onChange={(e) => setNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button type="button"
          fullWidth
          variant="contained"
          color="secondary" 
          onClick={() => {
              setOpenDialog(false);
              updateOrder({ requestType: RequestType.SELLERACCPET, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true})
              .unwrap()
              .then(() => {
                // window.location.reload(false);
                console.log("Order Accepted Successfully successfully!");
                // onClose();
              })
              .catch((error) => {
                console.error("Error accepting order:", error);
              });
            }}
          >
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog> */}

<Dialog open={openDialog} onClose={() => {setOpenDialog(false)}} fullWidth maxWidth="md">
  <DialogTitle>Check Status</DialogTitle>
  <DialogContent>
    {/* Add content here */}
    <TextField 
      id="outlined-basic" 
      label="Add Notes" 
      variant="outlined" 
      fullWidth
      onChange={(e) => setNotes(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} color="secondary">
      Close
    </Button>
    <Button onClick={() => {
        setOpenDialog(false);
        updateOrder({ requestType: RequestType.SELLERACCPET, sellerIds:[userId], orderId:[props.orderData._id], isSeller: true, notes })
        .unwrap()
        .then(() => {
          console.log("Order Accepted Successfully successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error accepting order:", error);
        });
      }
    } color="secondary">
      Confirm Order
    </Button>
  </DialogActions>
</Dialog>
        
      </Menu>
    </div>
  );
};

export default ActionMenuIncomingOrders;