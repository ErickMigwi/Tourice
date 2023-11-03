import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import url from '../url'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router'
import '../Signup/Signup.css'
function Editprofile() {
    Axios.defaults.withCredentials = true
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
    const [userdata, setuserdata] = useState(null)
    const [userId, setuserId] = useState(null)
    //Funtions 
    useEffect(()=>{
       Axios.get(`${url}login`).then(res=>{
        if(res.data.LoggedIn){
            setuserdata(res.data.user[0])
            setEmail(res.data.user[0].email)
          setfirstname(res.data.user[0].firstname)
          setlastname(res.data.user[0].lastname)
          setusername(res.data.user[0].username)
          setcountry(res.data.user[0].country)
          setcity(res.data.user[0].city)
          setprofileimage(res.data.user[0].profileimage)
          setuserId(res.data.user[0].idusers)
        }
       }) 
    },[])
    const takeEmail = e=>setEmail(e.target.value)
    const takeFirstName = e=>setfirstname(e.target.value)
    const takeLastName = e=>setlastname(e.target.value)
    const takeUserName = e=>setusername(e.target.value)
    const takeCountry = e=>setcountry(e.target.value)
    const takeCity = e=>setcity(e.target.value)
    const takeProfileImg = e=>{
      setprofileimage(e.target.files[0])
    }
    
    const editProf = ()=>{
        const formData = new FormData()
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('username', username)
        formData.append('country', country)
        formData.append('city', city)
        formData.append('image', profileimage)
        formData.append('iduser', userId)
       
        Axios.post(`${url}editprofile`, formData, {
            headers:{
                'Content-Type':'multipart/form-data'
              }
        }).then(res=>{
           
                toast.success(res.data.msg)
               navigate('/profile')
           
            
            console.log(res);
        })
    }
  return (
   <>
   {userdata ?(
     <div id='mainSignup'>
     <div id='setToAlign'>
       <p>Email</p>
       <input type="email" onChange={takeEmail} value={email} />
       <p>FirstName</p>
       <input type="text" onChange={takeFirstName} value={firstname}/>
       <p>Lastname</p>
       <input type="text" onChange={takeLastName} value={lastname}/>
       <p>Username</p>
       <input type="text" onChange={takeUserName} value={username} />
       <p>Country</p>
       <input type="text" onChange={takeCountry} value={country} />
       <p>City</p>
       <input type="text"  onChange={takeCity} value={city}/>
       <p>Profile Image</p>
       <input type="file" onChange={takeProfileImg}/>
       <button onClick={editProf}>Edit</button>
     </div>
   </div>
   ):(
    <p>Login to view profile</p>
   )}
   </>
  )
}

export default Editprofile
