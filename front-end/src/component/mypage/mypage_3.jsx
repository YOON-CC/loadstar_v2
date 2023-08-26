/*내가 쓴 댓글*/
import React, { useState, useEffect } from "react";
import "./mypage.css";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";


const Mypage_3 = () => {
  const [mypageboardData, setMypageBoardData] = useState([]);

  const handleMypageBoardList = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/my-comments`, {
            crossDomain: true,
            withCredentials: true
          });

          if (response.status === 200) {
            setMypageBoardData(response.data);
          }
      } catch (error) {
          // 에러 처리
      }
  };

  useEffect(() => {
    handleMypageBoardList();
  }, []);

  return (
    <div className="mypage_container">
      <div className="mypage_top">내가 쓴 댓글만 모았어요 !</div>
      <div className="mypage_2_container">
        {mypageboardData.map((item, index) => (
          <Link to={`/board/${item.boardId}`} key={item.boardId} style={{ textDecoration: "none", color : "#000000"}}>          
            <div className="mypage_2_content">
              <div className="mypage_2_content_title">{item.commentContent.length > 10 ? item.commentContent.substring(0, 10) + "..." : item.commentContent}</div>
              <div className="mypage_2_content_info">
                <div className="mypage_2_content_date">작성일 {item.commentCreatedAt.split("T")[0]}</div>
                <div className="mypage_2_content_date">수정일 {item.commentModifiedAt.split("T")[0]}</div>
                <div className="mypage_2_content_bookview">
                  <div className="mypage_2_content_bookmark">
                    <img src={require("../image/star.png")}></img>
                    <div>{item.view}</div>
                  </div>
                  <div className="mypage_2_content_view">
                    <img src={require("../image/check.png")}></img>
                    <div>{item.bookmarkCount}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Mypage_3;
