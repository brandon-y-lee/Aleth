import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material'; // Updated import statements
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Updated import
import PhoneIcon from '@mui/icons-material/Phone'; // Updated import
import Rating from '@mui/material/Rating'; // Updated import
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// import useStyles from './styles.js';


const SupplierCard = ({ place, selected, refProp, color }) => {
  // if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState("Loading");

  const url = "https://7wzrynoxje.execute-api.us-west-1.amazonaws.com/v1/getWeather";

  async function fetchDataWithJsonBody(url = '', jsonBody = {}) {
      // The data we are going to send in our request
      const payload = {
          method: 'POST', // or 'PUT'
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBody) // We convert the JSON body to a string
      };

      try {
          // We send the request
          const response = await fetch(url, payload);

          // We throw an error if the request was unsuccessful
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          // We convert the response to JSON
          const jsonData = await response.json();
          return jsonData;
      } catch (error) {
          console.error(`Failed to fetch from the URL ${url}. Error: ${error}`);
          return null;
      }
  }

  async function setDialogText()
  {
    setDialogOpen(true);
    await fetchDataWithJsonBody(url, {"a":"test"}).then((data) => setText(data["a"]));
  }

  return (
    <Card elevation={6} sx={{width:"400px"}}>
      <CardContent sx={{backgroundColor:color}}>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(2)} readOnly />
        </Box>
       
        <Box display="flex" justifyContent="space-between">
         
        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        { (
          <Typography gutterBottom variant="body2" color="textSecondary" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
          }}>
            <LocationOnIcon />{"123 Main Street, Anytown, USA"}
          </Typography>
        )}
        { (
          <Typography variant="body2" color="textSecondary" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <PhoneIcon /> {"+41-534-2352121"}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" style={{"backgroundColor":"#00994c"}} onClick={() => window.open(place.web_url, '_blank')}>
          Go to Supplier Analytics
        </Button>
        <Button size="small" color="primary" style={{"backgroundColor":"#00994c"}} onClick={setDialogText} >
          Check Status
        </Button>
      </CardActions>

      <Dialog open={dialogOpen} onClose={() => {setText("Loading"); setDialogOpen(false)}}>
        <DialogTitle>Check Status</DialogTitle>
        <DialogContent>
          {/* Add content here */}
          <Typography>Status: {text} </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SupplierCard;
