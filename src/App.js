import './App.css';
import React,{useState,useEffect} from "react";
import { FormControl } from '@material-ui/core';
import { Select,MenuItem } from '@material-ui/core';
import CovidBox from "./CovidBox";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableData from "./TableData";
import {sortData} from "./utl";
import MapData from "./MapData";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("");
  const [countryInfo,setCountryInfo]=useState([]);
  const [AllcountryData,setAllCountryData]=useState([]);
  const [mapCenter,setMapCenter]=useState({lat:20,lng:40})
  const [mapZoom,setMapZoom]=useState(3);
  const [mapCountries,setMapCountries]=useState([])

  const FetchData=async()=>{
    const res=await fetch("https://disease.sh/v3/covid-19/countries");
    const data=await res.json();
    console.log(data)
    const sortedData=sortData(data);
    setAllCountryData(sortedData)
    const countries=data.map((country)=>({
      country:country.country,
      value:country.countryInfo.iso2,
    }))
    console.log(countries)
    setCountries(countries);
    setMapCountries(data);
    console.log("setCountries----->",countries)

  }
  const FetchAllData=async()=>{
    const res= await   fetch("https://disease.sh/v3/covid-19/all");
    const data=await res.json();
    setCountryInfo(data);
    console.log(data)

  }
  const onCountryChnage=async(e)=>{
  const countryCode=e.target.value;
  const url= countryCode=="worldwide"? ("https://disease.sh/v3/covid-19/all"):(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
  const res= await fetch(url);
  const data=await res.json();
  setCountryInfo(data);
  setCountry(countryCode)
  if(countryCode=="worldwide"){
    setMapCenter([34.80746, -40.4796]);
    setMapZoom(4);
  }else{
    console.log(data.countryInfo.lat)
    setMapCenter([data.countryInfo.lat , data.countryInfo.long]);
    setMapZoom(4);
  }
  
  console.log(data)
  console.log('country code--->',countryCode)
  // setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
 
  
  
}


 //useEffect to get all the countries 
  useEffect(()=>{
    FetchData();
  },[])
  //get all total data
  useEffect(()=>{
    FetchAllData();
  },[])
  



  return (
    <div className="app">
      <div className="left_side">
      <div className="app__header">
        <h1>covid-19 Tracker</h1>

          <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChnage}>
           <MenuItem value="worldwide">worldwide</MenuItem>
            {
              countries.map((country)=>{
                return (
                  <MenuItem value={country.value}>{country.country}</MenuItem>
                );
                
              })
            }
          </Select>
         
        </FormControl>

      </div>
      <div className="caess_box">
         {/* 3 box */}
         <CovidBox title={"corona cases"} cases={  countryInfo.todayCases} total={countryInfo.cases} />
         <CovidBox title={"Recovered"} cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
         <CovidBox title={"Deaths"} cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        
      </div>
      
         {/* map  */}
         {
           console.log(mapCenter)
         }
         <MapData countries={mapCountries}  center={mapCenter} zoom={mapZoom}  />
    
         
      </div>
      <div className="right_side">
      <h3>Live Cases by country</h3>
       <div className="right_side_table">
           
         <TableData AllcountryData={AllcountryData}/>

       </div>
       <div className="right_side_bar">
          

       </div>

      </div>
    </div>
  );
}

export default App;
