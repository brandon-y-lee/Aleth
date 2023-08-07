import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmTechPack = ({ techPackData, onConfirm, onClose }) => {
    const [openDialog, setOpenDialog] = useState(true);

    const handleClose = () => {
        setOpenDialog(false);
        onClose();
    };

    return (
        <Dialog open={openDialog} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>EDIT DETAILS & SEARCH</DialogTitle>
            <DialogContent>
                {/* You can replace these with the actual tech pack data fields */}
                <Typography variant="h6">Tech Pack Name: {techPackData.name}</Typography>
                <Typography variant="h6">Tech Pack Description: {techPackData.description}</Typography>
                <Typography variant="h6">Material: {techPackData.material}</Typography>
                <Typography variant="h6">Product Category: {techPackData.productCategory}</Typography>
                {/* Add more fields as necessary */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button 
                    onClick={() => {
                        onConfirm();
                        handleClose();
                    }}
                    color="secondary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmTechPack;
