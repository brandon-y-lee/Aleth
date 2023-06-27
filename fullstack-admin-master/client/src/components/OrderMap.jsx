import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import PurchaseForm from 'components/PurchaseForm';


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
        if (props.locations && props.locations.eligibleSellers) {
            markersRef.current = props.locations.eligibleSellers.map((point, index) => {
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

            markersRef.current.push(
                new window.google.maps.Marker({
                    position: { lat: props.coordinates[0], lng: props.coordinates[1] },
                    map,
                    title: "Your Location",
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    },
                })
            );            

            console.log(markersRef.current);            

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

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <div ref={mapRef} style={{ height: "100%", width: "100%" }}/>
            </Grid>
            <Grid item xs={4}>
                <PurchaseForm onSearch={props.handleSearch} />
            </Grid>
        </Grid>
    );
};

export default OrderMap;