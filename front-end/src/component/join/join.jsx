import React, { useState } from "react";
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import "./join.css"

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
                const response = await axios.get("http://13.125.16.222:8080/v1/users/duplicated-username", {
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
                const response = await axios.post("http://13.125.16.222:8080/v1/emails/check-email", {
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
                const response = await axios.get("http://13.125.16.222:8080/v1/emails/check-key", {
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
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
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
        <div className="join_cointainer">
            <div className="join_cointainer_title">회원가입</div>
            {/* <button onClick={handleJoin}></button> */}
            <form onSubmit={handlejoinSubmit}>
                {/* @@@ */}
                <div className="join_cointainer_id_container">
                    <input type="text" value={newid} onChange={handlenewidChange} maxLength={10} placeholder="아이디 생성"></input>
                    <button type="submit" onClick={handlesendidChange}>중복확인</button>
                </div>
                {can_use_newid === "사용 가능한 아이디 입니다!" && <div className="id_availability_1">{can_use_newid}</div>}
                {can_use_newid === "중복확인이 필요합니다!" && <div className="id_availability_2">{can_use_newid}</div>}
                {can_use_newid === "사용할 수 없는 아이디 입니다!" && <div className="id_availability_3">{can_use_newid}</div>}
                {/* @@@ */}

                <div className="join_cointainer_pwd_container">
                    <input type="password" value={newpassword} onChange={handlenewpasswordChange} className="newpwd-input" maxLength={10} placeholder="비밀번호 생성"></input>
                    <input type="password" value={newpassword_again} onChange={handlenewpassword_againgChange} className="newpwd-input2" maxLength={10} placeholder="비밀번호 확인"></input>
                </div>
                {/* @@@ */}

                <div className="join_cointainer_email_container">
                    <input type="text" value={newemail} onChange={handlenewemailgChange} className="newemail-input" placeholder="이메일을 입력하세요."></input>
                    <button type="submit" className="newemail-box_send" onClick={handlesendemailChange}>보내기</button>             
                </div>  

                {/* @@@ */}
                {sendemail == 2 && (
                    <div className="join_cointainer_code_container">
                        <input type="text" value={newcode} onChange={handlenewcodeChange} className="newmail_receive_code" placeholder="code" maxLength={8}></input>
                        <button type="submit" className="newmail_receive_code_send" onClick={handlesendcodeChange}>
                                확인
                        </button>
                    </div>
                )}

                {/* @@@ */}

                <div className="join_button_container">
                    {newid && newpassword !== '' && newpassword_again !== ''&& newemail !== '' && 
                    newcode !== '' && newpassword === newpassword_again && sendid === 2 && 
                    sendemail === 2 && sendcode === 2 ? (
                        <button className="join_button_container_1" >회원가입</button>
                      ) : (
                        <div className="join_button_container_2">회원가입</div>
                    )}      
                </div>  
            </form>
        </div>
    )
}


export default Join;