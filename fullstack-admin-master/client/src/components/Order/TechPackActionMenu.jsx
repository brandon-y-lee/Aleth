import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useDeleteTechPackMutation } from "state/api";

const TechPackActionMenu = ({ techPackData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTechPack, { isLoading }] = useDeleteTechPackMutation();

  console.log('techPackData: ', techPackData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    deleteTechPack({ techPackId: techPackData._id })
      .unwrap()
      .then(() => {
        console.log("TechPack deleted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting TechPack:", error);
      });
    handleDeleteDialogClose();
  };

  return (
    <div>
      <IconButton
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <MoreHorizIcon color="action" />
      </IconButton>
      <Menu
        id="tech-pack-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDeleteDialogOpen}>Delete</MenuItem>
      </Menu>
      
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete TechPack</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this TechPack? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TechPackActionMenu;
