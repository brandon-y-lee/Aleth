// import { Polyline, Marker } from 'google-map-react';

// const MapPolyline = ({ path }) => {
//     const lineSymbol = {
//         path: 'M 0,-1 0,1',
//         strokeOpacity: 1,
//         scale: 4
//     };

//     return (
//         <>
//             {path.map((point, index) => (
//                 <Marker
//                     key={index}
//                     lat={point.lat}
//                     lng={point.lng}
//                     title={`#${index + 1}`}
//                 />
//             ))}
//             <Polyline
//                 path={path}
//                 geodesic={true}
//                 options={{
//                     strokeColor: "#ff2527",
//                     strokeOpacity: 0.75,
//                     strokeWeight: 2,
//                     icons: [{
//                         icon: lineSymbol,
//                         offset: '0',
//                         repeat: '20px'
//                     }],
//                 }}
//             />
//         </>
//     );
// };

// export default MapPolyline;


import { Component } from 'react'

export default class Polyline extends Component {
  renderPolylines () {
    const { markers, map, maps } = this.props

    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: true,
      strokeColor: '#00a1e1',
      strokeOpacity: 1.0,
      strokeWeight: 4
    })
    geodesicPolyline.setMap(map)

    /** Example of rendering non geodesic polyline (straight line) */
    let nonGeodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: false,
      strokeColor: '#e4e4e4',
      strokeOpacity: 0.7,
      strokeWeight: 3
    })
    nonGeodesicPolyline.setMap(map)
  }

  render () {
    this.renderPolylines()
    return null
  }
}
