import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchAllCountries = async() => {
      try{
        const {data} = await axios.get('https://crio-location-selector.onrender.com/countries');
        setCountryList(data);
      }catch(error) {
        console.log("Error", error);
      }
    }

    fetchAllCountries();
  }, [])



  useEffect(() => {
    if(selectedCountry){
      let fetchStates = async(countryName) => {
        try{
          const {data} =  await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
          setStateList(data);
          setSelectedState("");
          setCityList([]);
          setSelectedCity("")
        }catch(error){
          console.log("Error", error);
        }
      }
      fetchStates(selectedCountry);
    }

  }, [selectedCountry]);


  useEffect(() => {
    if(selectedCountry && selectedState){
      let fetchCities = async(countryName, stateName) => {
        try{
          const {data} =  await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
          setCityList(data);

        }catch(error){
          console.log("Error", error);
        }
      }
      fetchCities(selectedCountry, selectedState);
    }
  }, [selectedCountry, selectedState])


  const handleChangeCountry = (country) => {
    setSelectedCountry(country);
  }

  const handleChangeState = (state) => {
      setSelectedState(state);
  }

  const handleChangeCity = (city) => {
    setSelectedCity(city)
  }

  
  return (
    <center>
      <h1>Select Location</h1>
      <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
      <div>
        <select name='countries' defaultValue="Select Country" id='countires' onChange={(e) => handleChangeCountry(e.target.value)}>
          <option  disabled>Select Country</option>
          {countryList.map((country, ind) => (
            <option key={ind} value={country}>{country}</option>
          ))}
        </select>
      </div>


      <div>
        <select name='states' value={selectedState} id='states' onChange={(e) => handleChangeState(e.target.value)} disabled={selectedCountry ?  false : true}>
          <option  value="" disabled>Select State</option>
          {stateList.map((state, ind) => {
              return <option key={ind} value={state}>{state}</option>
          }
          )}
        </select>
      </div>

      <div>
        <select name='cities' value={selectedCity} id='cities' onChange={(e) => handleChangeCity(e.target.value)} disabled={selectedState ?  false : true}>
          <option  value="" >Select City</option>
          {cityList.map((city, ind) => {
              return <option key={ind} value={city}>{city}</option>
          }
          )}
        </select>
      </div>
      
      
      </div>
      {selectedCity && <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <h1 >You Selected <span style={{fontSize: "3rem"}}> {selectedCity}, </span>  <span style={{color: "#b9b9b9"}}> {selectedState}, {selectedCountry}</span></h1> 
      </div>}
    </center>
  )
}

export default App
