import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, useTheme, Dialog, DialogContent } from '@mui/material';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import './UploadTechPack.css';
import { useProcessPdfMutation } from 'state/api';
import PurchaseForm from '../PurchaseForm';
import { useGetEligibleSellersAdvancedQuery } from "state/api";


const UploadTechPack = ({ updateSearchResults }) => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [processPdf, { isLoading, data, error }] = useProcessPdfMutation();

  let {data: searchResultsAdvanced, isLoading: isLoadingSearchResultsAdvanced} = useGetEligibleSellersAdvancedQuery({
    products: formData.productCategory ? formData.productCategory : undefined, 
    material: formData.materialType ? formData.materialType : undefined,
    fabricConstruction: formData.fabricConstruction ?formData.fabricConstruction : undefined,
    certifications : ""
  });

  console.log('Search Results Advanced: ', searchResultsAdvanced);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const path = {
    removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
    saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save'
  };

  const handleFileSelect = args => {
    // Get the file from the selected event
    const selectedFile = args.filesData[0].rawFile;
    setFiles([selectedFile]);
  };
    
  const handleSearch = (values) => {
    console.log(values);
    setFormData(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Files:', files);
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);

      try {
        await processPdf(formData);
      } catch (err) {
        console.error('Error processing PDF:', err);
      }
    }
    // Here, handle the submission e.g. send the data somewhere
  };

  useEffect(() => {
    updateSearchResults(searchResultsAdvanced);
  }, [searchResultsAdvanced]);  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <Typography variant="h5" color="black" sx={{ fontWeight: '600' }}>
          UPLOAD TECH PACK
        </Typography>
        <Typography variant="h5" color="black" sx={{ fontWeight: '400', mx: 1 }}>
          or
        </Typography>
        <Button onClick={handleOpenDialog} sx={{ backgroundColor: 'white', color: 'black', fontWeight: '600' }}>
          MANUALLY SEARCH
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <PurchaseForm onSearch={handleSearch} />
          </DialogContent>
        </Dialog>
      </Box>

      <TextField
        label="Tech Pack Name"
        variant="outlined"
        value={name}
        onChange={event => setName(event.target.value)}
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Tech Pack Description"
        variant="outlined"
        multiline
        rows={3}
        value={description}
        onChange={event => setDescription(event.target.value)}
        sx={{ backgroundColor: 'white' }}
      />
      <UploaderComponent asyncSettings={path} multiple={false} selected={handleFileSelect} />
      <Button
        variant="contained"
        type="submit"
        sx={{
            backgroundColor: 'white', 
            color: 'black', 
            '&:hover': {
            backgroundColor: theme.palette.secondary[400],
            color: 'white',
            },
        }}
        >
        Submit
      </Button>
    </Box>
  );
};

export default UploadTechPack;
