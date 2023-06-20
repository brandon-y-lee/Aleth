import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material'; // Updated import statements
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Updated import
import PhoneIcon from '@mui/icons-material/Phone'; // Updated import
import Rating from '@mui/material/Rating'; // Updated import
// import useStyles from './styles.js';

const SupplierCard = ({ place, selected, refProp, color }) => {
  // if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6} sx={{width:"400px"}}>
      {/* <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      /> */}
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
          <Typography gutterBottom variant="body2" color="textSecondary" className={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
          }}>
            <LocationOnIcon />{"123 Main Street, Anytown, USA"}
          </Typography>
        )}
        { (
          <Typography variant="body2" color="textSecondary" className={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <PhoneIcon /> {"+41-534-2352121"}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" style={{"background-color":"#00994c"}} onClick={() => window.open(place.web_url, '_blank')}>
          Go to Supplier Analytics
        </Button>
      </CardActions>
    </Card>
  );
};

export default SupplierCard;
