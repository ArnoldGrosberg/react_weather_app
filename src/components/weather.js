import React from 'react';

const Weather = (props) => {
    return (
        <div>
            <h1>City: {props.city.name}</h1>
            <p>Description: {props.city.desc}</p>
            <p>Temperature: {props.city.temp}°C</p>
        </div>
    );
}
export default Weather;