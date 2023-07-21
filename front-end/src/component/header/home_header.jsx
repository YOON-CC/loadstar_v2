import React, { Component } from "react";
import After_login from "./after_login";
import store from "../../store.js";
import { Link } from 'react-router-dom';

export default class Home_header extends Component{
    state = {number:store.getState().number} 
    constructor(props){
      super(props);
      store.subscribe(function(){
        this.setState({number:store.getState().number});
      }.bind(this));
    }

    render() { 
        return (
            <div className="home_header_body">
                <div className="home_header_body_1">
                    <div className="home_header_body_1_logo">
                      <Link to="/"><img className="home_header_body_1_logo_img" src="/image/logo.png"></img></Link>
                    </div>

                    <After_login></After_login>
                </div>

                <div className="home_header_body_2">
                    <div className="home_header_body_2_c1">
                      <div className="home_header_body_2_c1_text">
                        <div className="home_header_body_2_c1_text_1">DRAW AND SHOW</div>
                        <div className="home_header_body_2_c1_text_2">YOUR DREAM</div>
                        <div className="home_header_body_2_c1_text_3"></div>
                        <div className="home_header_body_2_c1_text_4">당신의 길라잡이 LOADSTAR</div>
                      </div>

                      <div className="home_header_body_2_c1_button_container">
                        <Link to="/boardwrite" style={{ textDecoration: 'none' }}> 
                          <div className="home_header_body_2_c1_button_container_b1">
                            <div className="b1_img"><img src="/image/post.png"></img></div>
                            <div className="b1_text">게시글 올리기</div>
                          </div>
                        </Link>
                        
                        <Link to="/drawing" style={{ textDecoration: 'none' }}> 
                          <div className="home_header_body_2_c1_button_container_b2">
                            <div className="b2_img"><img src="/image/drawing.png"></img></div>
                            <div className="b2_text">그래프 그리기</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="home_header_body_2_c2">
                      <img className="home_header_body_2_main_image" src="/image/main_image.png"></img>
                    </div>
                </div>

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
                  .home_header_body{
                      position : fixed;
                      background: linear-gradient(135deg, #3d26a7, #3f28a7, #3e2e87, #43328d, rgb(57, 36, 147));
                      height: 200px;
                      width: 100%;
                      z-index: 2;
                      box-shadow: 0px 0px 5px rgb(0, 0, 0), 0px 0px 5px rgb(72, 72, 72);

                  }

                  .home_header_body_1{
                      position : relative;
                      /* background-color: #2F2853; */
                      height: 30%;
                      display: flex;
                      justify-content: space-between;
                  }

                  /*로고*/
                  .home_header_body_1_logo{
                      /* background-color: #2F2853; */
                      height: 100%;
                      width: 75px;
                      margin-left: 10px;
                  }

                  .home_header_body_1_logo_img{
                      width: 100%;
                      height: 100%;
                  }

                  /*로그인, 회원가입, 로그아웃, 마이페이지, 알림*/
                  .home_header_body_1_form_before{
                      /* background-color: #ff0000; */
                      height: 100%;
                      width: 180px;
                      display: flex;
                      justify-content: space-between;
                      margin-right: 10px;
                      margin-top: 7px;
                  }

                  .home_header_body_1_form_after{
                      /* background-color: #724ffd; */
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

                  .home_header_body_1_c3{
                      /* background-color: #00ffee; */
                      height: 25px;
                      width: 25px;
                  }

                  .home_header_body_1_c3 img{
                      width: 100%;
                      height: 100%;
                      cursor: pointer;
                  }


                  /*홈페이지 설명, 게시글작성, 그래프 그리기 틀*/
                  .home_header_body_2{
                      position : absolute;
                      height: 180px;
                      width: 500px;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      display: flex;
                      justify-content: space-between;
                  }

                  .home_header_body_2_c1{
                      /* background-color: #00ff08; */
                      height: 100%;
                      width: 52%;
                  }

                  /*홈페이지 설명 텍스트*/
                  .home_header_body_2_c1_text{
                      /* background-color: #2F2853; */
                      height: 80%;
                      width: 100%; 
                  }

                  .home_header_body_2_c1_text_1{
                      /* background-color: #88fe00; */
                      width: 100%;
                      height: 20%;

                      color: #ffffff;
                      font-size: 29px;
                      font-weight: bold;
                      padding-top: 20px;
                  }
                  .home_header_body_2_c1_text_2{
                      /* background-color: #88fe00; */
                      width: 100%;
                      height: 20%;

                      color: #ffffff;
                      font-size: 18px;
                      font-weight: bold;
                      padding-top: 8px;
                  }
                  .home_header_body_2_c1_text_3{
                      /* background-color: #88fe00; */
                      width: 100%;
                      height: 1%;
                      background-color: #ffffff;
                  }
                  .home_header_body_2_c1_text_4{
                      color: #e2e2e2;
                      font-size: 13px;
                      font-weight: bold;
                      padding-top: 20px;  
                      animation: blinking 3s infinite;
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

                  /*게시물 올리기, 그리기 버튼 컨테이너*/
                  .home_header_body_2_c1_button_container{
                      /* background-color: #3564d3; */
                      height: 20%;
                      width: 100%;   
                      display: flex;
                      justify-content: space-between;
                  }

                  /*게시물 올리기, 그래프 그리기 버튼*/
                  .home_header_body_2_c1_button_container_b1{
                      background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                      /* background-color: #ffffff; */
                      height: 35px;
                      width: 125px;
                      border-radius: 5px;
                      display: flex;
                      justify-content: space-evenly;
                      cursor: pointer;
                  }
                  .home_header_body_2_c1_button_container_b1:hover{
                      background: linear-gradient(135deg, #b9ac33, #d5ca6c, #d7c73e);
                  }

                  .b1_img{
                      height: 100%;
                      width: 20px;
                  }

                  .b1_img img{
                      width: 20px;
                      height: 20px;
                      margin-top: 7px;
                  }

                  .b1_text{
                      display: flex;
                      align-items: center;
                      justify-content: center;

                      font-size: 15px;
                      font-weight: bold;
                      color: #000000;
                  }

                  .home_header_body_2_c1_button_container_b2{
                      background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                      height: 35px;
                      width: 125px;
                      border-radius: 5px;
                      display: flex;
                      justify-content: center;
                      cursor: pointer;        

                  }
                  .home_header_body_2_c1_button_container_b2:hover{
                      background: linear-gradient(135deg, #b9ac33, #d5ca6c, #d7c73e);
                  }

                  .b2_img{
                      height: 100%;
                      width: 20px;
                  }

                  .b2_img img{
                      width: 20px;
                      height: 20px;
                      margin-top: 7px;
                  }

                  .b2_text{
                      display: flex;
                      align-items: center;
                      justify-content: center;

                      font-size: 15px;
                      font-weight: bold;
                      color: #2F2853;
                  }

                  /*홈페이지 설명 사진*/
                  .home_header_body_2_c2{
                      /* background-color: #FFED48; */
                      margin-top: 10px;
                      height: 100%;
                      width: 46%;
                  }

                  .home_header_body_2_main_image{
                      /* background-color: rgb(66, 5, 218); */
                      margin-top: 15px;
                      height: 85%;
                      width: 100%;
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
                  .home_header_body{
                      position : fixed;
                      background: linear-gradient(135deg, #3d26a7, #3f28a7, #3e2e87, #43328d, rgb(57, 36, 147));
                      height: 120px;
                      width: 100%;
                      z-index: 2;
                      box-shadow: 0px 0px 5px rgb(0, 0, 0), 0px 0px 5px rgb(72, 72, 72);
                  
                  }
                  
                  .home_header_body_1{
                      position : relative;
                      /* background-color: #2F2853; */
                      height: 30%;
                      display: flex;
                      justify-content: space-between;
                  }
                  
                  /*로고*/
                  .home_header_body_1_logo{
                      /* background-color: #2F2853; */
                      height: 100%;
                      width: 45px;
                      margin-left: 5px;
                  }
                  
                  .home_header_body_1_logo_img{
                      width: 100%;
                      height: 100%;
                  }
                  
                  /*로그인, 회원가입, 로그아웃, 마이페이지, 알림*/
                  .home_header_body_1_form_before{
                      /* background-color: #ff0000; */
                      height: 100%;
                      width: 125px;
                      display: flex;
                      justify-content: space-between;
                      margin-right: 5px;
                  }
                  
                  .home_header_body_1_form_after{
                      /* background-color: #724ffd; */
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
                  
                  .home_header_body_1_c3{
                      /* background-color: #00ffee; */
                      height: 17px;
                      width: 17px;
                      margin-top: 9px;
                  }
                  
                  .home_header_body_1_c3 img{
                      width: 100%;
                      height: 100%;
                      cursor: pointer;
                  }
                  
                  
                  /*홈페이지 설명, 게시글작성, 그래프 그리기 틀*/
                  .home_header_body_2{
                      /* background-color: rgb(141, 137, 211); */
                      position : relative;
                      height: 85px;
                      width: 270px;
                      top: 35%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      display: flex;
                  }
                  .home_header_body_2_c1{
                      /* position: absolute; */
                      /* background-color: #fa0400; */
                      height: 70%;
                      width: 170px;
                  }
                  .home_header_body_2_c1_text_1{
                      /* background-color: #2F2853; */
                      font-size: 17px;
                      font-weight: bold;
                      color: #ffffff;
                  }
                  .home_header_body_2_c1_text_2{
                      /* background-color: #2a1a79; */
                      font-size: 13px;
                      font-weight: bold;
                      color: #ffffff;

                  }
                  .home_header_body_2_c1_text_3{
                      width: 95%;
                      height: 1px;
                      background-color: #ffffff;
                      margin-top: 3px;
                  }
                  .home_header_body_2_c1_text_4{
                      display: none;
                  }

                  /*홈페이지 설명 사진*/
                  .home_header_body_2_c2{
                      /* background-color: #e0ddc1; */
                      height: 100%;
                      width: 100px;
                  }

                  .home_header_body_2_main_image{
                      position: absolute;
                      /* background-color: rgb(66, 5, 218); */
                      height: 90px;
                      width: 135px;

                      margin-left: -17px; /*사진끼워맞추기*/
                  }


                  .home_header_body_2_c1_button_container{
                      /* background-color: #e2e2e2; */
                      height: 25px;
                      width: 95%;
                      display: flex;
                      justify-content: space-between;
                      margin-top: 10px;
                  }
                  .home_header_body_2_c1_button_container_b1{
                      background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                      height: 80%;
                      width: 77px;
                      border-radius: 3px;
                      display: flex;
                      justify-content: space-evenly;
                      cursor: pointer;
                      margin-top: 2px;

                  }
                  .home_header_body_2_c1_button_container_b2:hover{
                      background: linear-gradient(135deg, #b9ac33, #d5ca6c, #d7c73e);
                  }
                  .home_header_body_2_c1_button_container_b2{
                      background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                      height: 80%;
                      width: 77px;
                      border-radius: 3px;
                      display: flex;
                      justify-content: space-evenly;
                      cursor: pointer;
                      margin-top: 2px;

                  }
                  .home_header_body_2_c1_button_container_b2:hover{
                      background: linear-gradient(135deg, #b9ac33, #d5ca6c, #d7c73e);
                  }
                  .b1_img{
                      position: relative;
                      height: 10px;
                      width: 10px;
                      /* background-color: #fa0400; */
                      margin-top: 5px;
                  }
                  .b1_img img{
                      position: absolute;
                      width: 100%;
                      height: 100%;
                  }
                  .b1_text{
                      font-size : 1px;
                      margin-top: 3px;
                      font-weight: bold;
                  }
                  .b2_img{
                      position: relative;
                      height: 10px;
                      width: 10px;
                      /* background-color: #fa0400; */
                      margin-top: 5px;
                  }
                  .b2_img img{
                      position: absolute;
                      width: 100%;
                      height: 100%;
                  }
                  .b2_text{
                      font-size : 1px;
                      margin-top: 3px;
                      font-weight: bold;
                  }

              }
                  `}
              </style>
            </div>
        )
    }
}