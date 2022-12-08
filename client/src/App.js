
import React,{useEffect,createContext,useReducer,useContext} from "react";
import Navbar from "./components/Navbar";
import "./App.css"
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import {BrowserRouter,Route,Routes,useNavigate} from "react-router-dom"
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile"
import FollowinfUser from "./components/screens/FollowingUser"
import {reducer,initialState} from './reducers/userReducer'

export const UserContext=createContext()



const Routing=()=>{
  const navigate = useNavigate()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    // console.log(typeof(user),user)
    if(user){
      dispatch({type:"USER",payload:user})
      // navigate('/')
    }else{
      navigate('/signin')
    }
  },[])
  return (
    
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route exact path="/profile" element={<Profile/>}></Route>
    <Route path="/create" element={<CreatePost/>}></Route>
    <Route path="/profile/:userid" element={<UserProfile/>}></Route>
    <Route path="/myFollowingpost" element={<FollowinfUser/>}></Route>

    </Routes>
    
  )
}



function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}


export default App;
