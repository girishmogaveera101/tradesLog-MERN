import React from 'react'
import styles from '../css/footer.module.css';

function Footer() {
    return (
        <div>

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
                            <p id={styles.copyrightText}>Copyright 2098-2099. Code for Fun</p>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Footer