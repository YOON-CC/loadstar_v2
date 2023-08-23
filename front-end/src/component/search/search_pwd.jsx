import React, { useState } from "react";
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import "./search_pwd.css";
import { Link, useNavigate} from 'react-router-dom';

const Search_pwd = () => {

    const navigate = useNavigate();

    //새 비밀번호
    const [newpassword, setnewPassword] = useState(''); //비밀번호
    const [newpassword_again, setnewPassword_again] = useState(''); //비밀번호확인


    //비밀번호 동작 관리 함수
    const handlenewpasswordChange = (event) => { //비밀번호
        setnewPassword(event.target.value)
    };
    const handlenewpassword_againgChange = (event) => {//비밀번호확인
        setnewPassword_again(event.target.value)
    };

    //API 호출
    const handleChangeSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/emails/find-password`, {
                email: newpassword,
                username: newpassword_again
            }, {
                headers: {
                "Content-Type": "application/json"
                },
            });
            if (response.status === 200) {
                Swal.fire({
                    title: '비밀번호 찾기',
                    text: '메일로 임시 비밀번호가 전송되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                navigate('/');
            }
        }   
        catch (error) {
            Swal.fire({
                title: '비밀번호 찾기',
                text: '해당 아이디 또는 이메일 입력이 잘못되었습니다.',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    };

    console.log(newpassword.length);
    return (
        <div className="change_container">
            <div className="change_pwd_container_title">비밀번호 찾기</div>
            <form onSubmit={handleChangeSubmit}>
                <div className="change_pwd_container_1">
                    <input type="text" value={newpassword} onChange={handlenewpasswordChange} placeholder="아이디를 입력하세요."></input>
                </div>

                <div className="change_pwd_container_2">
                    <input type="text" value={newpassword_again} onChange={handlenewpassword_againgChange} placeholder="이메일을 입력하세요."></input>
                </div>

                <div className="change_button_container">
                    <div className="change_button_container_cancel" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>취소</div>

                    {newpassword.length > 0 && newpassword_again.length > 0? 
                    (<button type="submit" className="change_button_container_login_1">찾기</button>) : 
                    (<div type="submit" className="change_button_container_login_2">찾기</div>)}
                </div>

            </form>

            {/* css스타일 */}
            {/* <style>
                {`

                `}
            </style> */}
        </div>
    )
}

export default Search_pwd;