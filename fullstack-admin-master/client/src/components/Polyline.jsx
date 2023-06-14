import { Polyline, Marker } from 'google-map-react';

const Polyline = ({ path }) => {
    const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
    };

    return (
        <>
            {path.map((point, index) => (
                <Marker
                    key={index}
                    lat={point.lat}
                    lng={point.lng}
                    title={`#${index + 1}`}
                />
            ))}
            <Polyline
                path={path}
                geodesic={true}
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                    icons: [{
                        icon: lineSymbol,
                        offset: '0',
                        repeat: '20px'
                    }],
                }}
            />
        </>
    );
};

export default Polyline;
