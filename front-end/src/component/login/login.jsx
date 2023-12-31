import React, { useState } from 'react';
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./login.css";
import Home_header from '../header/home_header';
import { Link, useNavigate} from 'react-router-dom';
// import {Cookies} from 'react-cookie';



const Login = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleidChange = (event) => {
        setId(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    //API 호출
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(id)
        console.log(password)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                username: id,
                password: password
            }, {
                headers: {
                "Content-Type": "application/json"
                },
                crossDomain: true,
                withCredentials: true
            });
            console.log()
            if (response.status === 200) {
                
                // console.logCookies.get('SESSION');

                const user_Id = response.data.userId
                localStorage.setItem('user_Id', user_Id)

                store.dispatch({type:'AFTER_LOGIN'});
                navigate('/');
            }
        }   
        catch (error) {
            Swal.fire({
                title: 'Login',
                text: '로그인에 실패했습니다.',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    };

    return (
        <div>
            <div className="login_container">
                <div className='login_img'><img src= {require ("../image/logo.png")}></img></div>
                <form onSubmit={handleSubmit}>
                    <div className="login_id_container">
                        <input type="text" value={id} onChange={handleidChange} maxLength={15} placeholder="아이디를 입력하세요."></input>
                    </div>

                    <div className="login_pwd_container">
                        <input type="password" value={password} onChange={handlePasswordChange} maxLength={20} placeholder="비밀번호를 입력하세요."></input> 
                    </div>

                    <div className="login_send_container">
                        <button type="submit">로그인</button>
                    </div>

                    <div className="login_search_container">
                        <div className="login_search_id" onClick={function(){
                            store.dispatch({type:'SEARCH_ID'});
                        }.bind(this)}>아이디 찾기</div>
                        <div className='login_search_line'></div>
                        <div className="login_search_pwd" onClick={function(){
                            store.dispatch({type:'SEARCH_PWD'});
                        }.bind(this)}>비밀번호 찾기</div>
                    </div>

                </form>
            </div>
        </div>
    
  );
};

export default Login;