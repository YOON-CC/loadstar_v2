import React, { useState } from "react";
import store from "../../store";
import axios from 'axios';

const Search_id = () => {

    //아이디표시
    const [showId, setShowId] = useState('당신의 아이디를 찾아드립니다.'); 

    //이메일
    const [newemail, setnewemail] = useState(''); 

    //이메일 컨트롤 함수
    const handlenewemailgChange = (event) => {
        setnewemail(event.target.value)
    };

    //이메일 요청 함수
    const handlejoinSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get("https://lodestar.shop/v1/users/find-id", {
                params: {
                    email: newemail
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200){
                // console.log(response.data);
                setShowId(response.data.message)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                // 400 에러 처리
                setShowId("해당 이메일로 가입한 아이디가 없습니다.")
            } else {
                // 네트워크 오류 등의 예외 처리
                // console.error('API 요청 중 오류 발생:', error);
            }    
        }
    }

    return (
        <div className="search_id-box">
            <h2>아이디 찾기</h2>
            <form onSubmit={handlejoinSubmit}>
                <div className="email-container">
                    <div className="email-box_1">
                        <div className="email-input_text">Email</div>
                        <input type="text" className="email-input" value={newemail} onChange={handlenewemailgChange}></input>
                    </div>
                    <div className="email-box_2">
                        <button type="submit" className="email-box_send">
                            아이디 확인
                        </button>
                    </div>
                </div>
                <div className="this_is_id">{showId}</div>
                <div className="stop_search_id_container">
                    <div className="stop_search_id_container_button"onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>확인/돌아가기</div>
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
                    .search_id-box{
                        position: absolute;
                        top: 38%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 500px;
                        padding: 30px;

                        background: rgba(0, 0, 0, 0.447);
                        box-sizing: border-box;
                        box-shadow: 0px 0px 5px 0px rgb(0, 0, 0);
                        border-radius: 30px;
                        margin-top: 90px;
                    }

                    .search_id-box h2 {
                        margin: 0 0 30px;
                        padding: 0;
                        color: #ffffff;
                        text-align: center;
                    }


                    .email-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 60px;
                        width: 100%;
                        display: flex;
                        justify-content: space-evenly;
                    }

                    .email-box_1{
                        height: 90%;
                        width: 300px;
                        font-size: 16px;
                        color: #ffffff;
                        /* background-color: blue; */
                    }

                    .email-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 13px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .email-input{
                        height: 40%;
                        width: 100%;
                        font-size: 16px;
                        color: #ffffff;
                        border: none;
                        background: transparent;
                        border-bottom: 1px solid #ffffff;
                        margin-top: 15px;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        padding-bottom: 5px;

                    }


                    .email-box_2{
                        /* background-color: blueviolet; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                    }

                    .email-box_send{
                        height: 40px;
                        width: 100px;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .email-box_send:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }

                    .this_is_id{
                        background-color: #0000007b;
                        height: 20px;
                        width: 250px;
                        margin-left: 100px;
                        border-radius: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 12px;
                        font-weight: bold;
                        color: rgb(255, 255, 255);

                        margin-top: 10px;
                    }

                    .stop_search_id_container{
                        margin-top: 20px;
                        /* background-color: blueviolet; */
                        height: 40px;
                        display: flex;
                        justify-content: center;
                    }

                    .stop_search_id_container_button{
                        height: 40px;
                        width: 110px;
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
                        height: 100%;
                    }
                    .stop_search_id_container_button:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
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
                    .search_id-box{
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

                    .search_id-box h2 {
                        font-size: 20px;
                        color: #ffffff;
                        text-align: center;
                    }

                    .email-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 60px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    .email-box_1{
                        height: 90%;
                        width: 170px;
                        font-size: 16px;
                        color: #ffffff;
                        /* background-color: blue; */
                    }

                    .email-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 13px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .email-input{
                        height: 40%;
                        width: 100%;
                        font-size: 12px;
                        color: #ffffff;
                        border: none;
                        background: transparent;
                        border-bottom: 1px solid #ffffff;
                        margin-top: 15px;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        padding-bottom: 5px;

                    }

                    .email-box_2{
                        /* background-color: blueviolet; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                    }

                    .email-box_send{
                        height: 40px;
                        width: 50px;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        border-radius: 7px;
                        border: none;
                        color: #fff;
                        font-size: 10px;
                        font-weight: bold;
                    }
                    .email-box_send:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }

                    .this_is_id{
                        background-color: #0000007b;
                        height: 20px;
                        width: 200px;
                        margin-left: 17px;
                        border-radius: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        font-size: 10px;
                        font-weight: bold;
                        color: rgb(255, 255, 255);

                        margin-top: 10px;
                        /* display: none; */
                    }

                    .stop_search_id_container{
                        margin-top: 20px;
                        /* background-color: blueviolet; */
                        height: 40px;
                        display: flex;
                        justify-content: center;
                    }

                    .stop_search_id_container_button{
                        height: 35px;
                        width: 100px;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 10px;
                        font-weight: bold;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .stop_search_id_container_button:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }
                }
                `}
            </style>
        </div>
    )
}

export default Search_id;