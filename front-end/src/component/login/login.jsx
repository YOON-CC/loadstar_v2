import React, { useState } from 'react';
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    
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

            try {
                const response = await axios.post("https://lodestar.shop/v1/users/login", {
                    username: id,
                    password: password
                }, {
                    headers: {
                    "Content-Type": "application/json"
                    },
                });
                if (response.status === 200) {
                    const access_token = response.headers['x-access-token']
                    const refresh_token = response.headers['cookie']
                    const user_Id = response.data.userId
    
    
                    Cookies.set('X-REFRESH-TOKEN', refresh_token);
                    localStorage.setItem('access-token', access_token)
                    localStorage.setItem('user_Id', user_Id)

                    store.dispatch({type:'AFTER_LOGIN'});
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
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input type="text" value={id} onChange={handleidChange} maxLength={10}></input>
                        <label>Id</label>
                    </div>

                    <div className="user-box">
                        <input type="password" value={password} onChange={handlePasswordChange} maxLength={10}></input> 
                        <label>Password</label>
                    </div>

                    <div className="user-button_container">
                        <button type="submit" className="user-button_container_login">SUBMIT</button>
                        <div className="user-button_container_cancel" onClick={function(){
                            store.dispatch({type:'HOME'});
                        }.bind(this)}>CANCEL</div>
                    </div>

                    <div className="user-forget_container">
                        <div className="login_search_id" onClick={function(){
                            store.dispatch({type:'SEARCH_ID'});
                        }.bind(this)}>아이디찾기</div>

                        <div className="login_search_pwd" onClick={function(){
                            store.dispatch({type:'SEARCH_PWD'});
                        }.bind(this)}>비밀번호 찾기</div>
                    </div>

                </form>

                {/* css스타일 */}
                <style>
                    {`
                    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                    @media (min-width: 901px) { /*175 이전*/
                        .login-box {
                            position: absolute;
                            top: 38%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 500px;
                            padding: 40px;

                            background: rgba(0, 0, 0, 0.447);
                            box-sizing: border-box;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0);
                            border-radius: 30px;
                            margin-top: 100px;
                        }

                        .login-box h2 {
                            margin: 0 0 30px;
                            padding: 0;
                            color: #ffffff;
                            text-align: center;
                        }

                        .login-box .user-box {
                            position: relative;
                        }

                        .login-box .user-box input {
                            width: 100%;
                            padding: 10px 0;
                            font-size: 16px;
                            color: #ffffff;
                            margin-bottom: 30px;
                            border: none;
                            border-bottom: 1px solid #ffffff;
                            outline: none;
                            background: transparent;
                        }
                        .login-box .user-box label {
                            position: absolute;
                            top:0;
                            left: 0;
                            padding: 10px 0;
                            font-size: 16px;
                            color: #ffffff;
                            pointer-events: none;
                            transition: .5s;
                        }

                        .login-box .user-box input:focus ~ label,
                        .login-box .user-box input:valid ~ label {
                            top: -20px;
                            left: 0;
                            font-size: 12px;
                        }


                        .user-button_container{
                            position: relative;
                            /* background-color: aqua; */
                            height: 45px;
                            display: flex;
                            /* justify-content: space-around; */
                        }
                        .user-button_container_login {
                            position: relative;
                            width: 180px;
                            height: 45px;  

                            background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);

                            border-radius: 10px;
                            border: none;
                            color: #fff;
                            font-size: 13px;
                            font-weight: bold;
                        }
                        .user-button_container_login:hover{
                            background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                            cursor: pointer;
                        }

                        .user-button_container_cancel {
                            position: relative;
                            width: 180px;
                            height: 45px;  

                            background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);

                            border-radius: 10px;
                            border: none;
                            color: #fff;
                            font-size: 13px;
                            font-weight: bold;

                            display: flex;
                            align-items: center;
                            justify-content: center;
                        } 
                        .user-button_container_cancel:hover{
                            background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                            cursor: pointer;
                        }

                        .user-forget_container{
                            position: relative;
                            /* background-color: rgb(10, 90, 90); */
                            height: 20px;
                            display: flex;
                            justify-content: space-around;
                            cursor: pointer;
                        }

                        /*비밀번호 변경 비활성화*/
                        .user-button_container_login_2 {
                            position: relative;
                            width: 180px;
                            height: 45px;  

                            background: rgb(205, 205, 205);
                            border-radius: 10px;
                            border: none;
                            color: #acacac;
                            font-size: 13px;
                            font-weight: bold;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .login_search_id{
                            /* background-color: #c3ff00; */
                            position: relative;
                            width: 180px;
                            height: 20px;  
                            margin-top: 5px;

                            color: #ffffff;
                            font-size: 10px;
                            font-weight: bold;

                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }
                        .login_search_pwd{
                            /* background-color: #c3ff00; */
                            position: relative;
                            width: 180px;
                            height: 20px;  
                            margin-top: 5px;

                            color: #ffffff;
                            font-size: 10px;
                            font-weight: bold;

                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }
                    }
                    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                    @media (max-width: 900px) { /*175 이후*/
                        .login-box {
                            position: absolute;
                            top: 38%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 270px;
                            padding: 20px;

                            background: rgba(0, 0, 0, 0.447);
                            box-sizing: border-box;
                            box-shadow: 0px 0px 5px 0px rgb(0, 0, 0);
                            border-radius: 15px;
                            margin-top: 80px;
                        }  
                        .login-box h2 {
                            font-size: 20px;
                            color: #fff;
                            text-align: center;
                        }
                        .login-box .user-box {
                            position: relative;
                        }

                        .login-box .user-box input {
                            width: 100%;
                            padding: 10px 0;
                            font-size: 12px;
                            color: #fff;
                            margin-bottom: 30px;
                            border: none;
                            border-bottom: 1px solid #fff;
                            outline: none;
                            background: transparent;
                        }
                        .login-box .user-box label {
                            position: absolute;
                            top:0;
                            left: 0;
                            padding: 10px 0;
                            font-size: 10px;
                            color: #fff;
                            pointer-events: none;
                            transition: .5s;
                        }
                        .login-box .user-box input:focus ~ label,
                        .login-box .user-box input:valid ~ label {
                            top: -20px;
                            left: 0;
                            font-size: 12px;
                        }
                        .user-button_container{
                            position: relative;
                            /* background-color: aqua; */
                            height: 45px;
                            display: flex;
                            justify-content: space-around;
                        }
                        .user-button_container_login {
                            position: relative;
                            width: 100px;
                            height: 35px;  

                            background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);
                            border-radius: 10px;
                            border: none;
                            color: #fff;
                            font-size: 12px;
                            font-weight: bold;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .user-button_container_login:hover{
                            background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                            cursor: pointer;
                        }

                        .user-button_container_cancel {
                            position: relative;
                            width: 100px;
                            height: 35px;  

                            background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                            box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);
                            border-radius: 10px;
                            border: none;
                            color: #fff;
                            font-size: 12px;
                            font-weight: bold;

                            display: flex;
                            align-items: center;
                            justify-content: center;
                        } 
                        .user-button_container_cancel:hover{
                            background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                            cursor: pointer;
                        }

                        .user-forget_container{
                            position: relative;
                            /* background-color: rgb(10, 90, 90); */
                            height: 20px;
                            display: flex;
                            justify-content: space-around;
                            cursor: pointer;
                        }

                        /*비밀번호 변경 비활성화*/
                        .user-button_container_login_2 {
                            height: 35px;  
                            width: 100px;
                            background: rgb(205, 205, 205);
                            border-radius: 10px;
                            border: none;
                            color: #acacac; 
                            font-size: 12px;
                            font-weight: bold;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .login_search_id{
                            /* background-color: #c3ff00; */
                            position: relative;
                            width: 180px;
                            height: 20px;  
                            margin-top: 5px;

                            color: #fff;
                            font-size: 10px;
                            font-weight: bold;

                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }
                        .login_search_pwd{
                            /* background-color: #c3ff00; */
                            position: relative;
                            width: 180px;
                            height: 20px;  
                            margin-top: 5px;

                            color: #fff;
                            font-size: 10px;
                            font-weight: bold;

                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        }
                    }                    
                    `}
                </style>
            </div>
        )

}
export default Login;