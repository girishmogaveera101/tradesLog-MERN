import React from 'react'
import News from './News'
import Navbar from './Navbar'
import Footer from './Footer'

function NewsPage() {
    const text = {
        fontFamily:"arial",
        fontWeight:"bolder",
        fontSize:"20px",
        marginTop:"130px",
        color:"black",
        marginLeft:"30px"

    }
  return (
    <div>
        <Navbar/>
        <p style={text}>Latest News and Articles</p>
        <News/>
        <Footer/>
    </div>
  )
}

export default NewsPage