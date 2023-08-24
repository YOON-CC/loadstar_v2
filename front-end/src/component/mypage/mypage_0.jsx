/*회원정보 수정*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import "./mypage.css";

const Mypage_0 = () => {

  const [nowPassword, setNowPassword] = useState('')
  const [newPassword_1, setNewPassword_1] = useState('')
  const [newPassword_2, setNewPassword_2] = useState('')

  const handlenowpassword = (event) => { //비밀번호
    setNowPassword(event.target.value)
  };

  const handlenewpasswordChange_1 = (event) => { //비밀번호
    setNewPassword_1(event.target.value)
  };
  const handlenewpasswordChange_2 = (event) => { //비밀번호
    setNewPassword_2(event.target.value)
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/password`,{
          currentPassword : nowPassword,
          modifyPassword : newPassword_1,
        },{
            crossDomain: true,
            withCredentials: true
        });
        
        if (response.status === 200) {
            Swal.fire({
                title: '비밀번호 변경완료',
                text: '비밀번호를 변경했습니다!',
                icon: 'success',
                confirmButtonText: '확인',
            });
        }
    }
    catch (error) {

    }
  } 

  return (
    <div className="mypage_container">
      <div className="mypage_0_top">회원정보 수정</div>
      <div className="mypage_0_content">
        <div className="mypage_0_user_password">비밀번호 변경</div>
        <div className="mypage_0_user_password_origin">
          <input type="password" maxLength={15} placeholder="현재 비밀번호" onChange={handlenowpassword}></input>
        </div>
        <div className="mypage_0_user_password_new">
          <input type="password" maxLength={15} placeholder="새 비밀번호" onChange={handlenewpasswordChange_1}></input>
        </div>
        <div className="mypage_0_user_password_new_re">
          <input type="password"maxLength={15} placeholder="새 비밀번호 확인" onChange={handlenewpasswordChange_2}></input>
        </div>

        <div className="send_container_change">
          {nowPassword.length >0 && newPassword_1 === newPassword_2 && newPassword_1.length > 0 && newPassword_2.length > 0 
          ? <form onSubmit={handlePasswordChange}>
              <button type="submit">변경</button> 
            </form>
          : 
            <div>변경</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Mypage_0;
