import { useEffect, useState } from 'react'
import './App.css'
import CardClima from './components/CardClima'

function App() {
  const [coords, setCoords] = useState()

  useEffect(() => {
    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])



  return (
    <div className="App" backgroundColor="red">
      <CardClima lon={coords?.lon} lat={coords?.lat} />
      
    </div>
  )
}

export default App
