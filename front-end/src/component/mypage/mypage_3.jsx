/*내가 쓴 댓글*/
import React from "react";
import "./mypage.css";
import { Link } from "react-router-dom";

const Mypage_3 = () => {
  return (
    <div className="mypage_container">
      <div className="mypage_top">내가 쓴 댓글만 모았어요 !</div>
      <div className="mypage_3_container">
        <div className="mypage_3_content">
          <div className="mypage_3_content_main">
            <div className="mypage_3_content_reply">
              내가 알려줄게ㄱㄱㄱㄱㄱㄱ
            </div>
            <div className="mypage_3_content_info">
              <div className="mypage_3_content_date">2023-08-21</div>
              <div className="mypage_3_content_title">제목 질문할게요</div>
            </div>
          </div>
          <div className="mypage_3_content_bookview">
            <div className="mypage_3_content_bookmark">
              {" "}
              <img src={require("../image/star.png")}></img>
              <div>99+</div>
            </div>
            <div className="mypage_3_content_view">
              <img src={require("../image/check.png")}></img>
              <div>99+</div>
            </div>
          </div>
        </div>
        <div className="mypage_3_content"></div>
        <div className="mypage_3_content"></div>
        <div className="mypage_3_content"></div>
        <div className="mypage_3_content"></div>
      </div>
    </div>
  );
};

export default Mypage_3;
