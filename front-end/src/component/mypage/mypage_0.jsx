/*회원정보 수정*/
import React from "react";
import "./mypage.css";

const Mypage_0 = () => {
  return (
    <div className="mypage_0_container">
      <div className="mypage_0_top">회원정보 수정</div>
      <div className="mypage_0_content">
        <div className="mypage_0_1">
          <div className="mypage_0_user_name"> 강서연 </div>
          <button className="change_user_name"> 실명 수정 </button>
        </div>
        <div className="mypage_0_2">
          <div className="mypage_0_user_email"> yeon020615@naver.com</div>
          <button className="change_user_eamil"> 수정 </button>
        </div>
        <div className="mypage_0_3">
          <div className="mypage_0_user_password"> 비밀번호 </div>
          <button className="change_user_password"> 수정 </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage_0;
