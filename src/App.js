import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Weather from './components/weather';
import WeatherForm from './components/form';

function App() {
    const [isFetched, setIsFetched] = useState(false)
    const [error, setError] = useState(null)
    const [city, setCity] = useState('Tartu')
    const [cityData, setCityData] = useState();

    const fetchWeatherHandler = useCallback(async () => {
        setIsFetched(false)
        setError(null)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10ed3bdf99d81facf362c6aa87f1ef4e`)
            const data = await response.json();

            setCityData({
                name: city,
                temp: Math.round(parseFloat(data.main.temp) - 273.15),
                desc: data.weather[0].description
            });
        } catch (error) {
            setError(error.message)
        }
        setIsFetched(true)
    }, [city]);

    useEffect(() => {
        fetchWeatherHandler();
    }, [fetchWeatherHandler]);

    const changeCity = (city) => {
        setCity(city);
    }

    return (
        <section>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                  crossOrigin="anonymous"></link>
                <card className='text-center m-5'>
                    {isFetched && <Weather city={cityData}/>}
                    <WeatherForm onChangeCity={changeCity} />
                </card>
        </section>
    );
}

export default App;