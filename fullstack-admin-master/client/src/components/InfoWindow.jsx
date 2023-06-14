import React, { useRef, useEffect } from 'react';

const InfoWindow = ({ lat, lng, onClose, title }) => {
    const closeButtonRef = useRef(null);

    useEffect(() => {
        closeButtonRef.current.focus(); // focus the close button initially
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onClose();
        }
    };

    return (
        <div
            lat={lat}
            lng={lng}
            style={{
                position: 'relative',
                width: 150,
                height: 75,
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '10px',
            }}
        >
            <div>{title}</div>
            <button ref={closeButtonRef} onClick={onClose} onKeyDown={handleKeyDown}>Close</button>
        </div>
    )
}

export default InfoWindow;
