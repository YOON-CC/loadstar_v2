/*내가 쓴 게시글*/
import React, { useState, useEffect } from "react";
import "./mypage.css";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";

const Mypage_2 = () => {
  return (
    <div className="mypage_container">
      <div className="mypage_top">내가 쓴 게시글만 모았어요 !</div>
      <div className="mypage_2_container">
        <div className="mypage_2_content">
          <div className="mypage_2_content_title">질문할게요요오오오오</div>
          <div className="mypage_2_content_info">
            <div className="mypage_2_content_date">2023-08-21</div>
            <div className="mypage_2_content_bookview">
              <div className="mypage_2_content_bookmark">
                <img src={require("../image/star.png")}></img>
                <div>99+</div>
              </div>
              <div className="mypage_2_content_view">
                <img src={require("../image/check.png")}></img>
                <div>99+</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mypage_2_content"></div>
        <div className="mypage_2_content"></div>
      </div>
    </div>
  );
};

export default Mypage_2;
