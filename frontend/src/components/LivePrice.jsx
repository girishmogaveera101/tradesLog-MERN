import React, { useState, useEffect } from 'react';
import styles from '../css/liveprice.module.css';


function Test() {


 // btc
 const [btcC, setBtcC] = useState("BTCUSDT");
 const [btcP, setBtcP] = useState('-');
 const [btcColor, setBtcColor] = useState('rgb(59, 172, 25)');
 // eth
 const [ethC, setEthC] = useState("ETHUSDT");
 const [ethP, setEthP] = useState('-');
 const [ethColor, setEthColor] = useState('rgb(59, 172, 25)');

 // wld
 const [wldC, setWldC] = useState("WLDUSDT");
 const [wldP, setWldP] = useState('-');
 const [wldColor, setWldColor] = useState('rgb(59, 172, 25)');

  // doge
  const [dogeC, setDogeC] = useState("DOGEUSDT");
  const [dogeP, setDogeP] = useState('-');
  const [dogeColor, setDogeColor] = useState('rgb(59, 172, 25)');

  // sol
  const [solC, setSolC] = useState("SOLUSDT");
  const [solP, setSolP] = useState('-');
  const [solColor, setSolColor] = useState('rgb(59, 172, 25)');




 useEffect(() => {
  const interval = setInterval(() => {
    apiCall(); 
  }, 1000);
  return () => clearInterval(interval); 
}, [btcP]); 



    const apiCall = async (e) => {
      // e.preventDefault();
      const btcRes = await fetch('https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
      const ethRes = await fetch('https://www.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
      const dogeRes = await fetch('https://www.binance.com/api/v3/ticker/price?symbol=DOGEUSDT');
      const wldRes = await fetch('https://www.binance.com/api/v3/ticker/price?symbol=WLDUSDT');
      const solRes = await fetch('https://www.binance.com/api/v3/ticker/price?symbol=SOLUSDT');


      const btc = await btcRes.json();
      const eth = await ethRes.json();
      const wld = await wldRes.json();
      const doge = await dogeRes.json();
      const sol = await solRes.json();



      if (btc) {
        if(btcP != undefined && btcP != null && Number(btc.price) < Number(btcP) ){
          setBtcColor('red')
        }
        else{
          setBtcColor('rgb(59, 172, 25)')
        }
        console.log("BTC : ",btc.price);
        setBtcC(btc.symbol)
        setBtcP(Number(btc.price));
      }
      if (eth) {
        if(ethP != undefined && ethP != null && Number(eth.price) < Number(ethP) ){
          setEthColor('red')
        }
        else{
          setEthColor('rgb(59, 172, 25)')
        }
        // console.log("ETH : ",eth.price);
        setEthC(eth.symbol)
        setEthP(Number(eth.price));
      }
      if (doge) {
        if(dogeP != undefined && dogeP != null && Number(doge.price) < Number(dogeP) ){
          setDogeColor('red')
        }
        else{
          setDogeColor('rgb(59, 172, 25)')
        }
        // console.log("DOGE : ",doge.price);
        setDogeC(doge.symbol)
        setDogeP(Number(doge.price));
      }
      if (wld) {
        if(wldP != undefined && wldP != null && Number(wld.price) < Number(wldP) ){
          setWldColor('red')
        }
        else{
          setWldColor('rgb(59, 172, 25)')
        }
        // console.log("WLD : ",wld.price);
        setWldC(wld.symbol)
        setWldP(Number(wld.price));
      }
      if (sol) {
        if(solP != undefined && solP != null && Number(sol.price) < Number(solP) ){
          setSolColor('red')
        }
        else{
          setSolColor('rgb(59, 172, 25)')
        }
        // console.log("SOL : ",sol.price);
        setSolC(sol.symbol)
        setSolP(Number(sol.price));
      }
    }

    return (
      <>
        <div id={styles.container}>
          <div id={styles.c1}>
            <p id={styles.coin}>{btcC}</p>
            <p id={styles.price} style={{color: btcColor}}>{btcP}</p>
          </div>
          <div id={styles.c1}>
            <p id={styles.coin}>{ethC}</p>
            <p id={styles.price} style={{color: ethColor}}>{ethP}</p>
          </div>
          <div id={styles.c1}>
            <p id={styles.coin}>{wldC}</p>
            <p id={styles.price} style={{color: wldColor}}>{wldP}</p>
          </div>
          <div id={styles.c1}>
            <p id={styles.coin}>{dogeC}</p>
            <p id={styles.price} style={{color: dogeColor}}>{dogeP}</p>
          </div>
          <div id={styles.c1}>
            <p id={styles.coin}>{solC}</p>
            <p id={styles.price} style={{color: solColor}}>{solP}</p>
          </div>
        </div>
        {/* <button id={styles.btn} onClick={apiCall}>api call</button> */}
      </>
    )
  }
export default Test;