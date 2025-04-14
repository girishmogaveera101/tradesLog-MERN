import React, { useState } from 'react';
import style from '../css/login.module.css';
import Loading from './Loading'
import { Link, useNavigate } from 'react-router-dom';



function Signin() {

    const navigate = useNavigate();
    const [msg1, setmsg1] = useState('');
    // usestate variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    // loading animation
    const [isLoading, setIsLoading] = useState(false);

    // fun() called on sigining in
    const signin = async (e) => {
        e.preventDefault();

        // animation
        setIsLoading(true);

        const signinData = {
            username: username,
            email: email,
            phone: phone,
            password: password
        };
        // const response = await fetch('http://localhost:3000/signin',{
        const response = await fetch('https://trades-log-mern.vercel.app/signin', {
            body: JSON.stringify(signinData),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status == 200) {

            navigate('/home', { state: { username, password } });
        }
        if (response.status == 400) {
            setIsLoading(false);
            setmsg1("Account already exists!")
        }
        if (response.status == 404) {
            setIsLoading(false);
            setmsg1("Error occurred!")
        }
        const responseData = await response.json();
        console.log(responseData.msg);
    };

    return (
        <>
            {isLoading ? <Loading /> : ""}
            <div className={style.flexbox}>
                {/* logo */}
                <div className={style.flexItem}>
                    <p id={style.footerLogo}>TLog</p>
                </div>

                <div className={style.flexItem}>
                    <form onSubmit={signin}>
                        <table id={style.loginCard}>
                            <thead>
                                <tr>
                                    <td colSpan="2" id={style.td1}>
                                        <p id={style.dataEnter}>Create new account</p><hr />
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
                                        <p className={style.data}>email</p>
                                    </td>
                                    <td>
                                        <input className={style.dataInput} type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                                    </td>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td>
                                        <p className={style.data}>phone</p>
                                    </td>
                                    <td>
                                        <input className={style.dataInput} type="number" value={phone} onChange={(e) => { setPhone(e.target.value) }} required />
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
                                    <td colSpan="2" id={style.td2}>
                                        <input type="submit" id={style.makeEntry} value="signin" />
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </form>
                    <Link to="/login">
                        <p id={style.oldUser}>Already have an Acc?</p>
                    </Link>
                    <p id='msg1'>{msg1}</p>
                </div>
            </div>
        </>
    );
}

export default Signin;