/*내가 쓴 게시글*/
import React, { useState, useEffect } from "react";
import "./mypage.css";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";

const Mypage_2 = () => {
  const [page, setPage] = useState(1);
  const [divElements, setDivElements] = useState([]);

  //서버에서 받은 데이터
  const [board_data, setBoard_data] = useState([]);
  useEffect(() => {
    const handleBoardInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards`,
          {
            params: {
              page: page,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          //튜플로 합치기 (boardId, 그래프 보여주기, Q&A여부 ,제목, 해시테그)
          const combinedArray = response.data.map((item) => [
            item.boardId,
            item.careerImage,
            item.title,
            item.arr,
          ]);

          setBoard_data((prevTitle) => {
            const existingIds = prevTitle.map((item) => item[0]);
            const newItems = combinedArray.filter(
              (item) => !existingIds.includes(item[0])
            );
            return [...prevTitle, ...newItems];
          });
        }
      } catch (error) {
        // 에러 처리
      }
    };

    handleBoardInfo();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold =
        document.documentElement.scrollHeight - window.innerHeight - 100; // 스크롤 위치 임계값

      if (scrollPosition > scrollThreshold) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updatedDivElements = [];
    for (let i = 0; i < board_data.length; i++) {
      const title = board_data[i][2];
      const board_Id = board_data[i][0];
      const chartData = board_data[i][4];

      //빈 데이터의 경우 continue
      if (chartData.length === 0) {
        continue;
      }

      const options = {
        chart: {
          type: "rangeBar",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false, // 햄버거 바 숨기기
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: 15,
            borderRadius: 2,
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            show: false, // x축 레이블 숨기기
          },
          axisBorder: {
            show: false, // 세로 축 선 숨기기
          },
        },
        yaxis: {
          show: false, // y축 숨기기
        },
        colors: ["#262752"],
      };

      const series = [
        {
          data: chartData,
        },
      ];

      updatedDivElements.push(
        <Link
          to={`/board/${board_Id}`}
          key={board_Id}
          style={{ textDecoration: "none" }}>
          <div
            className="board-list"
            onClick={() => localStorage.setItem("board_Id", board_Id)}>
            <div className="board-list_c1">
              <div className="board-list_c1_img">
                <Chart
                  className="chanchan"
                  options={options}
                  series={series}
                  type="rangeBar"
                  height="120"
                  width="295"
                />
              </div>

              <div className="board-list_c1_tag"></div>
            </div>
            <div className="board-list_c2">{title}</div>
            <div className="board-list_c3">
              안녕하세요! 저는 프론트엔드 최강자~~ 입니다. 오늘은 저의
              지금까지의 과정을 보여드리기 위해서 글을 적습니다.
            </div>

            <div className="board-list_c4"></div>

            <div className="board-list_c4_2"></div>

            <div className="board-list_c4_3"></div>

            <div className="board-list_c4_4">
              <div className="board-list_c4_tag_end">+</div>
            </div>
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
        </Link>
      );
    }

    setDivElements(updatedDivElements);
  }, [board_data]);

  return (
    <div className="mypage_container">
      <div className="mypage_top">내가 쓴 게시글만 모았어요 !</div>
      <div className="board-list_c5">{divElements}</div>
    </div>
  );
};

export default Mypage_2;
