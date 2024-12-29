import React from 'react';
import Home from './pages/Home.js';
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import { Route,Routes } from "react-router-dom"
import { AuthProvider } from './context/auth.js';

function App() {
  return (
    <AuthProvider>    
      <Routes>
        <Route path='/' element={<Login></Login>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signup' element={<Signup></Signup>}/>
        <Route path='/home' element={<Home></Home>}/>      
      </Routes>
  </AuthProvider>
      
  );
}

export default App;