import React, { useEffect, useRef, useState } from 'react';
import InfoWindow from 'components/InfoWindow';
import { json } from 'react-router-dom';

// Replace the path prop with actual data
const Map = (props) => {
    console.log(props);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);
    const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

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
        console.log(pairs);
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
        console.log(pairs);
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
            console.log("Getting here")
            markersRef.current = props.locations.shipmentChain.map((point, index) => {
                console.log(point);
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
            });
    

                // let pPairs = getPolylinePath(props.locations.shipmentChain);
                // console.log(pPairs);
                // var polygons = [];
                
                // for(var i in pPairs)
                // {   
                //     var arr = [];

                //     for (var j = 0; j < pPairs[i].length; j++) {
                //         console.log(pPairs);
                //         arr.push(new window.google.maps.LatLng(
                //             parseFloat(pPairs[i][j][0]),
                //             parseFloat(pPairs[i][j][1])
                //         ));
                //         bounds.extend(arr[arr.length - 1])
                //     }
                //     map.fitBounds(bounds);
                //     console.log(arr);
                //     polygons.push(new window.google.maps.Polyline({
                //     path: arr,
                //     strokeColor: '#FF0000',
                //     strokeOpacity: 0.8,
                //     strokeWeight: 2,
                //     fillColor: '#FF0000',
                //     fillOpacity: 0.35
                //     }));
                    
                //     polygons[polygons.length - 1].setMap(map);
                // }
            
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
    
    return (
        <div ref={mapRef} style={{ height: "80vh", width: "100%" }}>
            {activeMarkerIndex !== null && (
                <InfoWindow
                    lat={props.locations.shipmentChain[activeMarkerIndex].coordinates[0].$numberDecimal}
                    lng={props.locations.shipmentChain[activeMarkerIndex].coordinates[1].$numberDecimal}
                    onClose={closeInfoWindow}
                    title={props.locations.shipmentChain[activeMarkerIndex].name}
                />
            )}
        </div>
    );
};

export default Map;