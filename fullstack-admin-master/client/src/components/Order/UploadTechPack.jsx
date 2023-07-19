import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import FileUpload from '../Common/FileUpload';
import { useProcessPdfMutation } from 'state/api';


const UploadTechPack = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [processPdf, { isLoading, data, error }] = useProcessPdfMutation();


  const handleFilesChange = (files) => {
    setFiles(files);
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
        
      <Typography variant="h5" color="black" align="left" sx={{ fontWeight: '500', pl: 1 }}>
        Tech Pack
      </Typography>
      <TextField
        label="Tech Pack Name"
        variant="outlined"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <TextField
        label="Tech Pack Description"
        variant="outlined"
        multiline
        rows={3}
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <FileUpload onFilesChange={handleFilesChange} />
      <Button variant="contained" color="primary" type="submit">Submit</Button>
    </Box>
  );
};

export default UploadTechPack;
