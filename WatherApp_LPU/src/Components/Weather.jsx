import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Weather() {
  const { lat, lon } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Received params:', lat, lon); 
    if (lat && lon) {
      const apiKey = '1eaf1bc7eb0942fa85245135240307'; 

      const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
      const forecastWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;


      axios.get(currentWeatherUrl)
        .then(response => {
          console.log('Current Weather Data:', response.data); 
          setCurrentWeather(response.data);
        })
        .catch(() => setError('Error fetching current weather'));

      
      axios.get(forecastWeatherUrl)
        .then(response => {
          console.log('Forecast Weather Data:', response.data); 
          setForecastWeather(response.data);
        })
        .catch(() => setError('Error fetching forecast weather'));


      axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        .then(response => {
          console.log('Country Data:', response.data); 
          setCountryName(response.data.countryName);
        })
        .catch(() => setError('Error fetching country information'));
    }
  }, [lat, lon]);

  return (
    <div className=" border border-slate-900 shadow-lg rounded-md p-6 m-4">
      <h1 className="text-3xl font-extrabold mb-4">Weather Information</h1>
      {error && <p className="text-red-500">{error}</p>}
      {currentWeather ? (
        <div className='mt-2'>
          <h2 className="text-xl font-semibold">Current Weather</h2>
          <p>Temperature: {currentWeather.current.temp_c} °C</p>
          <p>Condition: {currentWeather.current.condition.text}</p>
        </div>
      ) : <p>Loading current weather...</p>}
      {forecastWeather ? (
        <div className='mt-2'>
          <h2 className="text-xl font-semibold">Forecast Weather</h2>
          <p>Temperature: {forecastWeather.forecast.forecastday[0].day.avgtemp_c} °C</p>
          <p>Condition: {forecastWeather.forecast.forecastday[0].day.condition.text}</p>
        </div>
      ) : <p>Loading forecast weather...</p>}
      {countryName && (
        <div className='mt-4'>
          <h2 className="text-xl font-semibold">Location</h2>
          <p>Country: {countryName}</p>
        </div>
      )}
    </div>
  );
}
