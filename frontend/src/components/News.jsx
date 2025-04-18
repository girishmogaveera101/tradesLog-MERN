import React, { useState, useEffect } from 'react';
import styles from '../css/news.module.css';
import Loading from './Loading'
// require('../../../backend/dotenv').config();


function News() {



  // news usestate varaibles
  const [newsData, setNews] = useState('')

  useEffect(() => {

    const apicall = async () => {

      try {

        // news api call 
        const response = await fetch('/api/news');
        // const response = await fetch(`https://newsapi.org/v2/everything?q=crypto&apiKey=`);
        const resData = await response.json();
        // console.log(resData)
        setNews(resData["articles"] || []);
      }
      catch (err) {
        console.error("Failed to fetch news data:", err);
      }
    }
    apicall();


  }, []);


  const createCard = (data) => {
    // console.log("NEWS : ", data)
    return (<a href={data['url']} target='_blank' rel="noopener noreferrer" key={data.title}>
      <div id={styles.container}>
        <div id={styles.box1}>
          <img id={styles.image} src={data["urlToImage"]} alt="News thumbnail" height={100}></img>
          <p id={styles.title}>{data["title"]}</p>
        </div>
        <p id={styles.description}>{data["description"]}</p>
      </div>
    </a>
    )
  }


  return (
    <div id={styles.mainBox}>

      {newsData && newsData.length > 0 ? (
        newsData.map((news) => createCard(news))
      ) : (<Loading />)}
    </div>

  )

}

export default News;