import React, { useState } from "react";
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';

const Search_pwd = () => {

    //이메일, 승인코드
    const [newemail, setnewemail] = useState(''); 
    const [newcode, setnewcode] = useState('');

    //변경 전, 다른 버튼보내는 상태
    const [sendemail, setSendemail] = useState(0); //이메일 보내기 버튼
    const [sendcode, setSendcode] = useState(0); //승인코드 확인 버튼

    //받은 유저 index
    const [useridx, setUseridx] = useState(0); //승인코드 확인 버튼

    //이메일, 승인코드 컨트롤 함수
    const handlenewemailgChange = (event) => {//이메일
        setnewemail(event.target.value)
        setSendemail(0);
        setnewcode('')
    };
    const handlenewcodeChange = (event) => {//승인코드
        setnewcode(event.target.value)
        setSendcode(0);
    };

    //비밀번호 버튼 전, 다른 버튼보내는 상태 관리 함수
    const handlesendemailChange = () => { //이메일
        setSendemail(1);
    };
    const handlesendcodeChange = () => { //승인코드
        setSendcode(1);
    };

    //API 호출
    const handlejoinSubmit = async (event) => {
        event.preventDefault();
        if(sendemail === 1){
            try {
                const response = await axios.post("https://lodestar.shop/emails/find-password/send-email", {
                    email: newemail
                }, {
                    headers: {
                    "Content-Type": "application/json"
                    }
                });
                if (response.status === 200){ 
                    Swal.fire({
                        title: 'Email',
                        text: '이메일을 전송했습니다!',
                        icon: 'success',
                        confirmButtonText: '확인',
                    });
                    setSendemail(2);
                }
            }
            catch (error) {
                Swal.fire({
                    title: 'Email',
                    text: '존재하지 않는 이메일입니다.',
                    icon: 'error',
                    confirmButtonText: '확인',
                });
            }
        }
        if(sendcode === 1){
            try {
                const response = await axios.get("https://lodestar.shop/emails/find-password/check-key", {
                    params: {
                        email: newemail,
                        key: newcode,
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Code',
                        text: '코드승인이 완료되었습니다!',
                        icon: 'success',
                        confirmButtonText: '확인',
                    });
                    setSendcode(2);
                    setUseridx(response.data.userId)
                }

            } catch (error) {
                Swal.fire({
                    title: 'Code',
                    text: '승인에 실패했습니다.',
                    icon: 'error',
                    confirmButtonText: '확인',
                });
            }
        }
    };

    return (
        <div className="search_pwd-box">
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handlejoinSubmit}>
                <div className="email-container">
                    <div className="email-box_1">
                        <div className="email-input_text">Email</div>
                        <input type="text" className="email-input" value={newemail} onChange={handlenewemailgChange}></input>
                    </div>
                    <div className="email-box_2">
                        <button type="submit" className="email-box_send" onClick={handlesendemailChange}>
                            보내기
                        </button>
                    </div>
                </div>
                {sendemail == 2 && (
                    <div className="mail_receive_code_container">
                        <input className="mail_receive_code" placeholder="code" value={newcode} onChange={handlenewcodeChange} maxLength={8}></input>
                        <button type="submit" className="mail_receive_code_send" onClick={handlesendcodeChange}>
                                확인
                        </button>
                    </div>
                )}


                <div className="stop_search_pwd_container">
                    {newemail !== '' && newcode !== '' && sendemail === 2 && sendcode === 2 ? (
                        <div className="stop_search_pwd_container_button_1" onClick={function(){
                            store.dispatch({type:'CHANGE_PWD', payload: {
                                number: 5,
                                userId: useridx
                            }});
                        }.bind(this)}>비밀번호 변경</div>) : (
                        <div className="stop_search_pwd_container_button_2">비밀번호 변경</div>)}
                        
                    <div className="stop_search_pwd_container_button_1" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>취소</div>
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
                    .search_pwd-box{
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
                        margin-top: 100px;
                    }

                    .search_pwd-box h2 {
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
                        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);
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
                    .mail_receive_code_container{
                        /* background-color: beige; */
                        margin-top: 10px;
                        height: 40px;
                        display: flex;
                    }

                    .mail_receive_code{
                        height: 30px;
                        width: 100px;
                        font-size: 16px;
                        color: #fff;
                        border: none;
                        background-color: rgba(12, 12, 12, 0.542);
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        border-radius: 5px;
                        text-align: center;
                        margin-left: 167px;
                    }

                    .mail_receive_code_send{
                        height: 32px;
                        width: 40px;
                        background-color: rgba(12, 12, 12, 0.542);
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        margin-left: 10px;
                        cursor: pointer;
                    }

                    .stop_search_pwd_container{
                        /* background-color: blueviolet; */
                        height: 40px;
                        display: flex;
                        justify-content: space-evenly;
                    }

                    .stop_search_pwd_container_button_1{
                        height: 40px;
                        width: 120px;
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
                        margin-top: 5px;
                    }
                    .stop_search_pwd_container_button_1:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }

                    .stop_search_pwd_container_button_2{
                        height: 40px;
                        width: 120px;
                        background: rgba(0, 0, 0, 0.227);
                        border-radius: 10px;
                        border: none;
                        color: #5a5a5a;
                        font-size: 12px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        margin-top: 5px;
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
                    .search_pwd-box{
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

                    .search_pwd-box h2 {
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
                        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);
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

                    .mail_receive_code_container{
                        /* background-color: beige; */
                        margin-top: 10px;
                        height: 40px;
                        display: flex;
                    }

                    .mail_receive_code{
                        height: 25px;
                        width: 70px;
                        font-size: 10px;
                        color: #fff;
                        border: none;
                        background-color: rgba(12, 12, 12, 0.542);
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        border-radius: 5px;
                        text-align: center;
                        margin-left: 70px;
                    }

                    .mail_receive_code_send{
                        height: 27px;
                        width: 35px;
                        background-color: rgba(12, 12, 12, 0.542);
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 10px;
                        font-weight: bold;
                        margin-left: 10px;
                        cursor: pointer;
                    }

                    .stop_search_pwd_container{
                        /* background-color: blueviolet; */
                        height: 40px;
                        display: flex;
                        justify-content: space-evenly;
                    }

                    .stop_search_pwd_container_button_1{
                        height: 35px;
                        width: 100px;
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
                    .stop_search_pwd_container_button_1:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }

                    .stop_search_pwd_container_button_2{
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
                }
                `}
            </style>
        </div>
    )
    
}

export default Search_pwd;