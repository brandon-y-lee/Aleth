import React, { useEffect, useRef, useState } from 'react';
import InfoWindow from 'components/InfoWindow';
import { json } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import SupplierCard from './SupplierDetails/SupplierCard';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemContent } from '@mui/joy';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


// Replace the path prop with actual data
const Map = (props) => {
    console.log(props);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);
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

    function getPolylinePath(shipmentArray){
        console.log("Here");
        const data = shipmentArray;
        const pairs = [];
        const idToObject = {};

        // Create a dictionary to map object IDs to their corresponding objects
        data.forEach(obj => {
        idToObject[obj.id] = obj;
        }); 

        // Generate pairs where a.next = b.id
        data.forEach(obj => {
            const nextId = obj.next;
            if (nextId && idToObject[nextId]) {
                const a = obj.coordinates;
                const b = idToObject[nextId].coordinates;
                pairs.push([ [a[0].$numberDecimal,a[1].$numberDecimal], [b[0].$numberDecimal, b[1].$numberDecimal]]);
            }
        });
        return pairs;
    }

    function getPolylinePath(shipmentArray){
        console.log("Here");
        const data = shipmentArray;
        const pairs = [];
        const idToObject = {};

        // Create a dictionary to map object IDs to their corresponding objects
        data.forEach(obj => {
        idToObject[obj.id] = obj;
        }); 

        // Generate pairs where a.next = b.id
        data.forEach(obj => {
            const nextId = obj.next;
            if (nextId && idToObject[nextId]) {
                const a = obj.coordinates;
                const b = idToObject[nextId].coordinates;
                pairs.push([ [a[0].$numberDecimal,a[1].$numberDecimal], [b[0].$numberDecimal, b[1].$numberDecimal]]);
            }
        });
        return pairs;
    }

    const initMap = async () => {
        // Load the Maps JavaScript API library
        const { Map, Marker, Polyline } = await window.google.maps.importLibrary('maps');

        const map = new Map(mapRef.current, {
            center: { lat: 10.99835602, lng: 77.01502627 },
            zoom: 5,
        });

        var bounds = new window.google.maps.LatLngBounds();

        // Create markers and polyline
        if (props.locations && props.locations.shipmentChain) {
            markersRef.current = props.locations.shipmentChain.map((point, index) => {
                const marker = new window.google.maps.Marker({
                    position: {
                        lat: parseFloat(point.coordinates[0].$numberDecimal), 
                        lng: parseFloat(point.coordinates[1].$numberDecimal)
                    },
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
            
            });
    

                let pPairs = getPolylinePath(props.locations.shipmentChain);
                var polygons = [];
                
                for(var i in pPairs)
                {   
                    var arr = [];

                    for (var j = 0; j < pPairs[i].length; j++) {
                        arr.push(new window.google.maps.LatLng(
                            parseFloat(pPairs[i][j][0]),
                            parseFloat(pPairs[i][j][1])
                        ));
                        bounds.extend(arr[arr.length - 1])
                    }
                    map.fitBounds(bounds);
                    polygons.push(new window.google.maps.Polyline({
                    path: arr,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35
                    }));
                    
                    polygons[polygons.length - 1].setMap(map);
                }
            
        }

        // Clean up on unmount
        return () => {
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
            polylineRef.current.setMap(null);
            polylineRef.current = null;
        };
    };


    useEffect(() => {
        // Call the initMap function
        initMap();
    
        // Add the keydown event listener
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
            sx={{  
                // backgroundColor: hoveredMarkerIndex === index ? 'grey' : 'transparent',
            }}
            key={elem.id}
            component="div" // Change the component from "li" to "div"
        >
          
            <SupplierCard place={{"name":elem.name}} selected = {1} refProp={1} color={hoveredMarkerIndex === index ? 'gainsboro' : 'transparent'}></SupplierCard>

        </ListItem>

      ));

    console.log(elems);

    return (
        <Grid container spacing={2}>
            <Grid item xs={8} display="flex">
                <div ref={mapRef} style={{ height: "70vh", width: "100%" }}>
                </div>
            </Grid>
            
            <Grid item xs={4} display="flex">
                <Paper style={{maxHeight: "70vh", overflow: 'auto'}}>
                    
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {elems}
                    </List>
                </Paper>
            </Grid>
</Grid>
    );
};

export default Map;