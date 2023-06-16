import React, { useEffect, useRef } from 'react';

// Replace the path prop with actual data
const Map = ({ path }) => {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);

    const handleKeyDown = (event) => {
        // Check if the target of the event is a marker
        if (event.target.markerIndex !== undefined) {
            let newIndex;

            // Calculate the new index based on the key that was pressed
            if (event.key === 'Enter' || event.key === ' ') {
                console.log("Pressed Enter");
                { /* handleMarkerClick(); */ }
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

    const initMap = () => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 10.99835602, lng: 77.01502627 },
            zoom: 14,
        });

        // Create markers and polyline
        markersRef.current = path.map((point, index) => {
            const marker = new window.google.maps.Marker({
                position: point,
                map,
                title: `#${index + 1}`,
            });

            marker.markerIndex = index;

            // Add a click listener to focus the marker when it's clicked
            marker.addListener('click', () => {
                marker.setFocus();
            });

            return marker;
        });

        polylineRef.current = new window.google.maps.Polyline({
            path,
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

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.body.appendChild(script);

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [path]);

    return <div ref={mapRef} style={{ height: "80vh", width: "100%" }} />;
};

export default Map;