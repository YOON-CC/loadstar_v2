import React, { useEffect, useState } from "react";
import BeforeLogin from "./before_login";
import store from "../../store.js";

const NoLoginHomeHeader = () => {
    const [number, setNumber] = useState(store.getState().number);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setNumber(store.getState().number);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="no_login_header_body">
            <div className="no_login_header_body_1">
                <div className="no_login_header_body_1_logo">
                    <img className="no_login_header_body_1_logo_img" src="/image/logo.png" alt="로고"/>
                </div>
                 <BeforeLogin></BeforeLogin>
            </div>

            {number === 0 && 
                <div className="no_login_header_body_2">
                    <div className="no_login_header_body_2_c2">DRAW AND SHOW YOUR DREAM</div>
                    <div className="no_login_header_body_2_c1">
                        <div className="no_login_header_body_2_c1_img_container">
                            <img src="/image/logo.png"></img>
                        </div>
                    </div>
                    <div className="no_login_header_body_2_c3">당신의 길라잡이 LOADSTAR</div>
                </div>
            }

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
                .no_login_header_body{
                    position: fixed;
                    background: linear-gradient(135deg, #3d26a7, #3f28a7, #3e2e87, #43328d, rgb(57, 36, 147));
                    height: 100vh; /* 화면 높이에 맞게 설정합니다 */
                    width: 100%;
                    z-index: -1;
                }
                .no_login_header_body_1{
                    /* background: linear-gradient(135deg, #13074b, #372978, #372978, #13074b, #13074b); */
                    /* background-color: aqua; */
                    width: 100%;
                    height: 42px;
                    display: flex;  
                    justify-content: space-between;
                }
                .no_login_header_body_1_logo{
                    /* background-color: aquamarine; */
                    height: 100%;
                    width: 55px;
                }
                .no_login_header_body_1_logo img{
                    height: 100%;
                    width: 100%;
                }
                /*바디 2*/
                .no_login_header_body_2{
                    position: absolute;
                    background: rgba(0, 0, 0, 0.262);
                    height: 350px;
                    width: 700px;
                    margin-top: 100px;
                    top: 38%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 20px;
                    box-shadow: 0px 0px 10px rgb(51, 0, 254);
                    animation: shadowMove 5s infinite;
                }

                .no_login_header_body_2_c1{
                    position: relative;
                    height: 250px;
                    width: 100%;
                    /* background-color: #7463c1; */
                }
                .no_login_header_body_2_c1_img_container{
                    /* background-color: aliceblue; */
                    width: 300px;
                    height: 100%;
                    margin-left: 200px;
                }
                .no_login_header_body_2_c1_img_container img{
                    width: 100%;
                    height: 100%;
                    animation: star_shine 3s ease-in-out;
                }
                .no_login_header_body_2_c2{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-size: 35px;
                    font-weight: bold;
                    color: #c5c5c5;
                    animation: slideIn 1.5s ease-in-out;
                    margin-top: 10px;
                }
                .no_login_header_body_2_c3{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    color: #c5c5c5;
                    animation: blinking 3s infinite;
                }
                @keyframes shadowMove {
                    0% {
                        box-shadow:  0px 0px 10px  rgb(16, 0, 119);
                    }
                    25% {
                        box-shadow: 0px 0px 10px  rgb(20, 1, 143);
                    }
                    50% {
                        box-shadow: 0px 0px 10px  rgb(26, 1, 192);
                    }
                    75% {
                        box-shadow: 0px 0px 10px  rgb(21, 1, 147);
                    }
                    100% {
                        box-shadow: 0px 0px 10px  rgb(17, 1, 123);
                    }
                }

                @keyframes star_shine {
                    0% {
                    opacity: 0;
                    }
                    100% {
                    opacity: 1;
                    }
                }

                @keyframes slideIn {
                    0% {
                    transform: translateY(-40%);
                    opacity: 0;
                    }
                    100% {
                    transform: translateY(0);
                    opacity: 1;
                    }
                }
                @keyframes blinking {
                    0% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
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
                .no_login_header_body{
                    position: fixed;
                    background: linear-gradient(135deg, #3d26a7, #3f28a7, #3e2e87, #43328d, rgb(57, 36, 147));
                    height: 100vh; /* 화면 높이에 맞게 설정합니다 */
                    width: 100%;
                    z-index: -1;
                }
                .no_login_header_body_1{
                    /* background: linear-gradient(135deg, #13074b, #372978, #372978, #13074b, #13074b); */
                    /* background-color: aqua; */
                    width: 100%;
                    height: 42px;
                    display: flex;  
                    justify-content: space-between;
                }
                .no_login_header_body_1_logo{
                    /* background-color: aquamarine; */
                    height: 100%;
                    width: 55px;
                }
                .no_login_header_body_1_logo img{
                    height: 100%;
                    width: 100%;
                }
                /*바디 2*/
                .no_login_header_body_2{
                    position: absolute;
                    background: rgba(0, 0, 0, 0.262);
                    height: 200px;
                    width: 270px;
                    margin-top: 100px;
                    top: 35%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 20px;
                    box-shadow: 0px 0px 10px rgb(51, 0, 254);
                    animation: shadowMove 5s infinite;
                }

                .no_login_header_body_2_c1{
                    position: relative;
                    height: 140px;
                    width: 100%;
                    /* background-color: #7463c1; */
                }
                .no_login_header_body_2_c1_img_container{
                    /* background-color: aliceblue; */
                    width: 160px;
                    height: 100%;
                    margin-left: 55px;
                }
                .no_login_header_body_2_c1_img_container img{
                    width: 100%;
                    height: 100%;
                    animation: star_shine 3s ease-in-out;
                }
                .no_login_header_body_2_c2{
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-size: 15px;
                    font-weight: bold;
                    color: #c5c5c5;
                    animation: slideIn 1.5s ease-in-out;
                    margin-top: 10px;
                }
                .no_login_header_body_2_c3{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    color: #c5c5c5;
                    animation: blinking 3s infinite;
                    font-size: 12px;
                }
                @keyframes shadowMove {
                    0% {
                        box-shadow:  0px 0px 10px  rgb(16, 0, 119);
                    }
                    25% {
                        box-shadow: 0px 0px 10px  rgb(20, 1, 143);
                    }
                    50% {
                        box-shadow: 0px 0px 10px  rgb(26, 1, 192);
                    }
                    75% {
                        box-shadow: 0px 0px 10px  rgb(21, 1, 147);
                    }
                    100% {
                        box-shadow: 0px 0px 10px  rgb(17, 1, 123);
                    }
                }

                @keyframes star_shine {
                    0% {
                    opacity: 0;
                    }
                    100% {
                    opacity: 1;
                    }
                }

                @keyframes slideIn {
                    0% {
                    transform: translateY(-50%);
                    opacity: 0;
                    }
                    100% {
                    transform: translateY(0);
                    opacity: 1;
                    }
                }
                @keyframes blinking {
                    0% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            }
            `}
        </style>
        </div>
    );
};

export default NoLoginHomeHeader;