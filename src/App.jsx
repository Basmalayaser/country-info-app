import { useEffect, useState } from 'react';
import './App.css';
import bg from './assets/background.png';
import axios from 'axios';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (countryName) {
      getCountryData();
    }
  }, [countryName]);

  async function getCountryData() {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      setCountryData(response.data);
      setError(null);
    } catch{
      setCountryData([]);
      setError('Could not find country. Please try again.');
    }
  }


    function addCountryName(e) {
    e.preventDefault();
    setCountryName(e.target.elements.search.value)
  }

  return (
    <>
      <section className="min-h-[350px] py-30 font-['Inter',sans-serif] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }} >
        <div className="container mx-auto px-4 w-[90%] lg:w-[50%] ">
          <h1 className='text-white text-4xl max-md:text-2xl font-bold text-center pb-20 '>Learn more about your country</h1>
          <form onSubmit={addCountryName}  className="bg-[#262936] rounded-full flex items-center p-2">
               <input name="search" id="search" type="text"  placeholder="Enter your country name..."  className="bg-[#262936] text-white px-4 py-2 rounded-full text-lg w-full focus:outline-none placeholder-gray-400  "/>
               <button type="submit" className="bg-[#009ad8] px-6 py-2 rounded-full text-white font-semibold text-lg hover:bg-[#007bb5] transition-colors">Search</button>
          </form>
          </div>
      </section>

      <section className="container mx-auto px-4 relative top-[-70px]">
        <div className=" w-[90%]  lg:w-[50%] mx-auto">
          {error? <p className="text-red-500 text-center">{error}</p>:""}
          {countryData?.map((data, index) => (
            <div key={index} className="bg-[#2b3143] text-white p-6 rounded-lg shadow-md mb-4">
              <div className="flex justify-between pb-2">
                <h2 className="text-3xl font-bold">{data.name.common}</h2>
                <img src={data.flags.png} alt={data.flags.alt}  className='w-26 '/>
              </div>
              <p className='text-2xl font-semibold pb-2'>Capital: <span className='text-xl text-gray-300'>{data.capital}</span></p>
              <p className='text-2xl font-semibold pb-2'>Population Number: <span className='text-xl text-gray-300'>{data.population}</span></p>
              <p className='text-2xl font-semibold pb-2'>timezones: <span className='text-xl text-gray-300'>{data.timezones}</span></p>
              <p className='text-2xl font-semibold pb-2'>currency: <span className='text-xl text-gray-300'>{data.currencies[Object.keys(data.currencies)[0]]?.name}</span> / <span className='text-xl text-gray-300'>{data.currencies[Object.keys(data.currencies)[0]]?.symbol}</span></p>
            </div>
          ))}

        </div>
      </section>
    </>
  );
}

export default App;

