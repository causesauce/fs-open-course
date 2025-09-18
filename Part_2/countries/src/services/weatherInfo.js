import axios from 'axios'

// how to run from powershell using env var:
// ($env:VITE_WEATHER_API_KEY="<API_KEY>") -and  (npm run dev)

const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const weatherCache = {}
const CACHE_FRESHNESS_MINUTES = 10;

const isCacheFresh = (lastUpdated) => {
    const elapsedMinutes = (Date.now() - lastUpdated) / (1000 * 60);
    return elapsedMinutes <= CACHE_FRESHNESS_MINUTES;
};

const getByCity = (cityName, countryCode) => {
    const cacheKey = `${cityName},${countryCode}`;
    const weatherCacheEntry = weatherCache[cacheKey];

    if (weatherCacheEntry && isCacheFresh(weatherCacheEntry.lastUpd)) {
        console.log(`Serving ${cityName} from cache...`);
        
        return Promise.resolve(weatherCacheEntry.data);
    }

    const requestUrl = `${baseUrl}?q=${cityName},${countryCode}&appid=${apiKey}&units=metric`
    
    return axios.get(requestUrl)
        .then(response =>  {
            const weather = response.data

            if (weather){
                const cacheEntry = {
                    lastUpd: Date.now(),
                    data: weather
                }
                weatherCache[cacheKey] = cacheEntry
            }
            
            return weather
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            return null;
        })
}

export default { getByCity }