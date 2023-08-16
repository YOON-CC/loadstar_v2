/*그래프 보기*/
import React from "react";
import "./mypage.css";
import { Link } from "react-router-dom";

const Mypage_1 = () => {
  return (
    <div className="mypage_container">
      <div className="mypage_1_top">나의 그래프</div>
      <div className="mypage_1_modi">
        <Link to="/drawing">
          <div className="mypage_1_modi_content">수정하기</div>
          <div className="slick-next slick-arrow"></div>
        </Link>
      </div>
    </div>
  );
};

export default Mypage_1;
