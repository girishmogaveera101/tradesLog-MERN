import React,{useState} from 'react';
import '../css/login.css';
import Loading from './Loading';
import {Link, useNavigate} from 'react-router-dom';


function Login() {
    
    const navigate = useNavigate();
    // msg object 
    const[msg1, setmsg1]= useState('');


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
            username:username,
            password:password
        };
        const response = await fetch('https://trades-log-mern.vercel.app/login',{
            body:JSON.stringify(loginData),
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials: 'include'
        });
        const responseData = await response.json();
        if(response.status==200){
            navigate('/home', { state: { username,password } });
            console.log(responseData);
        }
        if(response.status==404){
            setIsLoading(false);
            setmsg1("Account not found!");
        }
        if(response.status==401){
            setIsLoading(false);
            setmsg1("Incorrect password!");
        }
    };

    return (
        <>
        {isLoading ? <Loading/> : ""}
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