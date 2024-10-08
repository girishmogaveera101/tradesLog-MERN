import React, { useState, useEffect } from 'react';
import styles from '../css/alltrades.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Alltrades() {

    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};

    const [datas, setData] = useState([]);


    const toHome = () => {
        navigate('/home', {state: {username}});
    }

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
                            <td colSpan={3}>
                                <p id={styles.coin}>{coin}</p>
                            </td>
                            <td rowSpan={2}>
                                <p id={styles.tradeID}>{tradeID}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td colSpan={1}>
                                <p id={styles.amountL}>Amount</p>
                            </td>
                            <td>
                                <p id={styles.amount}>{amount} Rs</p>
                            </td>
                            {/* <td style={{width:'0%'}}>
                            </td> */}
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.strategyL}>Strategy</p>
                            </td>
                            <td>
                                <p id={styles.strategy}>{strategy}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.leverageL}>Leverage</p>
                            </td>
                            <td>
                                <p id={styles.leverage}>{leverage}X</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.entryPriceL}>Entry Price</p>
                            </td>
                            <td>
                                <p id={styles.entryPrice}>{entryPrice} Rs</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.entryOnL}>Entry On</p>
                            </td>
                            <td>
                                <p id={styles.entryOn}>{entryOn}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.closePriceL}>Close Price</p>
                            </td>
                            <td>
                                <p id={styles.closePrice}>{closePrice} Rs</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.closeOnL}>Close On</p>
                            </td>
                            <td>
                                <p id={styles.closeOn}>{closeOn}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.pnlL}>PNL</p>
                            </td>
                            <td>
                                <p id={styles.pnl}>{pnl} Rs</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td style={{ wordWrap: 'break-word'}}>
                                <p id={styles.commentL}>Comments</p>
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
                            <p className={styles.headerMain1} onClick={toHome}>TLog</p>
                        </th>
                        <th>
                            <p id={styles.profile}>{username}</p>
                        </th>
                    </tr>
                </tbody>
            </table>

            <p id={styles.updateTrades}>Update Trade</p>
            <div id={styles.container}>
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
