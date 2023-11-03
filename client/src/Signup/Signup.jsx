import React, { useState } from 'react'
import './Signup.css'
import Axios from 'axios'
import url from '../url'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router'
function Signup() {
    //States
    const navigate = useNavigate()
    const [firstname, setfirstname] = useState(null)
    const [lastname, setlastname] = useState(null)
    const [email, setEmail] = useState(null)
    const [username, setusername] = useState(null)
    const [country, setcountry] = useState(null)
    const [city, setcity] = useState(null)
    const [profileimage, setprofileimage] = useState(null)
    const [password, setpassword] = useState(null)
    //Funtions 
    const takeEmail = e=>setEmail(e.target.value)
    const takeFirstName = e=>setfirstname(e.target.value)
    const takeLastName = e=>setlastname(e.target.value)
    const takeUserName = e=>setusername(e.target.value)
    const takeCountry = e=>setcountry(e.target.value)
    const takeCity = e=>setcity(e.target.value)
    const takeProfileImg = e=>{
      setprofileimage(e.target.files[0])
    }
    const takePassword = e=>setpassword(e.target.value)
    const createAcc = ()=>{
        const formData = new FormData()
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('username', username)
        formData.append('country', country)
        formData.append('city', city)
        formData.append('image', profileimage)
        formData.append('password', password)
        Axios.post(`${url}signup`, formData, {
            headers:{
                'Content-Type':'multipart/form-data'
              }
        }).then(res=>{
            if(res.data.msg==="Created account successfully"){
                toast.success(res.data.msg)
                navigate('/login')
            }
            else{
                toast.warning(res.data.msg)
            }
            
            console.log(res);
        })
    }
  return (
    <div id='mainSignup'>
      <div id='setToAlign'>
        <p>Email</p>
        <input type="email" onChange={takeEmail} />
        <p>FirstName</p>
        <input type="text" onChange={takeFirstName}/>
        <p>Lastname</p>
        <input type="text" onChange={takeLastName}/>
        <p>Username</p>
        <input type="text" onChange={takeUserName} />
        <p>Country</p>
        <input type="text" onChange={takeCountry} />
        <p>City</p>
        <input type="text"  onChange={takeCity}/>
        <p>Profile Image</p>
        <input type="file" onChange={takeProfileImg}/>
        <p>Password</p>
        <input type="password" onChange={takePassword} />
        <button onClick={createAcc}>Create Account</button>
      </div>
    </div>
  )
}

export default Signup
