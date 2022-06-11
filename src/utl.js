import { Circle, Popup } from "react-leaflet";
import React from "react";
import "./util.css";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};
export const sortData=(data)=>{
    const sortedData=[...data];
    sortedData.sort((b,a)=>{
        // if(a.cases>b.cases){
        //     return -1;
        // }else{
        //     return 1;
        // }
        return a.cases-b.cases;
       
    })
    return sortedData;
}
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
       <Popup>
     <div className="popup_box">
       <div className="info_flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}>
       <div className="info_box">
       <div className="popup">country: <strong>{country.country}</strong></div> 
         <div className="popup">cases:{numeral(country.cases).format("0,0")}</div> 
         <div className="popup">recoverd:{country.recovered}</div>
         
         <div className="popup">deaths:{country.deaths}</div>  

       </div>
         
       </div>
      
     </div>
    </Popup>
    </Circle>
   
   
  ));