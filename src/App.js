import {useState} from 'react';

const api = {
  key: "41e05c2f987223eeffefc1c326cd0326",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});
//setting event on Enter to make a fetch request on weather api
  const search = evt =>{
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
        console.log(result);
      });
    }
  
  }
  //function dateBulder sätter alla datum och invokas i html koden nedanför som sedan skriver ut
  const dateBuilder = (d) =>{
    //array för månader
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    //array för dagar
    let days= ["Monday","Tuesday","Wednesday","Thursday","Friday","Sataruday","Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month}${year}`
  }

 
  
 
  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp >16) ? 'app warm': 'app' : 'app'}>
      

       <main>
         <div className="search-box">
            <input type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />

         </div>
         {(typeof weather.main != "undefined") ? (
         <div>
           <div className="location-box">

<div className="location"> {weather.name},{weather.sys.country} </div>
<div className="date">{dateBuilder(new Date())}</div>
</div> 
<div className="weather-box">
 <div className="temp">{Math.round(weather.main.temp)}°C</div>
 <div className="weather">{weather.weather[0].main}</div>
</div>
          </div>
         ) : ('')}
       </main>
    </div>
  );
}

export default App;
