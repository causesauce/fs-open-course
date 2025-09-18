import Loading from './loading'

const WeatherDetails = ({weatherInfo, area}) => {
    
  if (weatherInfo == null) return <Loading />;

    const weatherCondition = Array.isArray(weatherInfo.weather) && weatherInfo.weather.length > 0
                                ? weatherInfo.weather[0] 
                                : null;

    const weatherMain = weatherInfo.main

    return <div>
                {area == null || area === '' 
                ? null
                : <h1>Weather in {area}</h1>
                }
                {weatherCondition == null 
                ? null
                : <div>
                    <h4>
                        <p>Condition: {weatherCondition?.main}</p>
                        <p>Description: {weatherCondition?.description}</p>
                    </h4>
                    <img style={{width: 100}} src={`https://openweathermap.org/img/wn/${weatherCondition.icon}.png`} alt={weatherCondition.icon}  />
                  </div>
                }
                {weatherMain == null 
                ? null
                : <div>
                    <p>Temperature: {weatherMain?.temp} Celsius</p>
                    <p>Feels like: {weatherInfo.main?.feels_like} Celsius</p>
                    <p>Humidity: {weatherInfo.main?.humidity} %</p>
                    <p>Wind: {weatherInfo.wind?.speed} meter/sec</p>
                  </div>
                }
            </div>
}

export default WeatherDetails