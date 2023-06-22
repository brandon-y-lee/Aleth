import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import SupplierCard from './SupplierDetails/SupplierCard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


// Replace the path prop with actual data
const OrderMap = (props) => {
    console.log(props);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
    const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState(null);


    const handleKeyDown = (event) => {
        // Check if the target of the event is a marker
        if (event.target.markerIndex !== undefined) {
            let newIndex;

            // Calculate the new index based on the key that was pressed
            if (event.key === 'Enter' || event.key === ' ') {
                console.log("Pressed Enter");
                setActiveMarkerIndex(event.target.markerIndex); // open InfoWindow
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                newIndex = (event.target.markerIndex + 1) % markersRef.current.length;
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                newIndex = (event.target.markerIndex - 1 + markersRef.current.length) % markersRef.current.length;
            }

            // Set the focus to the new marker
            focusMarker(newIndex);
        };
    };

    const focusMarker = (index) => {
        const marker = markersRef.current[index];
        if (marker) {
            const map = marker.getMap();
            map.panTo(marker.getPosition());
        };
    };

    const closeInfoWindow = () => {
        setActiveMarkerIndex(null); // close InfoWindow
    };

    const initMap = async () => {
        // Load the Maps JavaScript API library
        const { Map, Marker } = await window.google.maps.importLibrary('maps');

        const map = new Map(mapRef.current, {
            center: { lat: 10.99835602, lng: 77.01502627 },
            zoom: 5,
        });

        var bounds = new window.google.maps.LatLngBounds();

        // Create markers and polyline
        if (props.locations && props.locations.shipmentChain) {
            markersRef.current = props.locations.shipmentChain.map((point, index) => {
                const position = {
                    lat: parseFloat(point.coordinates[0].$numberDecimal), 
                    lng: parseFloat(point.coordinates[1].$numberDecimal)
                };

                const marker = new window.google.maps.Marker({
                    position,
                    map,
                    title: `#${index + 1}`,
                });

                marker.markerIndex = index;

                // Add a click listener to focus the marker when it's clicked
                marker.addListener('click', () => {
                    setActiveMarkerIndex(index);
                });

                marker.addListener('mouseover', () => {
                    setHoveredMarkerIndex(index);
                });
            
                // Add a mouseout listener to clear the hovered marker index
                marker.addListener('mouseout', () => {
                    setHoveredMarkerIndex(null);
                });

                bounds.extend(position);

                return marker;
            });

            map.fitBounds(bounds);
        }

        // Clean up on unmount
        return () => {
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
        };
    };

    useEffect(() => {
        // Call the initMap function
        initMap();
    
        // Keydown event listener
        window.addEventListener('keydown', handleKeyDown);
    
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [props]);

    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
             temporary
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </React.Fragment>
      );

    const elems = props.locations.shipmentChain.map((elem,index) => (
        <ListItem
            alignItems="flex-start"
            key={elem.id}
            component="div" // Change the component from "li" to "div"
        >
            <SupplierCard place={{"name":elem.name}} selected = {1} refProp={1} color={hoveredMarkerIndex === index ? 'gainsboro' : 'transparent'}/>
        </ListItem>
      ));

    console.log(elems);

    return (
        <Grid container spacing={2}>
            <Grid item xs={8} display="flex">
                <div ref={mapRef} style={{ height: "40vh", width: "100%" }}/>
            </Grid>
            
            <Grid item xs={4} display="flex">
                <Paper style={{maxHeight: "40vh", overflow: 'auto'}}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {elems}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OrderMap;