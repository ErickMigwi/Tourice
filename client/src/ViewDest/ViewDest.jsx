import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import url from '../url'
import './ViewDest.css'
function ViewDest() {
    const [destinations, setdests] = useState()
    const getDests = ()=>{
        Axios.get(`${url}getDests`).then(res=>{
            console.log(res);
            setdests(res.data)
        })
    }
    useEffect(()=>{
        getDests()
    },[])
  return (
    <div id='dest'>
      <div id='displaydest'>
        {destinations && destinations.map(e=>{
            return(
                <div id='placegap'>
                    <img id='viewDestImg' src={`${url}uploads/${e.destmainimg}`} alt="" srcset="" />
                    <p id='destname'>{e.destname}</p>
                    <p id='roomsAva'>Available rooms:{e.destrooms && e.destrooms.split(",").map(d=>{
                        return(
                            <div >
                                <p id='rooms'>{d}</p>
                            </div>
                        )
                    })}</p>
                    <p id='roomsAva'>Available Transport Mode:{e.desttransport && e.desttransport.split(",").map(d=>{
                        return(
                            <div>
                                <p id='cars'>{d}</p>
                            </div>
                        )
                    })}</p>
                    <p id='price'>Ksh {e.price}/Night</p>
                    <button id='booknow'>Book Now</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default ViewDest
