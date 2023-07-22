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
            const response = await axios.patch('https://lodestar.shop/v1/users/find-password', {
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
        <div className="login-box">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handleChangeSubmit}>
                <div className="user-box">
                    <input type="password" value={newpassword} onChange={handlenewpasswordChange} maxLength={10}></input>
                    <label>Password</label>
                </div>

                <div className="user-box">
                    <input type="password" value={newpassword_again} onChange={handlenewpassword_againgChange} maxLength={10}></input>
                    <label>Password_again</label>
                </div>

                <div className="user-button_container">
                    {newpassword === newpassword_again && newpassword !== '' && newpassword_again !== ''? 
                    (<button type="submit" className="user-button_container_login">변경</button>) : 
                    (<div type="submit" className="user-button_container_login_2">변경</div>)}

                    <div className="user-button_container_cancel" onClick={function(){
                        store.dispatch({type:'HOME'});
                    }.bind(this)}>CANCEL</div>
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