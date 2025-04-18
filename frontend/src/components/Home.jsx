import React, { useEffect, useState } from 'react';
import styles from '../css/home.module.css';
import Loading from './Loading'
import News from './News';
import Footer from './Footer'
import Navbar from './Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LivePrice from './LivePrice'


function Home() {


    const location = useLocation();
    const navigate = useNavigate();
    const { username, password } = location.state || {};

    // loading animation
    const [isLoading, setIsLoading] = useState(false);

    // guest mode status object
    const [isGuestMode, setIsGuestMode] = useState(false);


    // usestate variables
    const [tradeID, setTradeID] = useState("");
    const [coin, setCoin] = useState("BTC");
    const [amount, setAmount] = useState("");
    const [strategy, setStrategy] = useState("Trend");
    const [leverage, setLeverage] = useState("");
    const [entryPrice, setEntryPrice] = useState("");
    const [closePrice, setExitPrice] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [closeDate, setCloseDate] = useState("");
    const [pnl, setPnl] = useState("");
    const [comment, setComment] = useState("");



    // notifBar dosplay status object
    const [notifBarDisplayStatus, setNotifBarDisplayStatus] = useState("none")
    const [notifMsg, setNotifMsg] = useState("fk u nigga")
    const showNotification = (message) => {
        setNotifBarDisplayStatus("flex")
        setNotifMsg(message)
        setTimeout(() => {
            setNotifBarDisplayStatus("none")

        }, 2000);
    }

    // function to handle on submitting new entry

    const newTradeEntry = async (e) => {
        e.preventDefault();

        // start loading animation
        setIsLoading(true);

        // verify the user
        if(!username){
            showNotification("Bruh ur not logged in..")
            return;
        }

        const newEntry = {
            username: username,
            tradeID: tradeID,
            coin: coin,
            amount: amount,
            strategy: strategy,
            leverage: leverage,
            entryPrice: entryPrice,
            entryOn: entryDate,
            closePrice: closePrice,
            closeOn: closeDate,
            pnl: pnl,
            comment: comment
        };
        console.log(tradeID)
        // const response = await fetch('http://localhost:3000/entry', {
            const response = await fetch('https://trades-log-mern.vercel.app/entry', {
            body: JSON.stringify(newEntry),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        });
        const responseData = await response.json();
        if (response.status == 200) {
            setIsLoading(false)
            console.log("sent successfully")
        }
        if (response.status == 400) {
            setIsLoading(false)
            console.log("Trade ID alreay exists")
        }
        console.log(responseData);
    }

    const toAllTrades = () => {
        if (username) {
            navigate('/alltrades', { state: { username } });

        }
        else {
            showNotification("login required bruhh !!!");
        }
    }



    return (

        <>
            {/* {username ? console.log("session exists") : hiiii} */}
            {/* {isLoading ? <Loading /> : ''} */}


            {/* Navigation Bar component*/}
            <Navbar />

            {/* live price compolnent */}
            <LivePrice />
            <p id={styles.allTrades} onClick={toAllTrades}>See all trades </p>



            {/* form data input */}
            <div className={styles.flexbox}>
                <div className={styles.flexitem1}>
                    <form onSubmit={newTradeEntry}>
                        <table id={styles.table2}>
                            <tbody>
                                <tr>
                                    <th colSpan="2" >
                                        <p id={styles.dataEnter}>Enter the Trade Details</p>
                                        <hr />
                                    </th>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={styles.data}>Trade ID</p>
                                    </td>
                                    <td>
                                        <input min={100} className={styles.dataInput} placeholder='Ex : 1023' type="number" name="tNo" value={tradeID} onChange={(e) => { setTradeID(e.target.value) }} required />
                                    </td>
                                </tr>
                            </tbody>
                            <tr>
                                <td>
                                    <p className={styles.data}>Coin</p>
                                </td>
                                <td>
                                    <select id={styles.sel1} value={coin} onChange={(e) => setCoin(e.target.value)} required>
                                        <option>BTC</option>
                                        <option>ETH</option>
                                        <option>SOL</option>
                                        <option>WLD</option>
                                        <option>MATIC</option>
                                        <option>DOGE</option>
                                        <option>MEME</option>
                                        <option>LTC</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Amount</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} placeholder='Ex : 55000  (INR)' type="number" value={amount} onChange={(e) => { setAmount(e.target.value) }} required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Strategy</p>
                                </td>
                                <td>
                                    <select id={styles.sel1} value={strategy} onChange={(e) => setStrategy(e.target.value)} required>
                                        <option>Trend</option>
                                        <option>OB Entry</option>
                                        <option>SNR</option>
                                        <option>FVG</option>
                                        <option>Market DIP</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Leverage</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} placeholder='Ex : 5X' type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)} required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Entry price</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} placeholder='Ex : 65800  (INR)' type="number" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Entry on</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Close Price</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} placeholder='Ex : 66800  (INR)' type="number" value={closePrice} onChange={(e) => setExitPrice(e.target.value)} />
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <p className={styles.data}>Closed on</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} type="date" value={closeDate} onChange={(e) => setCloseDate(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>PNL</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} placeholder='Ex : 4000  (INR)' type="number" value={pnl} onChange={(e) => setPnl(e.target.value)} />
                                </td>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={styles.data}>Comment</p>
                                    </td>
                                    <td>
                                        <input maxLength={60} className={styles.dataInput} placeholder='Ex : Hit TP ' type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td colSpan="2">
                                        <input type="submit" id={styles.makeEntry} value="Make Entry" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>



                <div className={styles.flexitem2}>
                    {/* news component */}
                    <News />
                </div>
            </div>
            {/* footer component */}
            <Footer />


            {/* notification bar */}

            <div id={styles.notifBar} style={{ display: notifBarDisplayStatus, textAlign: "center" }}>
                <p id={styles.notif}>{notifMsg}</p>
            </div>
        </>
    )
}

export default Home