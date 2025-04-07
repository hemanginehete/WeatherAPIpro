import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let[city,setcity]=useState('')
  let[WDetails,setWdetails]=useState()

  let getData=(event)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod=="404"){
        setWdetails(undefined)
      }
      else{
        setWdetails(finalRes)
      }
    })
  
    event.preventDefault();
    setcity('')
  }

  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App</h1>

        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e)=>setcity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name'/>
          <button type='submit' className='bg-[#fff] ml-3 px-4 py-2 rounded'>
           Submit
          </button>
        </form>

        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] '>
          {
            WDetails!==undefined
            ?
            <>
            <h3 className='font-bold text-[30px]'>{WDetails.name}<span className='bg-[yellow]'>&nbsp;{WDetails.sys.country}</span>
            </h3>
            <h2 className='font-bold text-[40px]'>{WDetails.main.temp}°C</h2>
            <img src={`http://openweathermap.org/img/w/${WDetails.weather[0].icon}.png`}  />
            <p >{WDetails.weather[0].description}</p>
            </>
            :
            "No Data"
          }
          
        </div>
      </div>
    </div>
  );
  
}

export default App;
