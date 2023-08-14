/*내가 쓴 게시글*/
import React from "react";
import "./mypage.css";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";

const Mypage_2 = () => {
  return (
    <div className="mypage_container">
      <div className="mypage_top">내가 쓴 게시글만 모았어요 !</div>
      <div className="board-list_c5"></div>
    </div>
  );
};

export default Mypage_2;
