import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([])
  try {
    var temp = weather.current.temp_c
    var src = weather.current.condition.icon
    var wind = weather.current.wind_kph
    var direction = weather.current.wind_dir
  }
  catch (err) {
    console.log('error: ', err)
  }

  useEffect(() => {
    console.log('effect - weather')
    axios
      .get('https://api.apixu.com/v1/current.json?key=655916a765744fa09cc90741190909&q=' + capital)
      .then(response => {
        console.log('promise fulfilled - weather')
        setWeather(response.data)
        console.log('response: ', response.data)
      })
  }, [capital])


  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {temp} C</p>
      <img src={src} alt="weather icon"></img>
      <p>Wind: {wind} from direction {direction}</p>
    </div>
  )
}

const Search = ({ newFilter, handleFilterChange, countries, clicked, setClicked, clickedCountry, setClickedCountry }) => {
  var length = 255

  const filterCountries = (filterText) =>
    countries.filter(country => country.name.includes(filterText) === true)

  const printCountries = () => filterCountries(newFilter).map((country, i) =>
    <div key={i}><p >{country.name}</p><button onClick={() => selectCountry(country)}>Show</button></div>
  )

  const selectCountry = (country) => {
    setClicked(true)
    setClickedCountry(country)
  }

  const getLength = () => {
    let length
    filterCountries(newFilter).map((country, i) =>
      length = i
    )
    return length
  }

  const getCountryData = () => {
    let myCountry
    filterCountries(newFilter).map((country, i) =>
      myCountry = country
    )
    return myCountry
  }

  length = getLength()
  if (clicked) {
    const myCountry = clickedCountry
    const printLanguages = () => myCountry.languages.map((language, i) =>
      <li key={language.name}>{language.name}</li>
    )
    const imgStyle = {
      width: '10%'
    }

    return (
      <div>
        Search (Case Sensitive): <input value={newFilter} onChange={handleFilterChange} />
        <h2>{myCountry.name}</h2>
        <p>Capital: {myCountry.capital}</p>
        <p>Population: {myCountry.population}</p>
        <h3>Languages</h3>
        <ul>{printLanguages()}</ul>
        <img style={imgStyle} src={myCountry.flag} alt={myCountry.name}></img>
        <Weather capital={myCountry.capital} />
      </div>
    )
  }
  if (length > 9) {
    return (
      <div>
        Search (Case Sensitive): <input value={newFilter} onChange={handleFilterChange} />
        <p>Too many results!</p>
      </div>
    )
  }
  if (length === undefined) {
    return (
      <div>
        Search (Case Sensitive): <input value={newFilter} onChange={handleFilterChange} />
        <p>No results!</p>
      </div>
    )
  }
  if (length === 0) {
    const myCountry = getCountryData()
    const printLanguages = () => myCountry.languages.map((language, i) =>
      <li key={language.name}>{language.name}</li>
    )
    const imgStyle = {
      width: '10%'
    }

    return (
      <div>
        Search (Case Sensitive): <input value={newFilter} onChange={handleFilterChange} />
        <h2>{myCountry.name}</h2>
        <p>Capital: {myCountry.capital}</p>
        <p>Population: {myCountry.population}</p>
        <h3>Languages</h3>
        <ul>{printLanguages()}</ul>
        <img style={imgStyle} src={myCountry.flag} alt={myCountry.name}></img>
        <Weather capital={myCountry.capital} />
      </div>
    )
  }
  else {
    return (
      <div>
        Search (Case Sensitive): <input value={newFilter} onChange={handleFilterChange} />
        {printCountries()}
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [clickedCountry, setClickedCountry] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [clicked, setClicked] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (e) => {
    console.log('Handling filter change...', e.target.value)
    setClicked(false)
    setNewFilter(e.target.value)
  }

  return (
    <div>
      <h1>Maiden nimet</h1>
      <Search newFilter={newFilter} handleFilterChange={handleFilterChange} countries={countries} clicked={clicked} setClicked={setClicked} clickedCountry={clickedCountry} setClickedCountry={setClickedCountry} />
    </div>
  )
}

export default App;