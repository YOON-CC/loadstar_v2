/*북마크*/
import React from "react";
import "./mypage.css";
import { Link } from "react-router-dom";

const Mypage_4 = () => {
  return (
    <div className="mypage_container">
      <div className="mypage_top">내가 북마크한 게시글만 모았어요 !</div>
      <div className="mypage_4_container">
        <div className="mypage_4_content">
          <div className="mypage_4_content_title">깃허브 사용방법</div>
          <div className="mypage_4_content_info">
            <div className="mypage_4_content_info_1">
              <div className="mypage_4_content_username">강서연</div>
              <div className="mypage_4_content_date">2023-08-20</div>
              <div className="mypage_4_content_bookview">
                <div className="mypage_4_content_bookmark">
                  <img src={require("../image/star.png")}></img>
                  <div>99+</div>
                </div>
                <div className="mypage_4_content_view">
                  <img src={require("../image/check.png")}></img>
                  <div>99+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mypage_4_content"></div>
        <div className="mypage_4_content"></div>
      </div>
    </div>
  );
};

export default Mypage_4;
