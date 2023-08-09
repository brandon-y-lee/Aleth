import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, List, ListItem, ListItemText, Button } from '@mui/material';
import { useGetEligibleSellersAdvancedQuery } from "state/api";

const AddSupplier = ({ open, onClose, searchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');

    let {data: searchResultsAdvanced, isLoading: isLoadingSearchResultsAdvanced} = useGetEligibleSellersAdvancedQuery({
        products: 'Tops',
        material: undefined,
        fabricConstruction: undefined,
        certifications : ""
    });

    const handleSearch = () => {
        // Call the API with the searchTerm here
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Add Supplier</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
                <List>
                    {searchResults.map((supplier) => (
                        <ListItem key={supplier.id} button onClick={() => {/* Add to user's network logic */}}>
                            <ListItemText primary={supplier.Company} secondary={supplier.Description} />
                        </ListItem>
                    ))}
                </List>
                <div>
                    <p>Invite a Supplier:</p>
                    <TextField
                        fullWidth
                        value="Generated link for inviting suppliers will go here"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddSupplier;
