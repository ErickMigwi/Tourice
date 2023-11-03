import React, { useEffect, useState } from 'react'
import url from '../url'
import  Axios  from 'axios'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserPen} from '@fortawesome/free-solid-svg-icons'
import van from '../Images/6f.jpg'
import { useNavigate } from 'react-router'
function Profile() {
    Axios.defaults.withCredentials = true
  //States
  const navigate = useNavigate()
  const [user, setuser] = useState(null)
    //Functions
    useEffect(()=>{
        Axios.get(`${url}login`).then(res=>{
            console.log(res.data.user[0]);
            setuser(res.data.user[0])

        })
    },[])
    const gotoEdit = ()=>{
      navigate('/editprofile')
    }
    const gotologin = ()=>navigate('/login')
    const gotoAddDest = ()=>navigate('/adddestination')
  return (
    <div id='mainprofile'>
      {user &&
      <div id='displayprofile'>
      <img id='profileimg' src={`${url}uploads/${user.profileimage}`} alt="" srcset="" />
      <div>
     <div id='usernamedis'>
     <p>{user.username}</p>
        <button id='editprofile' onClick={gotoEdit}><FontAwesomeIcon className='editprofile' icon={faUserPen} /></button>
    
     </div>
     <button onClick={gotologin} id='switchAcc'>Switch Account</button>
     <h5>{user.firstname} {user.lastname}</h5>
     <br />
     
      </div>
    </div>
      }
      <div id='travelopt'>
      <img  id='van' src={van} alt="" srcset="" />
      <button id='view' onClick={gotoAddDest}>Add Destination</button>
      </div>
    </div>
  )
}

export default Profile
