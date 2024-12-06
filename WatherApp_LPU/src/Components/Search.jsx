import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [countryName, setCountryName] = useState("");
  const navigate = useNavigate();

  function reRoute() {
    navigate(`/search/${countryName}`);
  }

  return (
    <div className='flex justify-center my-4 space-x-4'>
      <input
        className='w-6/12 h-10 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
        placeholder='Search Country'
        onChange={e => setCountryName(e.target.value)}
        value={countryName}
      />
      <button
        className='h-10 px-5 m-2 mt-0 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700'
        onClick={reRoute}
      >
        Search
      </button>
    </div>
  );
}
