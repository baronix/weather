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
    <div className={weather.current ? (weather.current.temp_c>25 ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300 h-screen flex items-center justify-center" : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 h-[100vh] flex items-center justify-center overflow-auto ") : "h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r"}>
        <div className='bg-white w-[500px] max-w[1240px] m-auto rounded-[25px] bg-opacity-70 text-black pt-10 pb-10 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] overflow-y-auto animate-fade'>
            <div className='flex flex-col items-center justify-center ease-in-out'>
                <img src={logoImg} alt="" className='max-w-[250px] pb-5 animate-fade animate-delay-200'/>
                <div className="relative mb-3">
                    <input 
                    type="text" 
                    id="floatingInput"
                    value={location} 
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Pesquisar cidade'
                    className='border-2 font-mono border-gray-300 bg-white h-10  rounded-lg text-sm text-center focus:outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)] animate-fade animate-delay-200'
                    />

                </div>
                <div className='top'>
                <div className="flex flex-col items-center justify-center mt-3">
                        {weather.location ? <p className='font-bold text-2xl font-mono animate-fade-up'>{weather.location.name}, {weather.location.country}</p> : null}
                        {weather.location ? <p className='text-sm italic font-mono animate-fade-up'>{weather.location.localtime}</p> : null}
                    </div>
                    <div className='flex flex-col items-center mt-3'>
                        {weather.current ? <div className={weather.current.temp_c>25 ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text text-[100px] font-bold font-mono animate-fade-up" : "bg-gradient-to-r from-sky-400 to-blue-500 inline-block text-transparent bg-clip-text text-[100px] font-bold font-mono animate-fade-up"}>{weather.current.temp_c}º</div> : null}
                        
                    </div>
                    
                    <div className="flex flex-col justify-center items-center mb-5">
                        
                        <div>
                            {weather.current ? <img src={`https://cdn.weatherapi.com/weather/128x128/${weather.current.condition.icon.split('/')[5]}/${weather.current.condition.icon.split('/')[6]}`} alt="" className='animate-wiggle animate-infinite animate-duration-[3000ms] animate-ease-linear' /> : null} 
                        </div>
                        <div className=''>
                            {weather.current ? <p className='font-mono'>{weather.current.condition.text}</p> : null}
                        </div>
                        
                    </div>
                    
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col items-center justify-center mr-4'>
                        <div className='flex flex-col items-center justify-center mr-4'>
                            
                            {weather.current ? <p className='text-2xl font-mono font-bold animate-fade-up'>{Math.floor(weather.current.humidity)} <span className='text-sm'>%</span></p> : null }  
                            {weather.current ? <p className='text-sm font-mono animate-flip-down animate-delay-200'>Humidade </p> : null }  
                            {weather.current ? <WiHumidity size={20} className='animate-flip-up animate-delay-200'/> : null } 
                        </div>              
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center justify-center'>
                            
                            {weather.current ? <p className='text-2xl font-mono font-bold animate-fade-up'>{Math.floor(weather.current.wind_kph)} <span className='text-sm'>KM/h</span></p> : null } 
                            {weather.current ? <p className='text-sm font-mono animate-flip-down animate-delay-200'>Vento</p> : null } 
                            {weather.current ? <BiWind size={20} className='animate-flip-up animate-delay-200'/> : null }          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp