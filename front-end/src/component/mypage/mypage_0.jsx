/*회원정보 수정*/
import React, { useState, useEffect } from "react";
import "./mypage.css";

const Mypage_0 = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="mypage_container">
      <div className="mypage_0_top">회원정보 수정</div>
      <div className="mypage_0_content">
        <div className="mypage_0_user_password">비밀번호 변경</div>
        <div className="mypage_0_user_password_origin">
          <input type="text" maxLength={10} placeholder="현재 비밀번호"></input>
        </div>
        <div className="mypage_0_user_password_new">
          <input type="text" maxLength={10} placeholder="새 비밀번호"></input>
        </div>
        <div className="mypage_0_user_password_new_re">
          <input
            type="text"
            maxLength={10}
            placeholder="새 비밀번호 확인"></input>
        </div>

        <div className="send_container_change">
          <button type="submit">변경</button>
        </div>
      </div>
    </div>
  );
};

export default Mypage_0;
