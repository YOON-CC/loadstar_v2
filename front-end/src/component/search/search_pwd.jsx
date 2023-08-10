import React, { useState } from "react";
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './search_pwd.css';

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
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/emails/find-password/send-email`, {
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
                const response = await axios.get("http://13.125.16.222:8080/v1/emails/find-password/check-key", {
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
        <div className="search_pwd_container">
            <div className="search_pwd_container_title">비밀번호 찾기</div>
            <form onSubmit={handlejoinSubmit}>
                <div className="search_pwd_container_email_container">
                    <input type="text" className="email-input" value={newemail} onChange={handlenewemailgChange} placeholder="이메일을 입력하세요."></input>
                    <button type="submit" className="email-box_send" onClick={handlesendemailChange}>보내기</button>
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
                    <Link to="/" style={{ textDecoration: 'none' }}>                        
                        <div className="stop_search_pwd_container_button_1">취소</div>
                    </Link>
                    {newemail !== '' && newcode !== '' && sendemail === 2 && sendcode === 2 ? (
                        <div className="stop_search_pwd_container_button_1" onClick={function(){
                            store.dispatch({type:'CHANGE_PWD', payload: {
                                number: 5,
                                userId: useridx
                            }});
                        }.bind(this)}>비밀번호 변경</div>) : (
                        <div className="stop_search_pwd_container_button_2">비밀번호 변경</div>)
                    }
                </div>

            </form>
        </div>
    )
    
}

export default Search_pwd;