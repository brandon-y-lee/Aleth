import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, useTheme, Dialog, DialogTitle, DialogContent, CircularProgress, List, ListItem, ListItemButton, ListItemText, Breadcrumbs } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import './UploadTechPack.css';
import { useProcessTechPackMutation } from 'state/api';
import { useCreateNewTechPackAndSearchQueriesMutation } from 'state/api';
import PurchaseForm from '../PurchaseForm';
import ConfirmTechPack from '../ConfirmTechPack';
import { useGetEligibleSellersAdvancedQuery } from "state/api";
import FlexBetween from 'components/FlexBetween';
import { useTechPack } from '../TechPackContext';


const UploadTechPack = ({ updateSearchResults, buyerId, buyerType }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({});

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [techPackParams, setTechPackParams] = useState([]);
  const [subPage, setSubPage] = useState(null);
  const [tempSubPage, setTempSubPage] = useState(null);
  const [selectedSubPageIndex, setSelectedSubPageIndex] = useState(null);

  const [processPdf, { data, error }] = useProcessTechPackMutation();
  const [createNewTechPack] = useCreateNewTechPackAndSearchQueriesMutation();
  const { setTechPackData } = useTechPack();

  const path = {
    removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
    saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save'
  };

  let { data: searchResultsAdvanced } = useGetEligibleSellersAdvancedQuery({
    products: formData.productCategory ? formData.productCategory : undefined, 
    material: formData.materialType ? formData.materialType : undefined,
    fabricConstruction: formData.fabricConstruction ?formData.fabricConstruction : undefined,
    certifications : ""
  });

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenManualDialog = () => setOpenDialog(true);
  const handleCloseManualDialog = () => setOpenDialog(false);

  const handleSearch = (values) => {
    setFormData(values);
    console.log('Form Data Values: ', values);
  };

  const handleFileSelect = args => {
    // Get the file from the selected event
    const selectedFile = args.filesData[0].rawFile;
    setFiles([selectedFile]);
  };

  const [showProcessedDataDialog, setShowProcessedDataDialog] = useState(false);
  const handleOpenProcessedDataDialog = () => setShowProcessedDataDialog(true);
  const handleCloseProcessedDataDialog = () => setShowProcessedDataDialog(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Files:', files);
    setIsLoading(true);
    setShowProcessedDataDialog(true);

    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);

      try {
        await processPdf(formData);
        console.log("PDF processed:", data);
      } catch (err) {
        console.error('Error processing PDF:', err);
      }
    }

    setIsLoading(false);
  };


  const handleBreadcrumbClick = () => {
    setSubPage(null);
    setSelectedSubPageIndex(null);
  };

  const handleListItemClick = (index) => {
    setSubPage(techPackParams[index]);
    setTempSubPage({ ...techPackParams[index] });
    setSelectedSubPageIndex(index);
  };

  const handleTextFieldChange = (key, value) => {
    if (tempSubPage) {
      setTempSubPage({
        ...tempSubPage,
        [key]: value,
      });
    }
  };

  const handleSaveChanges = () => {
    if (selectedSubPageIndex !== null && tempSubPage) {
      const updatedParams = [...techPackParams];
      updatedParams[selectedSubPageIndex] = tempSubPage;
      setTechPackParams(updatedParams);
    }
  };

  const handleSubmitTechPack = async () => {
    try {
      const payload = {
        techPackParams: techPackParams,
        buyerId: buyerId,
        buyerType: buyerType,
        sku: sku,
        product: name,
      };

      // Make the API call using the mutation hook
      const response = await createNewTechPack(payload);
      if (response.data && response.data.newTechPack && response.data.newTechPack.queries.length > 0) {
        console.log('New Tech Pack created successfully: ', response.data.newTechPack);
        setTechPackData(response.data.newTechPack);
        handleCloseProcessedDataDialog();
      }
    } catch (error) {
      console.error('Error creating Tech Pack:', error);
    }
  };

  useEffect(() => {
    updateSearchResults(searchResultsAdvanced);
  }, [searchResultsAdvanced]);

  useEffect(() => {
    console.log("showProcessedDataDialog state:", showProcessedDataDialog);
  }, [showProcessedDataDialog]);

  useEffect(() => {
    if (data && data.tableData) {
      setTechPackParams(data.tableData);
    }

    if (error) {
      console.error('Error processing PDF:', error);
    }
  }, [data, error]);

  useEffect(() => {
    console.log("techPackParams:", techPackParams);
    console.log("selectedSubPageIndex:", selectedSubPageIndex);
  }, [techPackParams, selectedSubPageIndex]);  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1 }}>
        <Typography variant="h5" color="black" sx={{ fontWeight: '600' }}>
          UPLOAD PRODUCT
        </Typography>
      </Box>

      <TextField
        label="Product Name"
        variant="outlined"
        value={name}
        onChange={event => setName(event.target.value)}
        sx={{ backgroundColor: 'white' }}
      />
      <TextField
        label="Product #"
        variant="outlined"
        value={sku}
        onChange={event => setSku(event.target.value)}
        sx={{ backgroundColor: 'white' }}
      />
    
      <UploaderComponent asyncSettings={path} multiple={false} selected={handleFileSelect} />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: 'white', 
          color: 'black', 
          '&:hover': {
          backgroundColor: theme.palette.secondary[400],
          color: 'white',
          },
        }}  
      >
        Upload and Process
      </Button>
      <Dialog
        open={showProcessedDataDialog}
        onClose={handleCloseProcessedDataDialog}
        maxWidth="md"
        PaperProps={{ style: { maxHeight: '60vh', maxWidth: '60vw', minHeight: '60vh', minWidth: '60vw' } }}
      >
        <DialogTitle>Review & Edit Materials</DialogTitle>
        <DialogContent  sx={{ height: '60vh', width: '60vw' }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Breadcrumbs aria-label="breadcrumb" separator='|'>
                <Button color="inherit" onClick={handleBreadcrumbClick}>
                  {`${name}`}
                </Button>
                {subPage && (
                  <Typography color="textPrimary">{`${subPage.item} - ${subPage.fabric}`}</Typography>
                )}
              </Breadcrumbs>
              {!subPage ? (
                <>
                  <List>
                    {techPackParams.map((param, index) => (
                      <ListItemButton key={index} onClick={() => handleListItemClick(index)}>
                        <ListItemText primary={`${param.item} - ${param.fabric}`} secondary={param.description} />
                      </ListItemButton>
                    ))}
                  </List>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="inherit" onClick={handleSubmitTechPack}>
                      Submit
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <List sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <TextField
                      label="Item"
                      value={tempSubPage ? tempSubPage.item : ''}
                      onChange={(e) => handleTextFieldChange('item', e.target.value)}
                    />
                    <TextField
                      label="Material"
                      value={tempSubPage ? tempSubPage.fabric : ''}
                      onChange={(e) => handleTextFieldChange('fabric', e.target.value)}
                    />
                    <TextField
                      label="Fabric Construction"
                      value={tempSubPage ? tempSubPage.fabricConstruction : ''}
                      onChange={(e) => handleTextFieldChange('fabricConstruction', e.target.value)}
                    />
                    <TextField
                      label="Description"
                      value={tempSubPage ? tempSubPage.description : ''}
                      onChange={(e) => handleTextFieldChange('description', e.target.value)}
                    />
                  </List>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button startIcon={<SaveOutlined />} variant="contained" color="primary" onClick={handleSaveChanges}>
                      Save
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UploadTechPack;
