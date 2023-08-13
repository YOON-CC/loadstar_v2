/*내가 쓴 게시글*/
import React from "react";
import "./mypage.css";
import { Link } from "react-router-dom";

const Mypage_2 = () => {
  return (
    <div className="mypage_container">
      <div className="mypage_top">내가 쓴 게시글만 모았어요 !</div>
      <div className="board-list_c5">
        <div className="board-list_c5_c1">
          <img src={require("../image/user.png")}></img>
          <div>아이디아이디아이디</div>
        </div>
        <div className="board-list_c5_c2">
          <img src={require("../image/star.png")}></img>
          <div>99+</div>
        </div>
        <div className="board-list_c5_c3">
          <img src={require("../image/check.png")}></img>
          <div>99+</div>
        </div>
      </div>
    </div>
  );
};

export default Mypage_2;
