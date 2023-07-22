import React, { useState } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import './UploadTechPack.css';
import { useProcessPdfMutation } from 'state/api';


const UploadTechPack = () => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [processPdf, { isLoading, data, error }] = useProcessPdfMutation();

  const path = {
    removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
    saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save'
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Files:', files);
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      // Use the first file from the files array
      // const file = files[0];

      try {
        await processPdf(formData);
      } catch (err) {
        console.error('Error processing PDF:', err);
      }
    }
    // Here you can handle the submission e.g. send the data somewhere
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        
      <Typography variant="h5" color="black" align="left" sx={{ fontWeight: '600', pl: 1 }}>
        UPLOAD TECH PACK
      </Typography>
      <TextField
        label="Tech Pack Name"
        variant="outlined"
        value={name}
        onChange={event => setName(event.target.value)}
        sx={{
            backgroundColor: 'white',
        }}
      />
      <TextField
        label="Tech Pack Description"
        variant="outlined"
        multiline
        rows={3}
        value={description}
        onChange={event => setDescription(event.target.value)}
        sx={{
            backgroundColor: 'white',
        }}
      />
      <UploaderComponent asyncSettings={path} multiple={false} />
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
