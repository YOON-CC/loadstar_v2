import React, { useState } from "react";
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';

const Join = () => {
    //input 변화 상태
    const [newid, setnewId] = useState(''); //아이디
    const [newpassword, setnewPassword] = useState(''); //비밀번호
    const [newpassword_again, setnewPassword_again] = useState(''); //비밀번호확인
    const [newemail, setnewemail] = useState(''); //이메일
    const [newcode, setnewcode] = useState(''); //승인코드

    //아이디 중복환인
    const [can_use_newid, setCan_use_newid] = useState('중복확인이 필요합니다!'); //아이디

    //회원가입 버튼 전, 다른 버튼보내는 상태
    const [sendid, setSendId] = useState(0); //아이디 중복 버튼
    const [sendemail, setSendemail] = useState(0); //이메일 보내기 버튼
    const [sendcode, setSendcode] = useState(0); //승인코드 확인 버튼

    //input 변화 상태 관리 함수
    const handlenewidChange = (event) => { //아이디
        setnewId(event.target.value)
        setSendId(0);
        setCan_use_newid('중복확인이 필요합니다!')
    };

    const handlenewpasswordChange = (event) => { //비밀번호
        setnewPassword(event.target.value)
    };

    const handlenewpassword_againgChange = (event) => {//비밀번호확인
        setnewPassword_again(event.target.value)
    };

    const handlenewemailgChange = (event) => {//이메일
        setnewemail(event.target.value)
        setSendemail(0);
        setnewcode('')
    };

    const handlenewcodeChange = (event) => {//승인코드
        setnewcode(event.target.value)
        setSendcode(0);
    };

    //회원가입 버튼 전, 다른 버튼보내는 상태 관리 함수
    const handlesendidChange = () => { //아이디
        setSendId(1);
    };
    const handlesendemailChange = () => { //이메일
        setSendemail(1);
    };
    const handlesendcodeChange = () => { //승인코드
        setSendcode(1);
    };

    //API 호출
    const handlejoinSubmit = async (event) => {
        event.preventDefault();

        //아이디 중복확인
        if(sendid === 1){
            try {
                const response = await axios.get("https://lodestar.shop/v1/users/duplicated-username", {
                    params: {
                        username: newid
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            
                console.log(response.data);
                if (response.status === 200){ // 아이디 확인이 된 것이다.
                    setSendId(2);
                    setCan_use_newid("사용 가능한 아이디 입니다!")
                }

            }
            catch (error) {
                if (error.response && error.response.status === 409) {
                    // 400 에러 처리
                    setCan_use_newid("사용할 수 없는 아이디 입니다!")
                } else {
                    // 네트워크 오류 등의 예외 처리
                    // console.error('API 요청 중 오류 발생:', error);
                }            
            }
        }
        if(sendemail === 1){
            try {
                const response = await axios.post("https://lodestar.shop/v1/emails/check-email", {
                    email: newemail
                }, {
                    headers: {
                    "Content-Type": "application/json"
                    }
                });

                if (response.status === 200){ // 이메일 승인이 된 것이다.
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

            }
        }
        //코드 중복확인
        if(sendcode === 1){
            try {
                const response = await axios.get("https://lodestar.shop/v1/emails/check-key", {
                  params: {
                    email: newemail,
                    key: newcode,
                  },
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
              
                console.log(response.data);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Code',
                        text: '코드승인이 완료되었습니다!',
                        icon: 'success',
                        confirmButtonText: '확인',
                    });

                    setSendcode(2);
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

        if (newid && newpassword !== '' && newpassword_again !== ''
        && newemail !== '' && newcode !== '' && newpassword === newpassword_again 
        && sendid === 2 && sendemail === 2 && sendcode === 2){

            // console.log(newid, newpassword, newemail)
            try {
                const response = await axios.post("https://lodestar.shop/v1/users/signup", {
                    username: newid,
                    password: newpassword,
                    email: newemail,
                    usernameCheck: true, //boolean, 반환값
                    emailCheck: true, //boolean, 반환값

                }, {
                    headers: {
                    "Content-Type": "application/json"
                    }
                });

                if (response.status === 201){
                    console.log(response.data);
                    store.dispatch({type:'WELCOME', payload: {
                        number: 6,
                    }});
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    // const handleJoin = () => {
    //     store.dispatch({type:'WELCOME', payload: {
    //         number: 6,
    //         userId: 5
    //     }});
    // };

    return (
        <div className="join-box">
            <h2>회원가입</h2>
            {/* <button onClick={handleJoin}></button> */}
            <form onSubmit={handlejoinSubmit}>
                {/* @@@ */}
                <div className="newid-container">
                    <div className="newid-box_1">
                        <div className="newid-input_text">Id</div>
                        <input type="text" value={newid} onChange={handlenewidChange} className="newid-input" maxLength={10}></input>
                    </div>
                    <div className="newid-box_2">
                        <button type="submit" className="newid-box_send" onClick={handlesendidChange}>
                            중복확인
                        </button>
                    </div>
                    {can_use_newid === "사용 가능한 아이디 입니다!" && <div className="newid-box_3">{can_use_newid}</div>}
                    {can_use_newid === "중복확인이 필요합니다!" && <div className="newid-box_4">{can_use_newid}</div>}
                    {can_use_newid === "사용할 수 없는 아이디 입니다!" && <div className="newid-box_5">{can_use_newid}</div>}
                </div>
                {/* @@@ */}

                <div className="newpwd-container">
                    <div className="newpwd-box_1">
                        <div className="newpwd-input_text">Password</div>
                        <input type="password" value={newpassword} onChange={handlenewpasswordChange} className="newpwd-input" maxLength={10}></input>
                    </div>
                    <div className="newpwd-box_2">
                        <div className="newpwd-input_text2">Password_again</div>
                        <input type="password" value={newpassword_again} onChange={handlenewpassword_againgChange} className="newpwd-input2" maxLength={10}></input>
                    </div>
                </div>
                {/* @@@ */}

                <div className="newemail-container">
                    <div className="newemail-box_1">
                        <div className="newemail-input_text">Email</div>
                        <input type="text" value={newemail} onChange={handlenewemailgChange} className="newemail-input"></input>
                    </div>
                    <div className="newemail-box_2">
                        <button type="submit" className="newemail-box_send" onClick={handlesendemailChange}>
                            보내기
                        </button>
                    </div>                
                </div>  

                {/* @@@ */}
                {sendemail == 2 && (
                    <div className="newmail_receive_code_container">
                        <input type="text" value={newcode} onChange={handlenewcodeChange} className="newmail_receive_code" placeholder="code" maxLength={8}></input>
                        <button type="submit" className="newmail_receive_code_send" onClick={handlesendcodeChange}>
                                확인
                        </button>
                    </div>
                )}

                {/* @@@ */}

                <div className="newbtn-container">
                    {newid && newpassword !== '' && newpassword_again !== ''&& newemail !== '' && 
                    newcode !== '' && newpassword === newpassword_again && sendid === 2 && 
                    sendemail === 2 && sendcode === 2 ? (
                        <button className="newbtn-container_1" >JOIN</button>
                      ) : (
                        <div className="newbtn-container_3">JOIN</div>
                      )} 
                    <div className="newbtn-container_2" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>CANCEL</div>          
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
                    .join-box {
                        position: absolute;
                        height: 420px;
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

                    .join-box h2 {
                        margin: 0 0 30px;
                        padding: 0;
                        color: #ffffff;
                        text-align: center;
                    }
                    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                    .newid-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 40px;
                        width: 100%;
                        display: flex;
                    }

                    .newid-box_1{
                        height: 90%;
                        width: 150px;
                        font-size: 16px;
                        color: #ffffff;
                        /* background-color: blue; */
                        margin-left: 12px;
                    }

                    .newid-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 13px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newid-input{
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


                    .newid-box_2{
                        /* background-color: blueviolet; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                    }

                    .newid-box_send{
                        height: 32px;
                        width: 60px;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                    .newid-box_send:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                    }

                    .newid-box_3{
                        width: 210px;
                        /* background-color: aqua; */

                        font-size: 10px;
                        font-weight: bold;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgb(69, 72, 255);
                    }

                    .newid-box_4{
                        width: 210px;
                        /* background-color: aqua; */

                        font-size: 10px;
                        font-weight: bold;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgb(160, 160, 160);
                    }
                    .newid-box_5{
                        width: 210px;
                        /* background-color: aqua; */

                        font-size: 10px;
                        font-weight: bold;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgb(255, 0, 0);
                    }

                    /*비밀번호*/
                    .newpwd-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 40px;
                        width: 100%;
                        display: flex;
                        margin-top: 30px;
                    }

                    .newpwd-box_1{
                        height: 90%;
                        width: 150px;
                        font-size: 16px;
                        color: #ffffff;
                        /* background-color: blue; */
                        margin-left: 12px;
                    }

                    .newpwd-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 13px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newpwd-input{
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

                    .newpwd-box_2{
                        height: 90%;
                        width: 150px;
                        font-size: 16px;
                        color: #ffffff;
                        /* background-color: blue; */
                        margin-left: 50px;
                    }

                    .newpwd-input_text2{
                        height: 10px;
                        width: 100%;
                        font-size: 13px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newpwd-input2{
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

                    /*이메일*/
                    .newemail-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 40px;
                        width: 100%;
                        display: flex;
                        margin-top: 30px;
                        padding-bottom: 10px;
                    }

                    .newemail-box_1{
                        height: 90%;
                        width: 350px;
                        font-size: 16px;
                        color: #ffffff;
                        /* background-color: blue; */
                        margin-left: 12px;
                    }

                    .newemail-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 13px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newemail-input{
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


                    .newemail-box_2{
                        /* background-color: blueviolet; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                    }

                    .newemail-box_send{
                        height: 32px;
                        width: 60px;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                    .newemail-box_send:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                    }

                    /*승인*/

                    .newmail_receive_code_container{
                        /* background-color: beige; */
                        margin-top: 10px;
                        height: 40px;
                        display: flex;
                    }

                    .newmail_receive_code{
                        height: 30px;
                        width: 100px;
                        font-size: 16px;
                        color: #fff;
                        border: none;
                        background-color: rgba(12, 12, 12, 0.542)  ;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        border-radius: 5px;
                        text-align: center;
                        margin-left: 165px;
                    }

                    .newmail_receive_code_send{
                        height: 32px;
                        width: 40px;
                        background-color: rgba(12, 12, 12, 0.542)  ;
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        margin-left: 10px;
                        cursor: pointer;
                    }

                    /*버튼*/
                    .newbtn-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 45px;
                        width: 100%;
                        display: flex;
                        justify-content: space-evenly;
                        margin-top: 10px;
                    }
                    .newbtn-container_1{
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
                    .newbtn-container_1:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }
                    .newbtn-container_2{
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
                    .newbtn-container_2:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }

                    .newbtn-container_3{
                        position: relative;
                        width: 180px;
                        height: 45px;  

                        background: rgba(0, 0, 0, 0.227);
                        border-radius: 10px;
                        border: none;
                        color: #5a5a5a;
                        font-size: 13px;
                        font-weight: bold;

                        display: flex;
                        align-items: center;
                        justify-content: center;
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
                    .join-box {
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

                    .join-box h2 {
                        font-size: 20px;
                        color: #ffffff;
                        text-align: center;
                    }
                    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                    .newid-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 40px;
                        width: 100%;
                        display: flex;
                        
                    }
                    .newid-box_1{
                        height: 15px;
                        width: 95px;
                        font-size: 10px;
                        color: #ffffff;
                    }

                    .newid-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 10px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newid-input{
                        height: 40%;
                        width: 100%;
                        font-size: 10px;
                        color: #ffffff;
                        border: none;
                        background: transparent;
                        border-bottom: 1px solid #ffffff;
                        margin-top: 13px;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        padding-bottom: 5px;
                    }


                    .newid-box_2{
                        /* background-color: blueviolet; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        width: 60px;
                        margin-left: 10px;
                    }

                    .newid-box_send{
                        height: 25px;
                        width: 100%;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.281);
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 10px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .newid-box_send:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                    }

                    .newid-box_3{
                        width: 75px;
                        /* background-color: aqua; */

                        font-size: 10px;
                        font-weight: bold;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgb(69, 72, 255);
                        margin-left: 5px;
                    }

                    .newid-box_4{
                        width: 75px;
                        /* background-color: aqua; */

                        font-size: 10px;
                        font-weight: bold;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgb(100, 100, 100);
                        margin-left: 5px;

                    }
                    .newid-box_5{
                        width: 75px;
                        /* background-color: aqua; */

                        font-size: 10px;
                        font-weight: bold;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: rgb(255, 0, 0);
                        margin-left: 5px;
                    }

                    /*비밀번호*/
                    .newpwd-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 40px;
                        width: 100%;
                        display: flex;
                        margin-top: 20px;
                    }

                    .newpwd-box_1{
                        height: 15px;
                        width: 90px;
                        font-size: 10px;
                        color: #ffffff;
                        /* background-color: #0000ff; */
                    }

                    .newpwd-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 10px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newpwd-input{
                        height: 40%;
                        width: 100%;
                        font-size: 10px;
                        color: #ffffff;
                        border: none;
                        background: transparent;
                        border-bottom: 1px solid #ffffff;
                        margin-top: 13px;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        padding-bottom: 5px;
                    }

                    .newpwd-box_2{
                        height: 15px;
                        width: 90px;
                        font-size: 10px;
                        color: #ffffff;
                        /* background-color: #0000ff; */
                        margin-left: 43px;
                    }

                    .newpwd-input_text2{
                        height: 10px;
                        width: 100%;
                        font-size: 10px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newpwd-input2{
                        height: 40%;
                        width: 100%;
                        font-size: 10px;
                        color: #ffffff;
                        border: none;
                        background: transparent;
                        border-bottom: 1px solid #ffffff;
                        margin-top: 13px;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        padding-bottom: 5px;

                    }

                    /*이메일*/
                    .newemail-container{
                        position: relative;
                        /* background-color: aquamarine; */
                        height: 40px;
                        width: 100%;
                        display: flex;
                        margin-top: 20px;
                    }

                    .newemail-box_1{
                        height: 15px;
                        width: 160px;
                        font-size: 10px;
                        color: #ffffff;
                    }

                    .newemail-input_text{
                        height: 10px;
                        width: 100%;
                        font-size: 10px;
                        /* background-color: rgb(255, 183, 94); */
                    }

                    .newemail-input{
                        height: 40%;
                        width: 100%;
                        font-size: 10px;
                        color: #ffffff;
                        border: none;
                        background: transparent;
                        border-bottom: 1px solid #ffffff;
                        margin-top: 13px;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        padding-bottom: 5px;
                    }


                    .newemail-box_2{
                        /* background-color: blueviolet; */
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        width: 60px;
                        margin-left: 10px;
                    }

                    .newemail-box_send{
                        height: 25px;
                        width: 100%;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 10px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .newemail-box_send:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                    }

                    /*승인*/
                    .newmail_receive_code_container{
                        /* background-color: beige; */
                        margin-top: 10px;
                        height: 40px;
                        display: flex;
                    }

                    .newmail_receive_code{
                        height: 25px;
                        width: 70px;
                        font-size: 10px;
                        color: #fff;
                        border: none;
                        background-color: rgba(12, 12, 12, 0.542)  ;
                        outline: none;
                        /* background-color: rgb(255, 183, 94); */
                        border-radius: 5px;
                        text-align: center;
                        margin-left: 70px;
                    }

                    .newmail_receive_code_send{
                        height: 27px;
                        width: 35px;
                        background-color: rgba(12, 12, 12, 0.542)  ;
                        border-radius: 5px;
                        border: none;
                        color: #fff;
                        font-size: 10px;
                        font-weight: bold;
                        margin-left: 10px;
                        cursor: pointer;
                    }

                    /*버튼*/
                    .newbtn-container{
                        /* background-color: blueviolet; */
                        height: 40px;
                        display: flex;
                        justify-content: space-evenly;
                    }
                    .newbtn-container_1{
                        height: 35px;
                        width: 100px;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .newbtn-container_1:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }
                    .newbtn-container_2{
                        height: 35px;
                        width: 100px;
                        background: linear-gradient(135deg, #4222cf, #4222cf, #4630a8);
                        border-radius: 10px;
                        border: none;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .newbtn-container_2:hover{
                        background: linear-gradient(135deg, #1c1342, #1c1342, #1c1342);
                        cursor: pointer;
                    }

                    .newbtn-container_3{
                        height: 35px;
                        width: 100px;
                        background: rgba(0, 0, 0, 0.227);
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


export default Join;