import React, {useState, useEffect} from 'react'
import './AddMultipleImg.css'
import {toast} from 'react-toastify'
import Axios from 'axios'
import { useLocation } from 'react-router-dom'

function AddMultipleImages() {
    const location = useLocation()
    const [Product, setProduct] = useState(location.state)
   
    const [addmoreimgbtnname, setaddmoreimgbtnname] = useState('Upload Images')
    const [iddestination, setiddestination] = useState(null)
   
    const [multipleImages, setMultipleImages]=useState([])
    //Functions
    // console.log(location.state.category);
    console.log(Product);
    const takeImages = (e)=>setMultipleImages(e.target.files);

    
    const addImages = ()=>{
     
        const formData = new FormData()
        for(let i = 0; i<multipleImages.length; i++){
            formData.append('images', multipleImages[i])
            
           }
           formData.append("iddest", iddestination)
      console.log(multipleImages.toString());
     
      
        Axios.post('http://localhost:3500/addMultipleImages', formData, {
            headers:{
                'Content-Type':'multipart/form-data'
              }
        }).then(res=>{
          toast.success('Images uploaded', {
            autoClose:2000
          })
          
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
      console.log(location.state);
      Axios.get('http://localhost:3500/getiddestinations', {
        params:{
          userId: location.state.userId,
          rooms:location.state.rooms,
          name:location.state.name,
          loc:location.state.loc
        }
      }).then(res=>{
        console.log(res);
       setiddestination(res.data[0].iddestinations)
      })
    }, [])
  return (
    
    <div id='addMoreImages'>
      <h2>Add More Images of the Product</h2>
    <div id='mainmultImgDiv'>
    <div id='multImgDiv'>
    <input id='multImg' type="file" multiple onChange={takeImages} />
    <p>add 3 or 4 images</p>
    </div>
      <button id='multImgBtn' onClick={addImages}>{addmoreimgbtnname}</button>
    </div>
      <button id='multImgBtnSkip'>Skip</button>
          </div>
  )
}

export default AddMultipleImages
