import React, { useEffect, useState } from 'react';
import styles from '../css/home.module.css';
import { Link, useLocation } from 'react-router-dom';



function Home() {


    const location = useLocation();
    const {username,password} = location.state || {};



    // usestate variables
    const [tradeID, setTradeID] = useState("");
    const [coin, setCoin] = useState("");
    const [amount, setAmount] = useState("");
    const [strategy, setStrategy] = useState("");
    const [leverage, setLeverage] = useState("");
    const [entryPrice, setEntryPrice] = useState("");
    const [exitPrice, setExitPrice] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [closeDate, setCloseDate] = useState("");
    const [pnl, setPnl] = useState("");
    const [comment, setComment] = useState("");

    // function to handle on submitting new entry

    const newTradeEntry = async (e) => {
        e.preventDefault()
        const newEntry = { 
            username : username,
            tradeID : tradeID, 
            comment : comment
        };
        console.log(tradeID)
        const response = await fetch('http://localhost:3001/entry', {
            body: JSON.stringify(newEntry),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        });
        const responseData = await response.json();
        if(response.status == 200){
            console.log("sent successfully")
        }
        console.log(responseData);
    }



    return (

        <>
            <table id={styles.table1}>
                <thead>
                    <tr>
                        <th>
                            <p id={styles.headermain1} className={styles.headerMain1}>TLog</p>
                        </th>
                        <th>
                            <p id={styles.profile}>{username}</p>
                        </th>
                    </tr>
                </thead>
            </table>


            <Link to="/">
                <p id={styles.allTrades}>See all trades </p>
            </Link>


            {/* form data input */}
            <div className={styles.flexbox}>
                <div className={styles.flexitem1}>
                    <form onSubmit={newTradeEntry}>
                        <table id={styles.table2}>
                            <thead>
                                <tr>
                                    <th colSpan="2" >
                                        <p id={styles.dataEnter}>Enter the Trade Details</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={styles.data}>Trade ID</p>
                                    </td>
                                    <td>
                                        <input className={styles.dataInput} type="number" name="tNo" value={tradeID} onChange={(e) => { setTradeID(e.target.value) }}  required/>
                                    </td>
                                </tr>
                            </tbody>
                            <tr>
                                <td>
                                    <p className={styles.data}>Coin</p>
                                </td>
                                <td>
                                    <select id={styles.sel1} value={coin} onChange={(e) => setCoin(e.target.value)}>
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
                                    <p className={styles.data}>Amount(Rs)</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} type="number" value={amount} onChange={(e) => { setAmount(e.target.value) }}  />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Strategy</p>
                                </td>
                                <td>
                                    <select id={styles.sel1} value={strategy} onChange={(e) => setStrategy(e.target.value)}>
                                        <option>Support and Resistance</option>
                                        <option>Trendline</option>
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
                                    <input className={styles.dataInput} type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)}  />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Coin Entry price</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} type="number" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)}  />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Coin Exit Price</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} type="number" value={exitPrice} onChange={(e) => setExitPrice(e.target.value)}  />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={styles.data}>Entry Date</p>
                                </td>
                                <td>
                                    <input className={styles.dataInput} type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)}  />
                                </td>
                            </tr>
                            <tr>

                                <td>
                                    <p className={styles.data}>Close Date</p>
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
                                    <input className={styles.dataInput} type="number" value={pnl} onChange={(e) => setPnl(e.target.value)} />
                                </td>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={styles.data}>Comments</p>
                                    </td>
                                    <td>
                                        <input className={styles.dataInput} type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
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
                        <thead>
                            <tr>
                                <th>
                                    <p id={styles.footerLogo}>TLog</p>
                                </th>
                            </tr>
                        </thead>
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