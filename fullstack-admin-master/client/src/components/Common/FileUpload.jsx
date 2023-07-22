import React, { useState, useCallback } from 'react';
import { Box, Typography, Button, useTheme, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const Input = styled('input')({
  display: 'none',
});

function FileUpload({ onFilesChange }) {
  const theme = useTheme();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const onFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
    onFilesChange([...event.target.files]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onFileDrop = (event) => {
    event.preventDefault();
    const files = [...event.dataTransfer.files];
    setSelectedFiles(files);
    onFilesChange(files);
  };

  const removeFile = useCallback((file) => {
    setSelectedFiles(prevFiles => prevFiles.filter(prevFile => prevFile !== file));
  }, []);

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
      }}
      onDragOver={onDragOver}
      onDrop={onFileDrop}
    >
      <Box
        onClick={() => {
          document.getElementById('file-input').click();
        }}
        sx={{
          textAlign: 'center',
          cursor: 'pointer',
          width: '100%',
          height: 144,
          bgcolor: 'white',
          border: '1px solid #BCBCBC',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Input
          id="file-input"
          type="file"
          onChange={onFileChange}
          multiple
        />
        <Typography variant="body2" color="text.secondary">
          Drag and drop files here, or click to select files
        </Typography>
      </Box>

      <List>
        {selectedFiles.map(file => (
          <ListItem key={file.name}>
            <ListItemText primary={file.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeFile(file)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileUpload;
