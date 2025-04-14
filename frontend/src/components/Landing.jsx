import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from '../css/Landing.module.css'

function Landing() {
  const navigate = useNavigate(); 
  return (
    <div>


      <div id={style.mainBox}>
        <div id={style.box1}>
          <p id={style.title}>TradesLog</p>
          <p id={style.heading}>Your all-in-one crypto trading companion.</p>

        </div>


        <div id={style.box2}>
          <p id={style.subHeading}>Stay ahead of the game with a secure, powerful, and intuitive platform<br /> designed to simplify your crypto journey.</p>
          <ul>
            <li>Save and manage all your trade data effortlessly.</li>
            <li>View, edit, and update your trading history whenever you need.</li>
            <li>Get real-time crypto coin prices without jumping between tabs.</li>
            <li>Catch up on the latest crypto news right on your dashboard.</li>
            <li>Everything you need. One place. No distractions.</li>
          </ul>

          <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around", width:"100%",border:"0px solid red",marginTop:"10%"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p id={style.text1}>Ready to get started?</p>
              <button id={style.signin} onClick={() => { navigate('/signin') }}>signin</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p id={style.text1}>Already with us?</p>
              <button id={style.login} onClick={() => { navigate('/login') }}>login</button>

            </div>
          </div>
          <div id={style.guestBox}>
          <button id={style.guestMode} onClick={() => { navigate('/home') }}>guest mode?</button>

          </div>
        </div>


      </div>
    </div>
  )
}

export default Landing