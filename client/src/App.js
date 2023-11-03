import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router'
import './NavBar/NavBar.css'
import Home from './Home/Home'
import NavBar from './NavBar/NavBar'
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './Profile/Profile';
import Editprofile from './EditProfile/Editprofile';
import AddDestination from './AddDestination/AddDestination';
import AddMultipleImages from './AddMultipleImages/AddMultipleImages';
import ViewDest from './ViewDest/ViewDest';
function App() {
  return (
    <div className="App">
      <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/editprofile' element = {<Editprofile/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/adddestination' element={<AddDestination/>}/>
      <Route path='/addmoreimages' element={<AddMultipleImages/>}/>
      <Route path='/viewdestinations' element={<ViewDest/>}/>
    </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;
