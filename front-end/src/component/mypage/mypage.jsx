import React, { useState, useEffect } from "react";
import Home_header from "../header/home_header";
import Mypage_0 from "./mypage_0";
import Mypage_1 from "./mypage_1";
import Mypage_2 from "./mypage_2";
import Mypage_3 from "./mypage_3";
import Mypage_4 from "./mypage_4";
import Mypage_6 from "./mypage_6";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import "./mypage.css";

const Mypage = () => {
  //마이페이지 페이지 상태관리
  const [mypagenum, setMypagenum] = useState(1);
  const handleManualClick = () => {
    window.open(
      "https://www.notion.so/6fe66bc44fa2491cbd8c94675bd17cef?v=c1de34f3715c462e926079e0b9fb7b97&pvs=4"
    );
  };

  return (
    <div>
      <Home_header></Home_header>
      <div className="mypage_background">
        <div className="mypage_container_1">
          <div className="left_container">
            <div className="left_container_1">
              <div className="user_name">강서연 님</div>
              <div className="left_container_1_1">
                <div className="change_data" onClick={() => setMypagenum(0)}>
                  회원정보 변경
                </div>
              </div>
            </div>
            <div className="left_container_2">
              <div className="mypage_list_1">
                <div className="mypage_list_1_title">나의 그래프</div>
                <div
                  className="mypage_list_1_content"
                  onClick={() => setMypagenum(1)}>
                  <div className="mypage_list_1_0">나의 그래프</div>
                  <div className="slick-next slick-arrow"></div>
                </div>
              </div>
              <div className="mypage_list_2">
                <div className="mypage_list_2_title">나의 활동</div>
                <div
                  className="mypage_list_2_content_0"
                  onClick={() => setMypagenum(2)}>
                  <div className="mypage_list_2_0">내가 쓴 게시글</div>
                  <div className="slick-next slick-arrow"></div>
                </div>
                <div
                  className="mypage_list_2_content_1"
                  onClick={() => setMypagenum(3)}>
                  <div className="mypage_list_2_1">내가 쓴 댓글</div>
                  <div className="slick-next slick-arrow"></div>
                </div>
                <div
                  className="mypage_list_2_content_2"
                  onClick={() => setMypagenum(4)}>
                  <div className="mypage_list_2_2">북마크 한 글</div>
                  <div className="slick-next slick-arrow"></div>
                </div>
              </div>
              <div className="mypage_list_3">
                <div
                  className="mypage_list_3_content_0"
                  onClick={handleManualClick}>
                  <div className="mypage_list_3_0">이용방법</div>
                  <ExternalLinkIcon />
                </div>
                <div
                  className="mypage_list_3_content_1"
                  onClick={() => setMypagenum(6)}>
                  <div className="mypage_list_3_1">ABOUT</div>
                  <div className="slick-next slick-arrow"></div>
                </div>
                <div className="mypage_list_3_content_2">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="mypage_list_3_2">나가기</div>
                    <div className="slick-next slick-arrow"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="right_container">
            {mypagenum === 0 && <Mypage_0></Mypage_0>}
            {mypagenum === 1 && <Mypage_1></Mypage_1>}
            {mypagenum === 2 && <Mypage_2></Mypage_2>}
            {mypagenum === 3 && <Mypage_3></Mypage_3>}
            {mypagenum === 4 && <Mypage_4></Mypage_4>}
            {mypagenum === 6 && <Mypage_6></Mypage_6>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
