import React, { useEffect, useRef, useState } from 'react';
import InfoWindow from 'components/InfoWindow';

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
            markersRef.current[newIndex].setFocus();
        }
    };

    const closeInfoWindow = () => {
        setActiveMarkerIndex(null); // close InfoWindow
    }

    const initMap = async () => {
        // Load the Maps JavaScript API library
        const { Map, Marker, Polyline } = await window.google.maps.importLibrary('maps');

        const map = new Map(mapRef.current, {
            center: { lat: 10.99835602, lng: 77.01502627 },
            zoom: 2,
        });

        // Create markers and polyline
        if(props.locations && props.locations.shipmentChain)
        {
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
                    marker.setFocus();
                });
                
                // console.log(marker);
                return marker;
            });
        }

        polylineRef.current = new Polyline({
            path: getPolylinePath(props.locations.shipmentChain),
            geodesic: true,
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2,
            map,
        });

        // Clean up on unmount
        return () => {
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];
            polylineRef.current.setMap(null);
            polylineRef.current = null;
        };
    };

    function getPolylinePath(shipmentArray){
        let pPath = []
        shipmentArray.map((shipment,_) => pPath.push({"lat":parseFloat(shipment.coordinates[0].$numberDecimal), "lng":parseFloat(shipment.coordinates[1].$numberDecimal)}))
        console.log(pPath);
        return pPath;
    }

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
                lat={props[activeMarkerIndex].lat}
                lng={props[activeMarkerIndex].lng}
                onClose={closeInfoWindow}
                title={props[activeMarkerIndex].name}
              />
            )}
        </div>
    );
};

export default Map;