import React from 'react';
import Signin from './components/Signin'
import Login from './components/Login'
import Home from './components/Home'
import Alltrades from './components/Alltrades'
import NewsPage from './components/NewsPage'
import Profile from './components/Profile'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/alltrades" element={<Alltrades/>}/>
        <Route path="/news" element={<NewsPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
