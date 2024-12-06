import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function SearchRes() {
  const { country } = useParams();
  const navigate = useNavigate();
  const [latLon, setLatLon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://api.weatherapi.com/v1/search.json?key=1eaf1bc7eb0942fa85245135240307&q=${country}`);
        console.log(res.data);  
        if (res.data.length > 0) {
          const { lat, lon } = res.data[0];
          setLatLon({ lat, lon });
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    }
    fetchData();
  }, [country]);

  useEffect(() => {
    if (latLon) {
      navigate(`/search/${country}/${latLon.lat}/${latLon.lon}`);
    }
  }, [latLon, country, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold mb-4">Search Result</h1>
        {country ? (
          <p className="text-lg">Fetching weather data for: {country}</p>
        ) : (
          <p className="text-lg text-red-500">No country specified in URL.</p>
        )}
      </div>
    </div>
  );
}
