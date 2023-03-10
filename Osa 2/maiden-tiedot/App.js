import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
    const [capitalWeather, setCapitalWeather] = useState([])
    const [weatherLoaded, setWeatherLoaded] = useState(false)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}`)
            .then(resp => {
                setCapitalWeather(resp.data)
                setWeatherLoaded(true)
            })
    }, [country])

    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} width={180} alt='flag' />
            {
                (!weatherLoaded) ? <div>loading weather...</div> :
                    <>
                        <h2>Weather in {country.capital}</h2>
                        <div>temperature {capitalWeather.main.temp} Celsius</div>
                        <img src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`} alt='weather icon' />
                        <div>wind {capitalWeather.wind.speed} m/s</div>
                    </>
            }
        </>
    )
}

const CountryList = ({ countries, countryFilter, countriesLoaded, countryDetailsShown, setCountryDetailsShown }) => {
    let filtered_countries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));
    // console.log(filtered_countries)

    if (filtered_countries.length === 0) {
        return (
            <div>{countriesLoaded ? 'no matching country' : 'loading...'}</div>
        )
    } else if (filtered_countries.length > 10) {
        return (
            <div>Too many matches, specify another filter ({filtered_countries.length})</div>
        )
    } else if (filtered_countries.length > 1) {
        const handleShowCountry = (i) => {
            let old_state = [...countryDetailsShown];
            old_state[i] = !old_state[i];
            setCountryDetailsShown(old_state);
        }

        return (
            <>
                {
                    filtered_countries.map((country, index) => {
                        return (
                            <div key={index}>
                                {country.name.common} <button onClick={() => handleShowCountry(index)}>{countryDetailsShown[index] ? 'hide' : 'show'}</button>
                                {countryDetailsShown[index] ? <CountryDetails country={country} /> : ''}
                            </div>
                        )
                    })
                }
            </>
        )
    } else if (filtered_countries.length === 1) {
        let single_country = filtered_countries[0];
        return (
            <CountryDetails country={single_country} />
        )
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')
    const [countriesLoaded, setCountriesLoaded] = useState(false)
    const [countryDetailsShown, setCountryDetailsShown] = useState([])

    // dev - state change monitors
    useEffect(() => {
        // console.log('countryDetailsShown', countryDetailsShown)
    }, [countryDetailsShown])
    // dev - state change monitors

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(resp => {
            setCountries(resp.data)
            setCountriesLoaded(true)
        })
    }, [])

    const handleFilterChange = (e) => {
        setCountryFilter(e.target.value)

        let filtered_countries = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
        setCountryDetailsShown(Array(filtered_countries.length).fill(false))
    }

    return (
        <>
            <label>find countries <input value={countryFilter} onChange={handleFilterChange} autoFocus /></label>
            <CountryList
                countries={countries}
                countryFilter={countryFilter}
                countriesLoaded={countriesLoaded}
                countryDetailsShown={countryDetailsShown}
                setCountryDetailsShown={setCountryDetailsShown} />
        </>
    )
}

export default App