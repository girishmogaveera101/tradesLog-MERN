import React from 'react';
import Signin from './components/Signin'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
