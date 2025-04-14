import React, { useState } from 'react';
import styles from '../css/navbar.module.css'
import { useNavigate, useLocation } from 'react-router-dom';


function Navbar() {

    const [isMenu, setIsMenu] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { username, password } = location.state || {};





    // notifBar dosplay status object
    const [notifBarDisplayStatus, setNotifBarDisplayStatus] = useState("none")
    const [notifMsg, setNotifMsg] = useState("hii")
    const showNotification = (message) => {
        setNotifBarDisplayStatus("flex")
        setNotifMsg(message)
        setTimeout(() => {
            setNotifBarDisplayStatus("none")

        }, 2000);
    }

    const viewMenu = () => {
        console.log("called")
        setIsMenu(!isMenu);
    }

    const toHome = () => {
        navigate('/home', { state: { username } })
    }
    const toProfile = () => {
        // verify the user
        if (!username) {
            showNotification("Bruh just login")
            return;
        }
        navigate('/profile', { state: { username } })
    }
    const toTrades = () => {
        // verify the user
        if (!username) {
            showNotification("did u login?? then..")
            return;
        }
        navigate('/alltrades', { state: { username } })
    }
    const toNews = () => {
        navigate('/news', { state: { username } })
    }
    const logout = () => {
        navigate('/');
    }
    return (
        <div>

            <table id={styles.table1}>
                <tbody>
                    <tr>
                        <th>
                            <p id={styles.title1} className={styles.headermain1}>TLog</p>
                        </th>
                        <th>
                            <i onClick={viewMenu} className="fa-solid fa-bars" id={styles.profile}></i>
                        </th>
                    </tr>
                </tbody>

            </table>
            <div >
                {isMenu ? (
                    <div id={styles.menu}>
                        <p id={styles.menuOp} onClick={toHome}><i id={styles.icons} className="fa-solid fa-house"></i>Home</p>
                        <p id={styles.menuOp} onClick={toProfile}><i id={styles.icons} className="fa-solid fa-user"></i>Profile</p>
                        <p id={styles.menuOp} onClick={toTrades}><i id={styles.icons} className="fa-solid fa-book"></i>All Trades</p>
                        <p id={styles.menuOp} onClick={toNews}><i id={styles.icons} className="fa-solid fa-newspaper"></i>News</p>
                        <i onClick={logout} className="fa-solid fa-power-off" id={styles.logout}></i>

                    </div>
                ) : ("")}

            </div>
            <div id={styles.notifBar} style={{ display: notifBarDisplayStatus, textAlign: "center" }}>
                <p id={styles.notif}>{notifMsg}</p>
            </div>
        </div>
    )
}

export default Navbar