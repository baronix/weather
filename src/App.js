import { useState, useEffect } from "react";
import axios from "axios";

const WEATHERURL = `https://api.weatherapi.com/v1/current.json?key=ba035b8002f1446388a101110232410&q=Lisbon&aqi=no`;


function App() {

  const [weather,setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
          axios.get(WEATHERURL)
          .then(response => {
            console.log(response);
            setWeather(response.data);
            setIsLoading(false);
           }, error => {
              console.log(error);
            });
          }, []);
          console.log(weather);  




  return (
    <>
    
     <div className={ 
      (weather.current.temp_c > 25) 
      ?
      "bg-[#FF0000] flex flex-col justify-center text-center h-screen items-center"
      :
      "bg-[#00a2ff] flex flex-col justify-center text-center h-screen items-center"
      }>
      <div >
        {isLoading && <p className="Loader" style={{opacity: isLoading ? 2 : 0}}>Loading...</p>}
        <h1 className="text-black text-[100px] font-mono">{weather.current.temp_c}ºC</h1>
        <div className="flex items-center justify-center">
          <h1 className="text-black text-xl">{weather.current.condition.text}</h1>
          <img className="max-h-[10x]" src={weather.current.condition.icon} alt="Weather Condition"/>
        </div>
        <h1 className="text-black text-2xl">{weather.current.humidity} % humidity</h1>
        <h1 className="text-black text-xl italic pt-4 font-mono">{weather.location.name}, {weather.location.country}</h1>
    </div>
    </div> 
    </>
  );
}

export default App;
