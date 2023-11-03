import React from 'react'
import './Home.css'
import hotelpic from '../Images/hotel.jpeg'
import { useNavigate } from 'react-router'
function Home() {
  const navigate = useNavigate()
  const gotodest = ()=>navigate('/viewdestinations')
  return (
    <div id='mainHome'>
      <div id='homeview'>
        <div id='homeViewDetails'>
          <p id='homeMsg'>World Class Accommodation</p>
          <p id='discovermsg'>Discover a hotel that defines a new dimesions fo luxury</p>
          <button id='viewDest' onClick={gotodest}>View Destiantions</button>
        </div>
        <div id='homeviewImg'>
          <img  src= {hotelpic} alt="" srcset="" />
        </div>
      </div>
    </div>
  )
}

export default Home
