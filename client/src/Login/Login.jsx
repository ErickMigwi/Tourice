import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './Login.css'
import Axios  from 'axios'
import url from '../url'
import {toast} from 'react-toastify'
function Login() {
    //States
    const navigate = useNavigate()
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    //Functions
    const gotoSignUp = ()=>{
        navigate('/signup')
    }
    const takeemail = e=>setemail(e.target.value)
    const takepassword = e=>setpassword(e.target.value)
    const login = ()=>{
        Axios.post(`${url}login`, {
            email:email,
            password:password
        }).then(res=>{
            if(res.data.msg==="successfull logIn"){
                toast.success(`${res.data.msg}`, {
                    autoClose:1000
                })
                navigate('/')
                window.location.reload()
            }else{
                toast.warning(`${res.data.msg}`,{
                    autoClose:1000
                })
            }
        })
    }

  return (
    <div id='mainLogin'>
      <div id="right">
        <h3>Login</h3>
        <p>Email</p>
        <input type="email" onChange={takeemail} />
        <p>Password</p>
        <input type="password" onChange={takepassword} />
        <button onClick={login}>Login</button>
        <h5 onClick={gotoSignUp}>If you don't have an account click here</h5>
      </div>
      <div id="left">
        <p>Adventure awaits! Log in to your account and embark on a journey of discovery with our exciting travel experiences.</p>
      </div>
    </div>
  )
}

export default Login
