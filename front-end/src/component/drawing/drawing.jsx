import React, { useState, useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Link, useNavigate } from "react-router-dom";
import Home_header from "../header/home_header";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import "./drawing.css";
const ChartComponent = ({}) => {
  //네비게이터, 리덕스

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 차트 데이터
  const [chartData, setChartData] = useState([]);

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
              fontSize: "15px", // x축 글자 크기
              fontWeight: "bold",
              fontFamily: "IBM Plex Sans KR",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#272727", // y축 글 색상
              fontSize: "15px", // x축 글자 크기
              fontWeight: "bold",
              fontFamily: "IBM Plex Sans KR",
            },
          },
        },
        colors: ["#262752"],
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      chart.addEventListener("click", (event, chartContext, config) => {
        console.log("막대를 클릭했습니다!", config.dataPointIndex);
        // 클릭한 막대의 인덱스를 가져옴
        const dataIndex = config.dataPointIndex;

        // chartData 배열에서 클릭한 막대를 제외한 새로운 배열을 생성
        const newData = chartData.filter((_, index) => index !== dataIndex);

        // chartData를 업데이트하여 막대가 제거된 차트를 렌더링
        setChartData(newData);
      });

      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@@@@@@@질문 관련 함수@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // 버튼, 기간
  const [yesNoBtn1, setYesNoBtn1] = useState("");

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  //클리어
  const [input1_clear, setInput1_clear] = useState("");
  const [input2_clear, setInput2_clear] = useState("");

  // 추가
  const [question_tag, setQuestion_tag] = useState("알고리즘");
  const handleAddData_addition = () => {
    const input1 = document.querySelector(".input1").value; // 예: '2023-1'
    const input2 = document.querySelector(".input2").value; // 예: '2023-5'

    //양식확인
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(input1)) {
      // 올바른 형식인 경우
      // 처리할 로직 작성
    } else {
      // 올바르지 않은 형식인 경우
      Swal.fire({
        title: "양식을 올바르게 작성해주세요!",
        text: "ex) 2023-08",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(input2)) {
      // 올바른 형식인 경우
      // 처리할 로직 작성
    } else {
      // 올바르지 않은 형식인 경우
      Swal.fire({
        title: "양식을 올바르게 작성해주세요!",
        text: "ex) 2023-08",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    // 입력값에서 연도와 월을 추출
    const [year1, month1] = input1.split("-");
    const [year2, month2] = input2.split("-");

    // 연도와 월을 기반으로 Date 객체 생성 (일은 1일로 설정)
    const date1 = new Date(`${year1}-${month1}-1`);
    const date2 = new Date(`${year2}-${month2}-1`);

    const newData = {
      x: question_tag,
      y: [date1.getTime(), date2.getTime()],
    };

    setChartData((prevData) => [...prevData, newData]);

    setInput1_clear("");
    setInput2_clear("");
    input1Ref.current.focus();
  };

  //이전 돌아가기
  const handlebackQeution = () => {
    setYesNoBtn1("");

    if (question === "저장") {
      setQuestion("Q. 부트캠프 경험이 있습니까?");
      setQuestion_tag("부트캠프");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. 부트캠프 경험이 있습니까?") {
      setQuestion("Q. 개발 프로젝트를 하셨습니까?");
      setQuestion_tag("개발 프로젝트");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. 개발 프로젝트를 하셨습니까?") {
      setQuestion("Q. 개발공부를 하셨습니까?");
      setQuestion_tag("개발공부");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. 개발공부를 하셨습니까?") {
      setQuestion("Q. CS공부를 하셨습니까?");
      setQuestion_tag("CS");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. CS공부를 하셨습니까?") {
      setQuestion("Q. 알고리즘(코딩테스트) 공부를 하셨습니까?");
      setQuestion_tag("알고리즘");
      setInput1_clear("");
      setInput2_clear("");
    }
  };

  //다음 넘기기
  const [question, setQuestion] = useState(
    "Q. 알고리즘(코딩테스트) 공부를 하셨습니까?"
  );

  const handleNextQeution = () => {
    setYesNoBtn1("");

    if (question === "Q. 알고리즘(코딩테스트) 공부를 하셨습니까?") {
      setQuestion("Q. CS공부를 하셨습니까?");
      setQuestion_tag("CS");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. CS공부를 하셨습니까?") {
      setQuestion("Q. 개발공부를 하셨습니까?");
      setQuestion_tag("개발공부");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. 개발공부를 하셨습니까?") {
      setQuestion("Q. 개발 프로젝트를 하셨습니까?");
      setQuestion_tag("개발 프로젝트");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. 개발 프로젝트를 하셨습니까?") {
      setQuestion("Q. 부트캠프 경험이 있습니까?");
      setQuestion_tag("부트캠프");
      setInput1_clear("");
      setInput2_clear("");
    } else if (question === "Q. 부트캠프 경험이 있습니까?") {
      setQuestion("저장");
      setQuestion_tag("");
      setInput1_clear("");
      setInput2_clear("");
    }
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@@@@@@@API 연동@@@@@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const [whether_drawing, setWhether_drawing] = useState(false);

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
        if (response.data.arr.length !== 0) {
          // 이전에 그린 기록이 있다.
          setWhether_drawing(true);
          setChartData(response.data.arr);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    // 페이지가 로드될 때 한 번만 호출되는 로직
    handleDrawingInfo();
  }, []);

  //데이터 보내기
  const handleDrawingInfosend = async (event) => {
    event.preventDefault();

    if (whether_drawing === false) {
      // 이전에 데이터가 없고, 새로 넣을때
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}careers`,
          {
            arr: chartData,
          },
          {
            crossDomain: true,
            withCredentials: true
          }
        );

        if (response.status === 200) {
          navigate("/delete");
        }
      } catch (error) {}
    } else {
      // 이전에 데이터가 없고, 새로 추가할때
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/careers`,
          {
            arr: chartData,
          },
          {
            crossDomain: true,
            withCredentials: true
          }
        );
        if (response.status === 200) {
          navigate("/delete");
        }
      } catch (error) {}
    }
  };

  //로그아웃
  const handleLogout = () => {
    navigate("/");
    dispatch({ type: "HOME" });
  };

  return (
    <div>
      <Home_header></Home_header>
      <div className="response_web_alert">지원하지 않는 화면비율 입니다!</div>
      <div className="chart_body">

        {/*차트관련 상위 컨테이너*/}
        <div className="top_level_container">
          {/* 차트 컨테이너 */}
          <div className="chart_container">
            <div id="chart" />
          </div>

          {/* 질문 */}
          <div className="chart_question">
            <div className="chart_question_container">
              <div className="chart_question_container_c1">{question}</div>
              <div className="chart_question_container_c2">
                <div className="chart_question_container_c2_b1">
                  {question_tag !== "알고리즘" && (
                    <div onClick={handlebackQeution}>〈</div>
                  )}
                </div>

                {/* 질문 */}
                <div className="chart_question_container_c2_select">
                  <div className="chart_question_container_c2_container">
                    {/* yes, no 버튼 */}
                    <div className="chart_question_container_c2_container_yes_no">
                      <div onClick={() => setYesNoBtn1("y")}>
                        {(yesNoBtn1 === "n" ||
                          (yesNoBtn1 === "" && question !== "저장")) && (
                          <div className="chart_question_container_c2_container_b1_default">
                            YES
                          </div>
                        )}
                        {yesNoBtn1 === "y" && question !== "저장" && (
                          <div className="chart_question_container_c2_container_b1">
                            YES
                          </div>
                        )}
                      </div>
                      <div onClick={() => setYesNoBtn1("n")}>
                        {(yesNoBtn1 === "y" ||
                          (yesNoBtn1 === "" && question !== "저장")) && (
                          <div className="chart_question_container_c2_container_b2_default">
                            NO
                          </div>
                        )}
                        {yesNoBtn1 === "n" && question !== "저장" && (
                          <div className="chart_question_container_c2_container_b2">
                            NO
                          </div>
                        )}
                      </div>
                    </div>

                    {question === "저장" && (
                      <form onSubmit={handleDrawingInfosend}>
                        <button className="save">
                          <div className="save_text">save</div>
                        </button>
                      </form>
                    )}

                    {/* 기간 */}
                    {yesNoBtn1 === "y" && (
                      <div className="chart_question_container_c2_container_period">
                        <div className="chart_question_container_c2_container_period_title_1">
                          형식에 맞게 시작일과 종료일을 입력해주세요!
                        </div>
                        <div className="chart_question_container_c2_container_period_input">
                          <input
                            type="text"
                            autoFocus
                            className="input1"
                            value={input1_clear}
                            placeholder="시작일 ex) 2023-01"
                            onChange={(e) => {
                              setInput1_clear(e.target.value);

                              // input1의 길이가 maxLength와 같다면 input2로 포커스를 이동
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                input2Ref.current.focus();
                              }
                            }}
                            maxLength={7}
                            ref={input1Ref}
                          />

                          <input
                            type="text"
                            className="input2"
                            value={input2_clear}
                            placeholder="종료일 ex) 2023-12"
                            onChange={(e) => setInput2_clear(e.target.value)}
                            onKeyDown={(e) => {
                              // Enter 키가 눌렸을 때
                              if (e.key === "Enter") {
                                e.preventDefault(); // 기본 동작 막기

                                handleAddData_addition(); // "적용" 버튼 클릭 처리
                              }
                            }}
                            maxLength={7}
                            ref={input2Ref}
                          />
                          <div
                            className="addition_btn"
                            onClick={handleAddData_addition}>
                            적용
                          </div>
                        </div>
                      </div>
                    )}
                    {yesNoBtn1 === "n" && (
                      <div className="chart_question_container_c2_container_period">
                        <div className="chart_question_container_c2_container_period_title_2">
                          다음으로 넘어가주세요!
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="chart_question_container_c2_b2">
                  {question !== "저장" && yesNoBtn1 !== "" && (
                    <div onClick={handleNextQeution}>〉</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* css스타일 */}
      {/* <style>
          {`

          `}
      </style> */}
    </div>
  );
};

export default ChartComponent;
