import React, { useEffect, useState } from 'react'
import '../Signup/Signup.css'
import Select from 'react-select';
import Axios from 'axios'
import url from '../url'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router';
function AddDestination() {
    Axios.defaults.withCredentials = true
    //States
    const navigate  =useNavigate()
    const [destname, setdestname] = useState(null)
    const [destlocation, setdestlocations] = useState(null)
    const [destdesc, sestdestdesc] = useState(null)
    const[desttrans, setdesttrans] = useState(null)
    const [destroom, setdestroom] = useState(null)
    const [destmainimg, setdestmainimg] = useState(null)
    const [userId, setuserId] = useState(null)
    const [price, setprice]=useState(null)
    const carTransportOptions = [
        { label: 'Sedan', value: 'sedan' },
        { label: 'SUV', value: 'suv' },
        { label: 'Convertible', value: 'convertible' },
        { label: 'Van', value: 'van' },
        { label: 'Luxury Car', value: 'luxury' },
        { label: 'Offroad Jeep', value: 'jeep' },
        { label: 'ATV', value: 'atv' },
        { label: 'Dirt Bike', value: 'dirtbike' },
        { label: 'Dune Buggy', value: 'dunebuggy' },
        { label: 'Monster Truck', value: 'monstertruck' },
        { label: 'Quad Bike', value: 'quadbike' },
        { label: 'Rock Crawler', value:'rockcrawler' },
        // Add more vehicles as needed
      ];
  
      const roomTypes = [
        { label: 'Standard Room', value: 'standard' },
        { label: 'Deluxe Room', value: 'deluxe' },
        { label: 'Suite', value: 'suite'},
        { label: 'Family Room', value: 'family' },
        { label: 'Executive Suite', value: 'executive' },
        // Add more room types as needed
      ];
      //Functions
      useEffect(()=>{
        Axios.get(`${url}login`).then(res=>{
            if(res.data.LoggedIn){
                setuserId(res.data.user[0].idusers)
            }
           
        })
      },[])
      const takeDestName = (e)=>{
        setdestname(e.target.value)
      }
      const takeDestLocation = (e)=>{
        setdestlocations(e.target.value)
      }
      const takeDestDesc = (e)=>{
        sestdestdesc(e.target.value)
      }
      const takeDestTransport = (e)=>{
       console.log(e.value);
       let data = e.map(e=>{
        return[
            e.value
        ]
    })
    setdesttrans(data.join(','))
      }
      const takeRooms = (e)=>{
        console.log(e);
      let data = e.map(e=>{
            return[
                e.value
            ]
        })
        console.log(data.join(","));
        setdestroom(data.join(","))
      }
      const takemainimg = (e)=>setdestmainimg(e.target.files[0])
      const postDest = ()=>{
        const formData = new FormData()
        formData.append('destname', destname)
        formData.append('destloc', destlocation)
        formData.append('destdesc', destdesc)
        formData.append('destrooms', destroom)
        formData.append('desttrans', desttrans)
        formData.append('destmainimg', destmainimg)
        formData.append('userId', userId)
        formData.append('price', price)

        Axios.post(`${url}postdest`,formData, {
            headers:{
                'Content-Type':'multipart/form-data'
              }
        }).then(res=>{
            toast.success(res.data.msg)
            navigate('/addmoreimages', {state:{userId:userId, rooms:destroom, name:destname, loc:destlocation}})
        })
      }
      const takeprice = (e)=>{
        setprice(e.target.value)
      }
      
  return (
    <div id='mainSignup'>
        <div id='setToAlign'>
        <p>Desitnation Name</p>
        <input type="text" onChange={takeDestName} />
        <p>Destiantion Location</p>
        <input type="text" onChange= {takeDestLocation} placeholder='...e.g Kenya/Nairobi' />
        <p>Destiantion Description</p>
        <textarea onChange={takeDestDesc}></textarea>
        <p>Transport Options</p>
        <Select
        options={carTransportOptions}
        onChange={takeDestTransport}
        isMulti
        className='reactSelect'
        />
        <p>Room Type</p>
        <Select
        options={roomTypes}
        onChange={takeRooms}
        isMulti
        className='reactSelect'

        />
        <p>Main Image Display</p>
        <input type="file" onChange={takemainimg} />
        <p>Average Price Per Night</p>
        <input type="number" onChange={takeprice}/>
        <button onClick={postDest}>Post Destination</button>
        </div>
      
    </div>
  )
}

export default AddDestination
