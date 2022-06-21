import React from 'react'
import{MapContainer,TileLayer,Marker,Popup,useMap} from 'react-leaflet'
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;



function MapView(props) {
    const {locationArray,mapCenter,onSelectMaker} =props;
    
    function SetView({  mapcenter }) {
        const map = useMap();
        map.setView(mapcenter, map.getZoom());
      
        return null;
      }

    const markerElements = locationArray.map(location => {
        const {
            id, country_code,
            country, province,
            coordinates: { latitude, longitude },
            latest: { confirmed }
        } = location;


        let title = country;
        if (province !== '' && province !== country) {
            title = `${province}, ${country}`;
        }

        return (
            <Marker 
                key={`${id}-${country_code}`} 
                position={[latitude, longitude]}                
                onclick={() => onSelectMaker(id)} 
                >
                <Popup>{title}</Popup>
            </Marker>
        );
    });
    
    const position = [51.505, -0.09]
  return (
    <MapContainer style={{height:"100vh" ,width:"200vh"}} center={mapCenter} zoom={13} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markerElements}
    <SetView mapcenter={mapCenter} />
   
  </MapContainer>

  )
}

export default MapView