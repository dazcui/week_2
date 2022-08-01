import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './loadingScreen'

const CardClima = ({ lat, lon }) => {
  const [weather, setWeather] = useState()
  const [temperatura, setTemperatura] = useState()
  const [listCelsius, setListCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState('Off')

  const imageToggle =() =>{
    if (images === 'Off') {
      setImages('On')
    }else{
      setImages('Off')
    }
  }

  useEffect(() => {
    if (lat && lon) {
      const APIKey = '015dade9ea290cc744ab3bda275145ba'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
            farenheit: `${(Math.round(res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
          }
          setTemperatura(temp)
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    }
  }, [lat, lon])
  console.log(weather);
  const handleClick = () => setListCelsius(!listCelsius)




  

  if (isLoading) {
    return <LoadingScreen />
  } else {
    return (
      <div className= {`weather_box ${images}`} >
        <article>
          <h1>Weather App</h1>
          <h4>{`${weather?.name}, ${weather?.sys.country}`} </h4>
          <div className='descrip_box'>
            <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather" />
            <div className='descrip'>
              <h3>&#34;{weather?.weather[0].description}&#34;</h3>
              <ul>
                <li><span> 💨 Wind Speed</span> <b> {weather?.wind.speed} m/s </b></li>
                <li><span>🌥️Clouds</span> <b>{weather?.clouds.all} % </b></li>
                <li><span> 🌡 Pressure</span> <b> {weather?.main.pressure} hPa </b></li>
              </ul>
            </div>
          </div>
          <h2>{listCelsius ? temperatura?.celsius : temperatura?.farenheit}</h2>
          <button onClick={ ()=>{handleClick(); imageToggle()}  } >{listCelsius ? 'Change to *F ' : 'Change to *C'}</button>
        </article>
      </div>
    )
  }
}

export default CardClima