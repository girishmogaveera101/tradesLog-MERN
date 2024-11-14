import React, { useState } from 'react';
import styles from '../css/navbar.module.css'

function Navbar() {

    const [isMenu, setIsMenu] = useState(false);

    const viewMenu = () => {
        console.log("called")
        setIsMenu(!isMenu);
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
                            <a onClick={viewMenu}><ion-icon id={styles.profile} name="menu"></ion-icon></a>
                        </th>
                    </tr>
                </tbody>

            </table>

            <div >
                {isMenu ? (
                    <div id={styles.menu}>
                        <p id={styles.menuOp}>Profile</p>
                        <p id={styles.menuOp}>News</p>
                        <ion-icon id={styles.logout} name="power"></ion-icon>
                    </div>
                ) : ("")}

            </div>
        </div>
    )
}

export default Navbar