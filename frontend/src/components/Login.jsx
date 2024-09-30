import React,{useState} from 'react';
import '../css/login.css';
import {Link, useNavigate} from 'react-router-dom';


function Login() {
    

    const navigate = useNavigate();
    const[msg1, setmsg1]= useState('');

    // user data
    const [userData, setUserData] = useState(null);

    // usestate variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // fun() called on sigining in
    const login = async (e) => {
        e.preventDefault();
        const loginData = {
            username:username,
            password:password
        };
        const response = await fetch('http://localhost:3001/login',{
            body:JSON.stringify(loginData),
            method:'POST',
            headers:{'Content-Type':'application/json'}
        });
        const responseData = await response.json();
        if(response.status==200){
            setUserData(responseData);
            var username = responseData.username;
            navigate('/home', { state: { user: userData } });
            console.log(responseData);
        }
        if(response.status==404){
            setmsg1("Account not found!");
        }
    };

    return (
        <>
          <div className="flexbox">
                <p id="footerLogo">TLog</p>

                <div id='flex-item1'>
                <form onSubmit={login}>
                <table id="loginCard">
                <thead>
                    <tr>
                        <td colSpan="2" id='td1'> 
                            <p id="dataEnter">log in</p><hr/>
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
                            <input type="submit" id="makeEntry" value="login"/>
                            
                        </td>
                    </tr>
                    </thead>
                </table>
                </form>
                <Link to="/">
                    <p id='oldUser'>Does not have an Acc?</p>
                </Link>
                <p id='msg1'>{msg1}</p>
                </div>
          </div>
        </>
    );
}

export default Login;