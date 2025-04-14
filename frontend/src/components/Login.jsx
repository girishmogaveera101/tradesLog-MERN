import React, { useState } from 'react';
import style from '../css/login.module.css';
import Loading from './Loading';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();
    // msg object 
    const [msg1, setmsg1] = useState('');


    // usestate variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // loading animation
    const [isLoading, setIsLoading] = useState(false);

    // fun() called on sigining in
    const login = async (e) => {
        e.preventDefault();

        // animation
        setIsLoading(true);

        const loginData = {
            username: username,
            password: password
        };
        // const response = await fetch('http://localhost:3000/login', {
            const response = await fetch('https://trades-log-mern.vercel.app/login', {
            body: JSON.stringify(loginData),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const responseData = await response.json();
        if (response.status == 200) {
            navigate('/home', { state: { username, password } });
            console.log(responseData);
        }
        if (response.status == 404) {
            setIsLoading(false);
            setmsg1("Account not found!");
        }
        if (response.status == 401) {
            setIsLoading(false);
            setmsg1("Incorrect password!");
        }
    };

    return (
        <>
            {isLoading ? <Loading /> : ""}
            <div className={style.flexbox}>
                <p id={style.footerLogo}>TLog</p>

                <div id={style.flexItem1}>
                    <form onSubmit={login}>
                    <table id={style.loginCard}>
                            <thead>
                                <tr>
                                    <td colSpan="2" id={style.td1}>
                                        <p id={style.dataEnter}>log in</p><hr />
                                    </td>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td>
                                        <p className={style.data}>username</p>
                                    </td>
                                    <td>
                                        <input className={style.dataInput} type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                                    </td>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td>
                                        <p className={style.data}>password</p>
                                    </td>
                                    <td>
                                        <input className={style.dataInput} type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                                    </td>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td colSpan="2" id='td2'>
                                        <input type="submit" id={style.makeEntry} value="login" />

                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </form>
                    <Link to="/signin">
                        <p id={style.oldUser}>Does not have an Acc?</p>
                    </Link>
                    <p id={style.msg1}>{msg1}</p>
                </div>
            </div>
        </>
    );
}

export default Login;