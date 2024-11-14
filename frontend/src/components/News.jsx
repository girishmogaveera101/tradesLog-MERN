import React, { useState, useEffect } from 'react';
import styles from '../css/news.module.css';
import Loading from './Loading'


function News() {



  // images usestate varaibles
  const [newsData, setNews] = useState('')

  useEffect(() => {

    const apicall = async () => {

      // news api call 
      const response = await fetch('https://newsapi.org/v2/everything?q=crypto&apiKey=81aca55e08ca494594cda154137432cb');
      const resData = await response.json();
      console.log(resData)
      setNews(resData["articles"]);
    }
    apicall();


  }, []);


  const createCard = (data) => {
    console.log("NEWS : ", data)
    return (<a target='_blank'>
      <div id={styles.container}>
        <div id={styles.box1}>
          <img id={styles.image} src={data["urlToImage"]} height={100}></img>
          <p id={styles.title}>{data["title"]}</p>
        </div>
        <p id={styles.description}>{data["description"]}</p>
      </div>
    </a>
    )
  }


  return (
    <div id={styles.mainBox}>

      {newsData.length > 0 ? (
        newsData.map((news) => createCard(news))
      ) :( <Loading/>)}
    </div>

  )

}

export default News;