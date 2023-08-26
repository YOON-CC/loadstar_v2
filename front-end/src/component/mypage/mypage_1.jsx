/*그래프 보기*/
import React, { useState, useEffect } from "react";
import "./mypage.css";
import { Link } from "react-router-dom";
import ApexCharts from "apexcharts";
import axios from "axios";


const Mypage_1 = () => {

  // 차트 데이터
  const [chartData, setChartData] = useState([]);

  //처음에 데이터 받아오기
  const handleDrawingInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/careers`,
        {
          crossDomain: true,
          withCredentials: true
        }
      );

      if (response.status === 200) {
        //그래프 그렸는지 안그렸는지
        setChartData(response.data.arr);
      }
    } catch (error) {}
  };
  useEffect(() => {
    // 페이지가 로드될 때 한 번만 호출되는 로직
    handleDrawingInfo();
  }, []);


  useEffect(() => {
    if (chartData.length > 0) {
      const options = {
        series: [
          {
            data: chartData,
          },
        ],
        chart: {
          height: 350,
          type: "rangeBar",
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: 20,
            borderRadius: 5,
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: "#272727", // x축 글 색상
              fontSize: "12px", // x축 글자 크기
              fontWeight: "bold",
              fontFamily: "IBM Plex Sans KR",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#272727", // y축 글 색상
              fontSize: "12px", // x축 글자 크기
              fontWeight: "bold",
              fontFamily: "IBM Plex Sans KR",
            },
          },
        },
        colors: ["#262752"],
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);
  

  return (
    <div className="mypage_container">
      <div className="mypage_1_top">나의 그래프</div>
      <div className="mypage_1_modi">
        <Link to="/drawing">
          <div className="mypage_1_modi_content">수정하기</div>
          <div className="slick-next slick-arrow1"></div>
        </Link>
      </div>
      {/* 차트 컨테이너 */}
      <div className="chart_container">
        <div id="chart" />
      </div>
    </div>
  );
};

export default Mypage_1;
