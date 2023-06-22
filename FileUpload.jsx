//Good UI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useCallback } from 'react';
import { Box, Typography, Button, useTheme} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import ProgressBar from 'react-progressbar';

const Input = styled('input')({
  display: 'none',
});

const FileUpload = () => {
    const theme = useTheme();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});

    const onFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onFileDrop = (event) => {
        event.preventDefault();
        const files = [...event.dataTransfer.files];
        setSelectedFiles(files);
    };

    const onSubmit = useCallback(() => {
        const formData = new FormData();

        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        axios.post('your_upload_url_here', formData, {
            onUploadProgress: (progressEvent) => {
                let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(prevState => ({
                    ...prevState,
                    [progressEvent.loaded]: progress,
                }));
            }
        }).then(response => {
            console.log(response);
            setSelectedFiles([]);
            setUploadProgress({});
        }).catch(error => {
            console.log(error);
        });
    }, [selectedFiles]);

    const removeFile = useCallback((file) => {
        setSelectedFiles(prevFiles => prevFiles.filter(prevFile => prevFile !== file));
    }, []);

    return (
        <Box 
            sx={{
                mt: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
            }}
            onDragOver={onDragOver}
            onDrop={onFileDrop}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    mb: 2,
                    fontFamily: 'Poppins, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '30px',
                    textAlign: 'left',
                    letterSpacing: '0.01em',
                    color: theme.palette.secondary[200],
                    userSelect: 'none',
                }}
            >
                Upload Files
            </Typography>
            <Box
                onClick={() => {
                    document.getElementById('file-input').click();
                }}
                sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    width: '50%',
                    height: 144,
                    bgcolor: 'rgba(235, 235, 235, 0.5)',
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

            <Button 
                variant="contained" 
                size="large" 
                onClick={onSubmit}
                sx={{ 
                    mt: 2,
                    textTransform: 'none',
                    backgroundColor: '#ffffff',
                    color: theme.palette.secondary[200],
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            >
                Upload
            </Button>

            {selectedFiles.map(file => (
                <Box key={file.name} sx={{ width: '50%', mt: 2 }}>
                    <Typography variant="body2">{file.name}</Typography>
                    {uploadProgress[file.name] !== undefined && uploadProgress[file.name] !== 100 ? (
                        <ProgressBar completed={uploadProgress[file.name]} />
                    ) : (
                        <Button onClick={() => removeFile(file)} sx = {{ color: theme.palette.secondary[200] }} >
                            X
                        </Button>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default FileUpload;


// Attempt at Fancy UI ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import { Box, Typography, Button, useTheme } from "@mui/material";
// import { styled } from "@mui/system";
// import Uploady, { useItemProgressListener, useItemAbortHandler, useItemFinishListener } from "@rpldy/uploady";
// import UploadButton from "@rpldy/upload-button";

// const Input = styled('input')({
//   display: 'none',
// });

// const UploadItemProgress = ({ id }) => {
//   const progressData = useItemProgressListener(id);
//   return (
//     <div>
//       {progressData ? Math.round(progressData.completed) + "%" : null}
//     </div>
//   );
// };

// const UploadItem = ({ item }) => {
//   const abort = useItemAbortHandler(item.id);
//   const finished = useItemFinishListener(item.id);

//   return (
//     <div>
//       {item.file.name}
//       {finished ? (
//         <Button onClick={abort} color="primary">X</Button>
//       ) : (
//         <UploadItemProgress id={item.id} />
//       )}
//     </div>
//   );
// };

// const FileUpload = () => {
//   const theme = useTheme();

//   return (
//     <Uploady
//       destination={{ url: "your_upload_url_here" }}
//       multiple
//     >
//       <Box m="1.5rem 2.5rem">
//         <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: '1.75rem', fontWeight: 'bold', mb: 2 }}>
//           Let's start by finding the recipient of your Certificate
//         </Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'flex-start',
//             justifyContent: 'space-between',
//             flexDirection: 'column',
//             backgroundColor: '#F5F5F5',
//             border: '1px solid #E0E0E0',
//             borderRadius: 2,
//             p: 2,
//           }}
//         >
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//             Upload Files
//           </Typography>
//           <UploadButton
//             id="file-input"
//             accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
//           >
//             <Box
//               sx={{
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 backgroundColor: '#FFFFFF',
//                 border: '1px dashed #BDBDBD',
//                 borderRadius: 2,
//                 p: 2,
//                 mt: 2,
//               }}
//             >
//               <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                 Drag or click to upload files
//               </Typography>
//             </Box>
//           </UploadButton>
//           <UploadButton
//             variant="contained"
//             size="large"
//             sx={{ mt: 2, textTransform: 'none', backgroundColor: '#ffffff', color: theme.palette.secondary[200], '&:hover': { backgroundColor: '#f0f0f0' } }}
//           >
//             Upload
//           </UploadButton>
//         </Box>
//         <Typography variant="body2" sx={{ mt: 2 }}>
//           You can either start typing the name of their company, or simply copy and paste their company ID into the search field below.
//         </Typography>
//       </Box>
//     </Uploady>
//   );
// };

// export default FileUpload;



//Fancier UI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useState, useCallback } from 'react';
// import { Box, Typography, Button , useTheme} from '@mui/material';
// import { styled } from '@mui/system';

// const Input = styled('input')({
//   display: 'none',
// });

// const FileUpload = () => {
//     const theme = useTheme();

//     const [selectedFile, setSelectedFile] = useState();

//     const onFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const onDragOver = (event) => {
//         event.preventDefault();
//     };

//     const onFileDrop = (event) => {
//         event.preventDefault();
//         const files = event.dataTransfer.files;
//         if (files.length) {
//             setSelectedFile(files[0]);
//         }
//     };

//     const onSubmit = useCallback(() => {
//         const formData = new FormData();

//         formData.append('file', selectedFile);

//         fetch('your_upload_url_here', {
//             method: 'POST',
//             body: formData
//         }).then(response => {
//             console.log(response);
//         }).catch(error => {
//             console.log(error);
//         });
//     }, [selectedFile]);

//     return (
//         <Box m="1.5rem 2.5rem">
//             <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: '1.75rem', fontWeight: 'bold', mb: 2}}>
//                 Let's start by finding the recipient of your Certificate
//             </Typography>
//             <Box 
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     justifyContent: 'space-between',
//                     flexDirection: 'column',
//                     backgroundColor: '#F5F5F5',
//                     border: '1px solid #E0E0E0',
//                     borderRadius: 2,
//                     p: 2,
//                 }}
//                 onDragOver={onDragOver}
//                 onDrop={onFileDrop}
//             >
//                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Upload Files
//                 </Typography>
//                 <Box
//                     onClick={() => {
//                         document.getElementById('file-input').click();
//                     }}
//                     sx={{
//                         textAlign: 'center',
//                         cursor: 'pointer',
//                         backgroundColor: '#FFFFFF',
//                         border: '1px dashed #BDBDBD',
//                         borderRadius: 2,
//                         p: 2,
//                         mt: 2,
//                     }}
//                 >
//                     <Input
//                         id="file-input"
//                         type="file"
//                         onChange={onFileChange}
//                         accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
//                     />
//                     <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                         {selectedFile ? selectedFile.name : 'Drag or click to upload files'}
//                     </Typography>
//                 </Box>
//                 <Button 
//                     variant="contained" 
//                     size="large" 
//                     onClick={onSubmit}
//                     sx={{ mt: 2, textTransform: 'none', backgroundColor: '#ffffff', color: theme.palette.secondary[200], '&:hover': { backgroundColor: '#f0f0f0' } }}
//                 >
//                     Upload
//                 </Button>
//             </Box>
//             <Typography variant="body2" sx={{ mt: 2 }}>
//                 You can either start typing the name of their company, or simply copy and paste their company ID into the search field below.
//             </Typography>
//         </Box>
//     );
// };

// export default FileUpload;
