import React from 'react'

import { useState } from "react";
import axios from "axios";
import {WiHumidity} from 'react-icons/wi'
import {BiWind} from 'react-icons/bi'
import logoImg from '../assets/logo.webp'




const WeatherApp = () => {

    const [weather,setWeather] = useState({});
    const [location,setLocation] = useState("");

    const APIKEY = "ba035b8002f1446388a101110232410";
    const WEATHERURL = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location}&aqi=no&lang=pt`

    const searchLocation = (event) => {

        if (event.key === 'Enter') {
            axios.get(WEATHERURL)
            .then((response)=> {
            setWeather(response.data)/* 
            console.log(response.data) */})
            .catch((err) => { console.log(err)})
        setLocation('')
        }

        
    }


  return (
    <div className={weather.current ? (weather.current.temp_c>25 ? "bg-[#FAC898] h-screen flex items-center justify-center" : "bg-[#D8E9EC] h-screen flex items-center justify-center") : "h-screen flex items-center justify-center"}>
        <div className='bg-white w-[500px] m-auto rounded-[25px] bg-opacity-70 shadow-md text-black pt-10 pb-10 '>
            <div className='flex flex-col items-center justify-center'>
                <img src={logoImg} alt="" className='max-w-[250px] pb-5'/>
                <div className="relative mb-3">
                    <input 
                    type="text" 
                    id="floatingInput"
                    value={location} 
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Pesquisar cidade'
                    className='peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
                    /* className='border-2 font-mono border-gray-300 bg-white h-10  rounded-lg text-sm text-center focus:outline-none' */
                    />
                    <label
                     for="floatingInput"
                    class="pointer-events-none text-center absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >Pesquisar cidade</label
                    >
                </div>
                <div className='top'>
                <div className="flex flex-col items-center justify-center mt-3">
                        {weather.location ? <p className='font-bold text-2xl font-mono'>{weather.location.name}</p> : null}
                        {weather.location ? <p className='text-sm italic font-mono'>{weather.location.localtime}</p> : null}
                    </div>
                    <div className='flex flex-col items-center mt-3'>
                        {weather.current ? <p className='text-[100px] font-bold font-mono'>{weather.current.temp_c}º</p> : null}
                        
                    </div>
                    
                    <div className="flex flex-col justify-center items-center mt-3">
                        <div className=''>
                            {weather.current ? <p className='font-mono'>{weather.current.condition.text}</p> : null}
                        </div>
                        <div>
                            {weather.current ? <img src={weather.current.condition.icon} alt="" className='' /> : null} 
                        </div>
                        
                    </div>
                    
                </div>
                <div className='flex flex-row mt-4'>
                    <div className='flex flex-col items-center justify-center mr-4'>
                        <div className='flex flex-col items-center justify-center mr-4'>
                            
                            {weather.current ? <p className='text-2xl font-mono'>{Math.floor(weather.current.humidity)} <span className='text-sm'>%</span></p> : null }  
                            {weather.current ? <p className='text-sm font-mono'>Humidade </p> : null }  
                            {weather.current ? <WiHumidity size={20}/> : null } 
                        </div>              
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center justify-center'>
                            
                            {weather.current ? <p className='text-2xl font-mono'>{Math.floor(weather.current.wind_kph)} <span className='text-sm'>KM/h</span></p> : null } 
                            {weather.current ? <p className='text-sm font-mono'>Vento</p> : null } 
                            {weather.current ? <BiWind size={20}/> : null }          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp