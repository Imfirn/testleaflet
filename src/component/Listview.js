import React from "react";
const totalKeyArray = ["confirmed", "recovered", "deaths"];
function Listview(props) {
    const { 
        locationArray, 
        selectedLocation, 
        onSelectItem, 
        onDeselectItem 
    } = props;

  
    function onClickItem(id) {
        if (selectedLocation === null) onSelectItem(id);
        else if (selectedLocation.id !== id) onSelectItem(id);
        else onDeselectItem();
    }

  const totalElements = totalKeyArray.map((key) => {
    const sum = locationArray.reduce((sum, location) => {
      return sum + location.latest[key];
    }, 0);
    return (
      <div class=" grid grid-cols-2 ">
        <h2>{key}</h2>
        <h2>{sum}</h2>
      </div>
    );
  });

  const locationElements = locationArray.map((location) => {
    const {
      id,
      country_code,
      country,
      province,
      latest: { confirmed },
    } = location;

    let title = country;
    if (province !== "" && province !== country) {
      title = `${province}, ${country}`;
    }

    let locationClass = 'list-view-location';
    if (selectedLocation !== null) {
        if (location.id === selectedLocation.id) {
            locationClass += ' selected';
        }
    }

    return (
      <div key={`${id}-${country_code}`} class={` grid grid-cols-2 hover:bg-slate-400 cursor-pointer ${locationClass==="list-view-location"?"":"bg-slate-400"} `} onClick={()=>onClickItem(id)}>
        <h2>{title}</h2>
        <h2>{confirmed}</h2>
      </div>
    );
  });

  return (
    <div className="bg-white w-80 ">
      <div>
        <h2>COVID-19 tracker</h2>
      </div>
      <div>
        <h2>Total</h2>
        {/* <div class=" grid grid-cols-2">
            <h2>case</h2>
            <h2>1234</h2>
        </div> */}
        {totalElements}
      </div>

      <div className=" bg-slate-300 space-y-2 mt-2 border-t-2 border-black">
        {/* <div class=" grid grid-cols-2">
            <h2>Country</h2>
            <h2>1234</h2>
        </div> */}

        {locationElements}
      </div>
    </div>
  );
}

export default Listview;
