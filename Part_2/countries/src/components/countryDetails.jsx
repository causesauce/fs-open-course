import {useState, useEffect} from 'react'
import weatherService from '../services/weatherInfo'
import WeatherDetails from './weatherDetails';

const CountryDetails = ({country, resetCountry}) => {
    if (country == null) return;

    const [weatherInfo, setWeatherInfo] = useState(null)
    const [capital, setCapital] = useState(null)

    useEffect(() =>{
        const countryCapital = country.capital?.length > 0 
            ? country.capital[0]
            : null

        setCapital(countryCapital)
    }, [])

    useEffect(() => {
        if (capital == null) return

        const countryCode = country.cca2

        weatherService.getByCity(capital, countryCode)
            .then(data => setWeatherInfo(data))

    }, [capital])

    return (
        <div>
            {resetCountry == null ? null : <button onClick={() => resetCountry()}>Back</button>}
            <h1>{country.name.common}</h1>
            <p>Capital: {capital ?? "none"}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <WeatherDetails weatherInfo={weatherInfo} area={capital} />
        </div>
    )
}

export default CountryDetails