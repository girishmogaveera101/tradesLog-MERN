import React, { useEffect, useState } from 'react';
import styles from '../css/home.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LivePrice from './LivePrice'


function Home() {


    const location = useLocation();
    const navigate = useNavigate();
    const { username, password } = location.state || {};



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

    // function to handle on submitting new entry

    const newTradeEntry = async (e) => {
        e.preventDefault()
        const newEntry = {
            username: username,
            tradeID: tradeID,
            coin: coin,
            amount: amount,
            strategy: strategy,
            leverage: leverage,
            entryPrice : entryPrice,
            entryOn : entryDate,
            closePrice : closePrice,
            closeOn : closeDate,
            pnl : pnl,
            comment: comment
        };
        console.log(tradeID)
        const response = await fetch('https://trades-log-mern.vercel.app/entry', {
            body: JSON.stringify(newEntry),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        });
        const responseData = await response.json();
        if (response.status == 200) {
            console.log("sent successfully")
        }
        console.log(responseData);
    }

    const toAllTrades = () => {
        navigate('/alltrades', { state: { username } });
    }



    return (

        <>
            <table id={styles.table1}>
                <tbody>
                    <tr>
                        <th>
                            <p id={styles.title1} className={styles.headermain1}>TLog</p>
                        </th>
                        <th>
                        <ion-icon id={styles.profile} name="menu"></ion-icon>
                        </th>
                    </tr>
                </tbody>
            </table>


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
                                        <hr/>
                                    </th>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={styles.data}>Trade ID</p>
                                    </td>
                                    <td>
                                        <input className={styles.dataInput} placeholder='Ex : 1023' type="number" name="tNo" value={tradeID} onChange={(e) => { setTradeID(e.target.value) }} required />
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
                                    <input className={styles.dataInput} placeholder='Ex : 55000  (INR)' type="number" value={amount} onChange={(e) => { setAmount(e.target.value) }} required/>
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
                                    <input className={styles.dataInput} placeholder='Ex : 5X' type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)} required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Entry price</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} placeholder='Ex : 65800  (INR)' type="number" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Entry on</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} required/>
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
                                        <input maxLength={60} className={styles.dataInput} placeholder='Ex : Hit TP ' type="text" value={comment} onChange={(e) => setComment(e.target.value)}  />
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
                    <table id={styles.footer}>
                        <tbody>
                            <tr>
                                <th>
                                    <p id={styles.footerLogo}>TLog</p>
                                </th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <a target="_blank" href="https://www.instagram.com/girizhh/"><p id={styles.footerText}>INSTAGRAM</p></a>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.footerText}>TWITTER</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.footerText}>GITHUB</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.footerText}>FACEBOOK</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.footerText}>LINKEDIN</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.footerText}>CONTACT</p>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.copyrightText}>Copyright 2023-2024 by Refsnes Data. Not All Rights Reserved.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home