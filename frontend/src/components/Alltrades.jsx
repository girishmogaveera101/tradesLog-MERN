import React, { useState, useEffect } from 'react';
import styles from '../css/alltrades.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Alltrades() {

    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};

    const [datas, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/allentry', {
                body: JSON.stringify({ username: username }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            });
            const responseData = await response.json();
            setData(responseData.reverse())
            console.log(responseData);
        }
        fetchData();
    }, []);



    const createCard = (data) => {
        const { tradeID,coin, amount, strategy, leverage, entryPrice, entryOn, closePrice, closeOn, pnl, comment } = data;
        return (
            <div className={styles.container}>
                <table id={styles.table2}>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <p id={styles.tradeID}>Trade ID : {tradeID}</p>
                            </td>
                            <td colSpan="2" rowSpan="4">
                                <p id={styles.coin}>{coin}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>Amount</p>
                            </td>
                            <td colSpan={2}>
                                <p id={styles.amount}>{amount}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>Strategy</p>
                            </td>
                            <td>
                                <p id={styles.strategy}>{strategy}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>Leverage</p>
                            </td>
                            <td>
                                <p id={styles.leverage}>{leverage}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>Entry Price</p>
                            </td>
                            <td>
                                <p id={styles.entryPrice}>{entryPrice}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>Entry On</p>
                            </td>
                            <td>
                                <p id={styles.entryOn}>{entryOn}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>Close Price</p>
                            </td>
                            <td>
                                <p id={styles.closePrice}>{closePrice}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>Close On</p>
                            </td>
                            <td>
                                <p id={styles.closeOn}>{closeOn}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.labels}>PNL</p>
                            </td>
                            <td>
                                <p id={styles.pnl}>{pnl}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.commentLabel}>Comments</p>
                            </td>
                            <td colSpan="3">
                                <p id={styles.comment}>{comment}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    };




    return (
        <>
            <table id={styles.table1}>
                <tbody>
                    <tr>
                        <th>
                            <p className={styles.headerMain1}>TLog</p>
                        </th>
                        <th>
                            <p id={styles.profile}>{username}</p>
                        </th>
                    </tr>
                </tbody>
            </table>

            <p id={styles.updateTrades}>Update Trade</p>

            <div id="card-container">
                {datas.length > 0 ? (
                    datas.map((data) => createCard(data)) // Map through each card data
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
};

export default Alltrades;