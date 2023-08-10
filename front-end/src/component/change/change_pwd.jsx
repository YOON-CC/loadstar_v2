import React, { useState } from "react";
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import "./change_pwd.css";

const Change_pwd = () => {

    const { number, userId } = store.getState();

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
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/find-password`, {
                userId: userId, 
                password: newpassword,
            });

            if (response.status === 200){
                Swal.fire({
                    title: '비밀번호 변경',
                    text: '비밀번호가 변경되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                // console.log('PATCH 요청 성공:', response.data);
                store.dispatch({type:'HOME'});
            }

        } catch (error) {
            // console.error('PATCH 요청 실패:', error);
        }
    };

    return (
        <div className="change_container">
            <div className="change_pwd_container_title">비밀번호 변경</div>
            <form onSubmit={handleChangeSubmit}>
                <div className="change_pwd_container_1">
                    <input type="password" value={newpassword} onChange={handlenewpasswordChange} maxLength={10} placeholder="비밀번호"></input>
                </div>

                <div className="change_pwd_container_2">
                    <input type="password" value={newpassword_again} onChange={handlenewpassword_againgChange} maxLength={10} placeholder="비밀번호 확인"></input>
                </div>

                <div className="change_button_container">
                    <div className="change_button_container_cancel" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>취소</div>

                    {newpassword === newpassword_again && newpassword !== '' && newpassword_again !== ''? 
                    (<button type="submit" className="change_button_container_login_1">변경</button>) : 
                    (<div type="submit" className="change_button_container_login_2">변경</div>)}
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

export default Change_pwd;