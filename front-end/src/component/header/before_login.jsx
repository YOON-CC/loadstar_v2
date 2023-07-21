import React, { Component } from "react";
import store from "../../store";
import { Link } from 'react-router-dom';

export default class Before_login extends Component{

    render() { 
        return (
            <div className="home_header_body_1_form_before">
                <div className="home_header_body_1_c1" onClick={function(){
                    store.dispatch({type:"LOGIN"});
                }.bind(this)}>로그인</div>

                <div className="home_header_body_1_c2"onClick={function(){
                    store.dispatch({type:"JOIN"});
                }.bind(this)}>회원가입</div>

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
                    .home_header_body_1_form_before{
                        /* background-color: #ff0000; */
                        height: 100%;
                        width: 180px;
                        display: flex;
                        justify-content: space-between;
                        margin-right: 10px;
                        margin-top: 7px;
                    }
                    .home_header_body_1_c1{
                        height: 20px;
                        width: 80px;
                        border: 3px solid;
                        border-radius: 10px;
                        border-color: #ffffff;
                
                        color: #ffffff;
                        font-weight: bold;
                        font-size: 80%;
                
                        display: flex;
                        justify-content: center;
                        padding-top: 3px;
                        cursor: pointer;
                    }
                    .home_header_body_1_c2{
                        height: 20px;
                        width: 80px;
                        border: 3px solid;
                        border-radius: 10px;
                        border-color: #ffffff;
                
                        color: #ffffff;
                        font-weight: bold;
                        font-size: 80%;
                
                
                        display: flex;
                        justify-content: center;
                        padding-top: 3px;
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
                    .home_header_body_1_form_before{
                        /* background-color: #ff0000; */
                        height: 100%;
                        width: 125px;
                        display: flex;
                        justify-content: space-between;
                        margin-right: 5px;
                    }
                
                    .home_header_body_1_c1{
                        height: 15px;
                        width: 55px;
                        border: 2px solid;
                        border-radius: 7px;
                        border-color: #ffffff;
                    
                        color: #ffffff;
                        font-weight: bold;
                        font-size: 10px;
                    
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        z-index: 1;
                        margin-top: 9px;
                    }
                    .home_header_body_1_c2{
                        height: 15px;
                        width: 55px;
                        border: 2px solid;
                        border-radius: 7px;
                        border-color: #ffffff;
                    
                        color: #ffffff;
                        font-weight: bold;
                        font-size: 10px;
                    
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        z-index: 1;
                        margin-top: 9px;
                    }
                }
                `}
            </style>
            </div>
        )
    }
}