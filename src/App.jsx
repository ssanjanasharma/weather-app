import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import CloudyIcon from './assets/icons/cloud.png';
import RainyIcon from './assets/icons/rain.png';
import StormyIcon from './assets/icons/storm.png';
import SunnyIcon from './assets/icons/sun.png';
import FoggyIcon from './assets/icons/Foggy.png';
import SnowIcon from './assets/icons/snow.png';

import snow from './assets/images/snow.jpg';
import Cloudy from './assets/images/Cloudy.jpg';
import Clear from './assets/images/Clear.jpg';
import Rainy from './assets/images/Rainy.jpg';
import Stormy from './assets/images/Stormy.jpg';
import Sunny from './assets/images/Sunny.jpg';
import Foggy from './assets/images/Foggy.jpg';

function WeatherApp() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    const formatDate = () => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const weekDays = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'
        ];
        const currentDate = new Date();
        const date = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        return date;
    };

    const searchWeather = async (event) => {
        if (event.key === 'Enter' && input) {
            event.preventDefault();
            setInput('');
            setWeather({ ...weather, loading: true });
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
            await axios.get(url, {
                params: {
                    q: input,
                    units: 'metric',
                    appid: apiKey,
                },
            })
                .then((res) => {
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setInput('');
                });
        }
    };

    const getBackgroundImage = () => {
        if (weather.data.weather) {
            const condition = weather.data.weather[0].main.toLowerCase();
            if (condition.includes('cloud')) return Cloudy;
            if (condition.includes('clear')) return Clear;
            if (condition.includes('rain')) return Rainy;
            if (condition.includes('storm')) return Stormy;
            if (condition.includes('sun')) return Sunny;
            if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) return Foggy; 
            if (condition.includes('snow')) return snow; 
        }
        return Clear; 
    };

    const getWeatherIcon = () => {
        if (weather.data.weather) {
            const condition = weather.data.weather[0].main.toLowerCase();
            if (condition.includes('cloud')) return CloudyIcon;
            if (condition.includes('clear')) return SunnyIcon;
            if (condition.includes('rain')) return RainyIcon;
            if (condition.includes('storm')) return StormyIcon;
            if (condition.includes('sun')) return SunnyIcon;
            if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) return FoggyIcon; 
            if (condition.includes('snow')) return SnowIcon; 
        }
        return ClearIcon; 
    };

    return (
        <div
            className="WeatherApp"
            style={{
                backgroundImage: `url(${getBackgroundImage()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <h1 className="app-name">My Weather App</h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name.."
                    name="query"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={searchWeather}
                />
            </div>
            {weather.loading && <p>Loading...</p>}
            {weather.error && <p>City not found</p>}
            {weather.data.main && (
                <div>
                    <div className="weather-icon">
                        <img src={getWeatherIcon()} alt="Weather Icon" />
                    </div>
                    <h2>{weather.data.name}, {weather.data.sys.country}</h2>
                    <p>{formatDate()}</p>
                    <p>{Math.round(weather.data.main.temp)}°C</p>
                    <p>{weather.data.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
