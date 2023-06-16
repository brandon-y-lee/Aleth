import React, { useState, useRef, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoWindow from 'components/InfoWindow'; // import the InfoWindow component

const CustomMarker = ({ lat, lng, onClick, title, index, totalMarkers }) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const markerRef = useRef(null);

    const handleMarkerClick = () => {
        setShowInfoWindow(true);
        onClick();
    };

    const handleInfoWindowClose = () => {
        setShowInfoWindow(false);
        markerRef.current.focus();
    };

    useEffect(() => {
        if (index === 0) {
            markerRef.current.focus(); // focus the first marker initially
        }
    }, [index]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleMarkerClick();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextMarker = document.getElementById(`marker-${(index + 1) % totalMarkers}`);
            nextMarker && nextMarker.focus();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevMarker = document.getElementById(`marker-${(index - 1 + totalMarkers) % totalMarkers}`);
            prevMarker && prevMarker.focus();
        }
    };

    return (
        <>
            <LocationOnIcon
                lat={lat}
                lng={lng}
                onClick={handleMarkerClick}
                onKeyDown={handleKeyDown}
                tabIndex={0} // make the marker focusable
                id={`marker-${index}`} // add an id to the marker
                ref={markerRef}
            />
            {showInfoWindow && <InfoWindow lat={lat} lng={lng} onClose={handleInfoWindowClose} title={title} />}
        </>
    )
}

export default CustomMarker;
