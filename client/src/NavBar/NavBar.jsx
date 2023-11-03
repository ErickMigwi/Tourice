import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEarthAmericas} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import url from '../url'
function NavBar() {
  Axios.defaults.withCredentials = true
  //States
  const navigate = useNavigate()
  const[authenicated,setauthenticated] = useState(null)
  //Functions
  useEffect(()=>{
    Axios.get(`${url}login`).then(res=>{
      console.log(res);
      setauthenticated(res.data.LoggedIn)
    })
  },[])
  const gotoLogin = ()=>{
    navigate('/login')
  }
  const gotoprofile = ()=>{
    navigate('/profile')
  }
  const gotohome = ()=>navigate('/')
  return (
    <div id='mainNav'>
      <div id="nav1">
        <p onClick={gotohome} id='logo'>Tourice <FontAwesomeIcon icon={faEarthAmericas} bounce/></p>
      </div>
        <div id='nav2'>
            <p id='d' onClick={gotohome}>Home</p>
            <p>About</p>
          {authenicated ? (
            <p onClick={gotoprofile}>Profile</p>
          ):(
            <p onClick={gotoLogin}>Login</p>
          )}
            <button>Book Now</button>
        </div>
    </div>
  )
}

export default NavBar
