// import { useEffect, useState } from 'react'
// import './App.css'
// import  bg from  './assets/background.png'
// import axios from 'axios'


// function App() {

//   const [countryName, setCountryName] = useState("")
//   const [countryData, setCountrydata] = useState([])

 
//   useEffect(()=>{
//       getCountryData()
//   },[countryName])

//   function addCountryName(){
//     setCountryName(search.value) 
//   }

//  async function getCountryData(){
//    return await axios.get(`https://restcountries.com/v3.1/name/${countryName}`).then((response)=>{
//         setCountrydata(response.data)
//         console.log(response.data)
//    }).catch((error)=>{
//       console.log(error)
//    })
//  }


 
//   return (
//     <>
//     <section className={`min-h-[350px] py-40 my-30 font-[Inter,sans_serif] bg-[url(${bg})]`}  style={{ backgroundImage: `url(${bg})` }}>
//       <div className="container">
//                 <div className="bg-[#262936] rounded-full w-[50%] mx-auto flex justify-between p-2">
//                     <input id="search" type="text" placeholder="Enter your country name..." className='bg-[#262936] text-white ps-3 py-2 rounded-full text-lg w-full focus:outline-0'/>
//                     <input onClick={()=>{addCountryName()}} id="submit" type="button" value="Search" className='bg-[#009ad8] px-5 py-2 rounded-full text-white font-semibold text-xl cursor-pointer'/>
//                 </div>

//       </div>
//     </section>
//     <section>

//     {countryData?
//       countryData?.map((data)=>{
//           <div className="text-white">
//               <h1>{data.name.common}</h1>
//           </div>
//       }):""}

//     </section>
//     </>
//   )
// }

// export default App




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
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching country data:', error);
      setCountryData([]);
      setError('Could not find country. Please try again.');
    }
  }

  function addCountryName(e) {
    e.preventDefault();
    setCountryName(document.getElementById('search').value);
  }

  return (
    <>
      <section
        className="min-h-[350px] py-30 font-['Inter',sans-serif] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="container mx-auto px-4 w-[90%] lg:w-[50%] ">
          <h1 className='text-white text-4xl max-md:text-2xl font-bold text-center pb-20 '>Learn more about your country</h1>
          <div className="bg-[#262936] rounded-full flex items-center p-2">
            <input
              id="search"
              type="text"
              placeholder="Enter your country name..."
              className="bg-[#262936] text-white px-4 py-2 rounded-full text-lg w-full focus:outline-none placeholder-gray-400"
            />
            <button
              onClick={addCountryName}
              className="bg-[#009ad8] px-6 py-2 rounded-full text-white font-semibold text-lg hover:bg-[#007bb5] transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 relative top-[-70px]">
        <div className=" w-[90%]  lg:w-[50%] mx-auto">
          {error? <p className="text-red-500 text-center">{error}</p>:""}
          {countryData?.map((data, index) => (
            <div key={index} className="bg-[#2b3143] text-white p-6 rounded-lg shadow-md">
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

