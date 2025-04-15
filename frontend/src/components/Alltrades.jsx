import React, { useState, useEffect } from 'react';
import styles from '../css/alltrades.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading'
import Footer from './Footer'
import Navbar from './Navbar'


function Alltrades() {
    // navigate 
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};

    // usestate all trade data storing object
    const [datas, setData] = useState([]);

    // all usestate objects
    const [updateBoxDisplay, setUpdateBoxDisplay] = useState("none");
    const [uptradeID, setUptradeID] = useState()
    const [upClosePrice, setupClosePrice] = useState()
    const [upCloseOn, setUpCloseOn] = useState()
    const [upPnl, setUpPnl] = useState()
    const [upComment, setUpComment] = useState()


    // display to display and hide trade updating box
    const displayUpdateBox = () => {
        setUpdateBoxDisplay("block")
    }

    // handling the trade update form submiion
    const handleTradeUpdate = async (e) => {
        e.preventDefault();
        setUpdateBoxDisplay("none")
        // const response = await fetch("http://localhost:3000/updatetrade", {
        const response = await fetch('https://trades-log-mern.vercel.app/updatetrade', {
            body: JSON.stringify(
                {
                    username: username,
                    tradeID: uptradeID,
                    closePrice: upClosePrice,
                    closeOn: upCloseOn,
                    pnl: upPnl,
                    comment: upComment
                }
            ),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            credentials: 'include'
        });
        const responseData = await response.json();
        console.log(responseData);
    }

    // nagivate to home page
    const toHome = () => {
        navigate('/home', { state: { username } });
    }
    // fetch all trade data
    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('http://localhost:3000/allentry', {
            const response = await fetch('https://trades-log-mern.vercel.app/allentry', {
                body: JSON.stringify({ username: username }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                credentials: 'include'
            });
            const responseData = await response.json();
            setData(responseData.reverse())
            console.log(responseData);
        }
        fetchData();
    }, []);


    // individyal trade card
    const createCard = (data) => {
        const { tradeID, coin, amount, strategy, leverage, entryPrice, entryOn, closePrice, closeOn, pnl, comment } = data;
        return (
            <div className={styles.container}>
                <table id={styles.table2}>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <p id={styles.coin}>{coin}</p>
                            </td>
                            <td rowSpan={1}>
                                <p id={styles.tradeID}>{tradeID}</p>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                <p id={styles.amountL}>Amount</p>
                            </td>
                            <td>
                                <p id={styles.amount}>{amount} Rs</p>
                            </td>
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
                            <td style={{ wordWrap: 'break-word', width: "150px" }}>
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
            <Navbar />

            <p id={styles.updateTrades} onClick={displayUpdateBox}>Update Trade</p>
            <div id={styles.container}>
                {datas.length > 0 ? (
                    datas.map((data) => createCard(data)) // Map through each card data
                ) :
                    <Loading />
                }
            </div>
            <Footer />

            <div id={styles.updateBox} style={{ display: updateBoxDisplay }}>
                <form onSubmit={handleTradeUpdate}>
                    <table id={styles.table3}>
                        <tbody>
                            <tr>
                                <td colSpan={2} style={{ borderBottom: "1px solid rgb(80, 102, 110)" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <p id={styles.text3}>Update a Trade</p>
                                        <p id={styles.closeBtn} onClick={(e) => { setUpdateBoxDisplay("none") }}>X</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.text4}>Trade id</p>
                                </td>
                                <td>
                                    <input type='number' id={styles.updateInput} value={uptradeID} onChange={(e) => { setUptradeID(e.target.value) }} required />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.text4}>Close Price</p>
                                </td>
                                <td>
                                    <input type='number' id={styles.updateInput} value={upClosePrice} onChange={(e) => { setupClosePrice(e.target.value) }} required />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.text4}>close on</p>
                                </td>
                                <td>
                                    <input type='date' id={styles.updateInput} value={upCloseOn} onChange={(e) => { setUpCloseOn(e.target.value) }} required />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.text4}>pnl</p>
                                </td>
                                <td>
                                    <input type='number' id={styles.updateInput} value={upPnl} onChange={(e) => { setUpPnl(e.target.value) }} required />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <p id={styles.text4}>Comments</p>
                                </td>
                                <td>
                                    <input type='text' id={styles.updateInput} value={upComment} onChangeCapture={(e) => { setUpComment(e.target.value) }} required />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <input type='submit' value="submit" id={styles.submitUpdate} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
};

export default Alltrades;