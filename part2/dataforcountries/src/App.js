import {useState,useEffect} from 'react'
import axios from 'axios'

const FilterForm = ({newFilter,setNewFilter}) => {
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  return (
    <form>
      <div>Find countries: <input value={newFilter} onChange={handleFilterChange}></input></div>
    </form>
  )
}

const FilterCountries = ({countries,setCountries,newFilter}) => {
  const lc = newFilter.toLowerCase()
  const filtered = countries.filter(country => 
    country.name.common.toLowerCase().startsWith(lc))

  if (newFilter === '') {
    return 'Search for a country to start...'
  }

  if (filtered.length > 10) {
    return 'Too many matches, specify more...'
  }

  return (
     filtered.map(country => <Toggleable key={country.name.official} country={country}/>)
  )
}

const Toggleable = ({country}) => {
  const [show,setShow] = useState(false)
  return (
    <div>
      {country.name.common}
      <button onClick={() => setShow(!show)}>
        {show ? 'hide' : 'show'}
      </button>
      {show 
        ? <Country 
            name={country.name.common}
            capital={country.capital}
            area={country.area}
            languages={country.languages}
            flag={country.flags}
            capitalInfo={country.capitalInfo}
          />
        : <div></div>  
      }
    </div>
  )
}

const Country = ({name,capital,area,languages,flag,capitalInfo}) => {
  const [weather,setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY

  const lat = capitalInfo.latlng[0]
  const lng = capitalInfo.latlng[1]

  //Get weather
  useEffect(() => {
    console.log('weather')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        console.log('weather promise fulfilled')
        setWeather(response.data)
      })
  },[])
  
  if (weather !== undefined) {
    console.log(weather)
    return (
      <div>
        <h2>{name}</h2>
        <div>Capital: {capital}</div>
        <div>Area: {area} km^2</div>
        <h4>Languages:</h4>
        <div>
          {Object.keys(languages).map((value,index) => {
            return (
              <li key={index}>
                {languages[value]}
              </li>
              )
          })}
        </div>
        <div>
          <h4>Flag:</h4>
          <img src={flag.png} alt={name+' flag'} height="200" width="" />
        </div>
        <div>
          <h4>Weather in {capital}:</h4>
          <p>Temperature: {(weather.main.temp-273.15).toFixed(1)} celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" height="100" width="" />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      </div>
    )
  }
}

const App = () => {
  const [newFilter,setNewFilter] = useState('')
  const [countries,setCountries] = useState([])

  useEffect(() => {
    console.log('Countries')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Data for countries</h1>
      <FilterForm 
        newFilter={newFilter}
        setNewFilter={setNewFilter}
      />
      <FilterCountries 
        countries={countries} 
        setCountries={setCountries} 
        newFilter={newFilter}
      />
    </div>
  )
}

export default App;
