import React, { useRef, useEffect } from 'react';

let infoWindowId = 0;

const InfoWindow = ({ lat, lng, onClose, title }) => {
    console.log("Reaching here!");
    const closeButtonRef = useRef(null);
    const infoWindowRef = useRef(`info-window-${infoWindowId++}`);

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
          // position={{"lat":lat,"lng":lng}}
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
