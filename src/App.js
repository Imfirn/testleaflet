import React, { useState,useCallback } from "react";
import MapView from "./component/MapView";
import "leaflet/dist/leaflet.css";

import Testdata from './TestData'
import Listview from "./component/Listview";

const api = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

function App() {
 
  const [selectedLocation, setSelectedLocation] = useState(null);
	const [mapCenter, setMapCenter]= useState([13, 100]);

  const onSelectLocation = useCallback((id) => {
		const location = Testdata.find(_location => _location.id === id);
		if (location === undefined) {
			setSelectedLocation(null);
			return;
		}
		setSelectedLocation(location);    
		const { coordinates: { latitude, longitude } } = location;
		setMapCenter([latitude, longitude]);
	}, [Testdata]);

	const onDeselectLocation = useCallback(() => {
		setSelectedLocation(null);
	}, []);


  console.log(Testdata[1].id)
  return (
    <div className="flex">     
    
    <Listview locationArray={Testdata} selectedLocation={selectedLocation} onSelectItem={onSelectLocation} onDeselectItem={onDeselectLocation} />
    <MapView  locationArray={Testdata} mapCenter={mapCenter} onSelectMaker ={onSelectLocation}/>
    </div>
  );
}

export default App;
