import React,{useState} from 'react';
// import '../css/login.css';

import {Link,useNavigate} from 'react-router-dom';



function Signin() {

    const navigate = useNavigate();
    const [msg1, setmsg1] = useState('');
    // usestate variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    // fun() called on sigining in
    const signin = async (e) => {
        e.preventDefault();
        const signinData = {
            username:username,
            email:email,
            phone:phone,
            password:password
        };
        const response = await fetch('http://localhost:3001/signin',{
            body:JSON.stringify(signinData),
            method:'POST',
            headers:{'Content-Type':'application/json'}
        });
        if(response.status==200){
            
            navigate('/home');
        }
        if(response.status==400){
            setmsg1("Account already exists!")
        }
        if(response.status==404){
            setmsg1("Error occurred!")
        }
        const responseData = await response.json();
        console.log(responseData.msg);
    };

    return (
        <>
          <div className="flexbox">
                  {/* logo */}
            <div className="flex-item">
                <p id="footerLogo">TLog</p>
            </div>

            <div className="flex-item">
                <form onSubmit={signin}>
                <table id="loginCard">
                <thead>
                    <tr>
                        <td colSpan="2" id='td1'> 
                            <p id="dataEnter">Create new account</p><hr/>
                        </td>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <td>
                            <p className="data">username</p>
                        </td>
                        <td>
                            <input className="dataInput" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} required/>
                        </td>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <td>
                            <p className="data">email</p>
                        </td>
                        <td>
                            <input className="dataInput" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                        </td>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <td>
                            <p className="data">phone</p>
                        </td>
                        <td>
                            <input className="dataInput" type="number" value={phone} onChange={(e) => {setPhone(e.target.value)}} required/>
                        </td>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <td>
                            <p className="data">password</p>
                        </td>
                        <td>
                            <input className="dataInput" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                        </td>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <td colSpan="2" id='td2'>
                            <input type="submit" id="makeEntry" value="signin"/>
                        </td>
                    </tr>
                    </thead>
                </table>
                </form>
                <Link to="/login">
                    <p id='oldUser'>Already have an Acc?</p>
                </Link>
                <p id='msg1'>{msg1}</p>
            </div>
          </div>
        </>
    );
}

export default Signin;