import React, { useState, useEffect } from "react";
import Home_header from "../header/home_header";
import axios from "axios";
import { Link, useActionData } from "react-router-dom";
import Chart from "react-apexcharts";
import "./home_board_list.css";

const Home_board_list = () => {
  //메인페이지 글 종류 상태
  const [show_1, setShow_1] = useState(true);
  const [show_2, setShow_2] = useState(false);
  const [show_3, setShow_3] = useState(false);
  const [show_4, setShow_4] = useState(false);


  //메인페이지 카테고리
  const [sort, setSort] = useState('')

  const handleShow_1 = () => {
    setShow_1(true);
    setShow_2(false);
    setShow_3(false);
    setShow_4(false);
  };
  const handleShow_3 = () => {
    setShow_1(false);
    setShow_2(false);
    setShow_3(true);
    setShow_4(false);
  };
  const handleShow_4 = () => {
    setShow_1(false);
    setShow_2(false);
    setShow_3(false);
    setShow_4(true);
  };

  //해시테그 보기
  const [show, setShow] = useState(false);

  //해시테그의 적용 또는 초기화
  const [board_type, setBoard_type] = useState(true);

  //해시테그
  const [tag_type_1, setTag_type_1] = useState(0);

  const [tag_user_1, setTag_user_1] = useState(0);
  const [tag_user_2, setTag_user_2] = useState(0);
  const [tag_user_3, setTag_user_3] = useState(0);
  const [tag_user_4, setTag_user_4] = useState(0);
  const [tag_user_5, setTag_user_5] = useState(0);
  const [tag_user_6, setTag_user_6] = useState(0);

  const [tag_p_1, setTag_p_1] = useState(0);
  const [tag_p_2, setTag_p_2] = useState(0);
  const [tag_p_3, setTag_p_3] = useState(0);
  const [tag_p_4, setTag_p_4] = useState(0);
  const [tag_p_5, setTag_p_5] = useState(0);
  const [tag_p_6, setTag_p_6] = useState(0);
  const [tag_p_7, setTag_p_7] = useState(0);
  const [tag_p_8, setTag_p_8] = useState(0);
  const [tag_p_9, setTag_p_9] = useState(0);
  const [tag_p_10, setTag_p_10] = useState(0);

  const [tag_cs_1, setTag_cs_1] = useState(0);
  const [tag_cs_2, setTag_cs_2] = useState(0);
  const [tag_cs_3, setTag_cs_3] = useState(0);
  const [tag_cs_4, setTag_cs_4] = useState(0);
  const [tag_cs_5, setTag_cs_5] = useState(0);
  const [tag_cs_6, setTag_cs_6] = useState(0);
  const [tag_cs_7, setTag_cs_7] = useState(0);

  const [tag_etc_1, setTag_etc_1] = useState(0);
  const [tag_etc_2, setTag_etc_2] = useState(0);

  const allTags = [
    tag_type_1,
    tag_user_1,
    tag_user_2,
    tag_user_3,
    tag_user_4,
    tag_user_5,
    tag_user_6,
    tag_p_1,
    tag_p_2,
    tag_p_3,
    tag_p_4,
    tag_p_5,
    tag_p_6,
    tag_p_7,
    tag_p_8,
    tag_p_9,
    tag_p_10,
    tag_cs_1,
    tag_cs_2,
    tag_cs_3,
    tag_cs_4,
    tag_cs_5,
    tag_cs_6,
    tag_cs_7,
    tag_etc_1,
    tag_etc_2,
  ].filter((tag) => tag !== 0);

  //전체글의 경우
  const tag_all = null;
  if (allTags.length === 0) {
    allTags.push(tag_all);
  } else {
    const index = allTags.indexOf(tag_all);
    if (index !== -1) {
      allTags.splice(index, 1);
    }
  }

  //검색
  const [search, setSearch] = useState('');

  //페이지 받기작업
  const [page, setPage] = useState(0);
  const [divElements, setDivElements] = useState([]);

  //서버에서 받은 데이터
  const [board_data, setBoard_data] = useState([]);

  //헤시태그 고르기 버튼 들어가기

  const hashtag_Show = () => {
    setShow(!show);
  };

  const handleSearchContent = (event) => {
    setSearch(event.target.value)
    console.log(search)
  };

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@--차트 받아옴--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  useEffect(() => {

    //검색으로 불러오기
    const handleSearchContentSend = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards/search`,
          {
            params: {
              keywords: search,
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
            item.title,
            item.hashtags,
            item.arr,
            item.username,
            item.bookmarkCount,
            item.view,
            item.createdAt,
            item.modifiedAt,
            
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
    }

    //해시테그로 불러오기
    const handleBoardInfo = async () => {
      const hashtagsQuery = allTags.join(",");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/boards`,
          {
            params: {
              page: page,
              hashtags: hashtagsQuery,
              sort : sort,
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
            item.title,
            item.hashtags,
            item.arr,
            item.username,
            item.bookmarkCount,
            item.view,
            item.createdAt,
            item.modifiedAt,
            item.content,
          ]);
          console.log(combinedArray)

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

    if (search.length > 0){
      console.log("1")
      handleSearchContentSend();
    }
    else{
      console.log("2")
      console.log(sort)

      handleBoardInfo();
    }
  }, [board_type, page]);

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
      const board_Id = board_data[i][0];
      const title = board_data[i][1];
      const hash_tag = board_data[i][2];
      const chartData = board_data[i][3];
      const username = board_data[i][4];
      const bookmarkCount = board_data[i][5];
      const view = board_data[i][6];
      const createdAt = board_data[i][7];
      const modifiedAt = board_data[i][8];
      const content = board_data[i][9];

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
            <div className="board-list_c2">{title.length >= 15 ? `${title.slice(0, 15)} ...` : title}</div>
            <div className="board-list_c3">
              {content.length >= 30 ? `${content.slice(0, 30)} ...` : content}
            </div>
            {hash_tag && hash_tag.length === 1 && (
              <div className="board-list_c4">
                <div className="board-list_c4_tag">{hash_tag[0]}</div>
              </div>
            )}
            {hash_tag && hash_tag.length === 2 && (
              <div className="board-list_c4_2">
                <div className="board-list_c4_tag">{hash_tag[0]}</div>
                <div className="board-list_c4_tag">{hash_tag[1]}</div>
              </div>
            )}
            {hash_tag && hash_tag.length == 3 && (
              <div className="board-list_c4_3">
                <div className="board-list_c4_tag">{hash_tag[0]}</div>
                <div className="board-list_c4_tag">{hash_tag[1]}</div>
                <div className="board-list_c4_tag">{hash_tag[2]}</div>
              </div>
            )}
            {hash_tag && hash_tag.length > 3 && (
              <div className="board-list_c4_4">
                <div className="board-list_c4_tag">{hash_tag[0]}</div>
                <div className="board-list_c4_tag">{hash_tag[1]}</div>
                <div className="board-list_c4_tag">{hash_tag[2]}</div>
                <div className="board-list_c4_tag_end">+</div>
              </div>
            )}
            <div className="board-list_c5">
              <div className="board-list_c5_c1">
                <img src={require("../image/user.png")}></img>
                <div>{username}</div>
              </div>
              <div className="board-list_c5_c2">
                <img src={require("../image/star.png")}></img>
                <div>{bookmarkCount}</div>
              </div>
              <div className="board-list_c5_c3">
                <img src={require("../image/check.png")}></img>
                <div>{view}</div>
              </div>
            </div>
          </div>
        </Link>
      );
    }

    setDivElements(updatedDivElements);
  }, [board_data]);

  return (
    <div>
      <Home_header></Home_header>
      <div className="home_main_container">
        <div className="home_main_container_c1">
          <div className="home_main_container_c1_logo">
            <img src={require("../image/logo.png")}></img>
          </div>
          <div className="home_main_container_c1_contents_1">
            당신의 길라잡이
          </div>
          <div className="home_main_container_c1_contents_2">
            앞으로의 방향을 찾기 위해 선배 동료들의 커리어를 참고하고 소통하며,
            새로운 지도를 그려보세요.
          </div>
          <div className="home_main_container_c1_btn_container">
            <Link to="/boardwrite" style={{ textDecoration: "none" }}>
              <div>게시글 올리기</div>
            </Link>
            <Link to="/drawing" style={{ textDecoration: "none" }}>
              <div>그래프 그리기</div>
            </Link>
          </div>
        </div>
        <div className="home_main_container_c2">
          <img src={require("../image/main_image.png")}></img>
        </div>
      </div>
      <div className="home_board_list_body">
        <div className="home_board_search">
          <div className="home_board_search_c1">
            {show_1 === true && (
              <div
                className="home_board_search_c1_btn_on">
                전체글
              </div>
            )}
            {show_1 === false && (
              <div
                className="home_board_search_c1_btn_off"
                onClick={()=>{
                  setSort('')
                  setShow_1(true)
                  setTag_type_1(0);
                  setShow_3(false);
                  setShow_4(false);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                전체글
              </div>
            )}

            {tag_type_1 === '질문글' && (
              <div
                className="home_board_search_c1_btn_on">
                질문글
              </div>
            )}
            {tag_type_1 === 0 && (
              <div
                className="home_board_search_c1_btn_off"
                onClick={() => {
                  setShow_1(false);
                  setShow_3(false);
                  setShow_4(false);
                  setTag_type_1("질문글");           
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);}}>
                질문글
              </div>
            )}

            {show_3 === true && (
              <div
                className="home_board_search_c1_btn_on">
                조회순
              </div>
            )}
            {show_3 === false && (
              <div
                className="home_board_search_c1_btn_off"
                onClick={()=> {
                  setShow_1(false);
                  setShow_3(true);
                  setShow_4(false);
                  setSort('view,desc')
                  setTag_type_1(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                조회순
              </div>
            )}

            {show_4 === true && (
              <div
                className="home_board_search_c1_btn_on">
                관심순
              </div>
            )}
            {show_4 === false && (
              <div
                className="home_board_search_c1_btn_off"
                onClick={()=> {
                  setShow_1(false);
                  setShow_3(false);
                  setShow_4(true);
                  setSort('bookmarkCount,desc')
                  setTag_type_1(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                관심순
              </div>
            )}
          </div>
          <div className="home_board_search_c2">
            <input onChange={handleSearchContent}></input>
              <button onClick={()=>{
                setBoard_type(!board_type);
                setPage(0);
                setBoard_data([]);
              }}>검색</button>
          </div>
        </div>
        <div className="home_board_hashtag">
          <div className="list_1">
            {tag_user_1 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {
                  setTag_user_1("전공자");
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                전공자
              </div>
            )}
            {tag_user_1 !== 0 && (
              <div 
                className="click_list_tag" 
                onClick={() => {
                  setTag_user_1(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                #전공자
              </div>
            )}

            {tag_user_2 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {
                  setTag_user_2("비전공자");
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                비전공자
              </div>
            )}
            {tag_user_2 !== 0 && (
              <div 
                className="click_list_tag" 
                onClick={() => {
                  setTag_user_2(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                #비전공자
              </div>
            )}

            {tag_user_3 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {
                  setTag_user_3("현직자");
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                현직자
              </div>
            )}
            {tag_user_3 !== 0 && (
              <div 
                className="click_list_tag" 
                onClick={() => {
                  setTag_user_3(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                #현직자
              </div>
            )}


            {tag_user_4 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {
                  setTag_user_4("비현직자");
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                비현직자
              </div>
            )}
            {tag_user_4 !== 0 && (
              <div 
                className="click_list_tag" 
                onClick={() => {
                  setTag_user_4(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                #비현직자
              </div>
            )}

            {tag_user_5 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {
                  setTag_user_5("front");
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                프론트엔드
              </div>
            )}
            {tag_user_5 !== 0 && (
              <div 
                className="click_list_tag" 
                onClick={() => {
                  setTag_user_5(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                #프론트엔드
              </div>
            )}

            {tag_user_6 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {
                  setTag_user_6("back");
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                백엔드
              </div>
            )}
            {tag_user_6 !== 0 && (
              <div 
                className="click_list_tag" 
                onClick={() => {
                  setTag_user_6(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                #백엔드
              </div>
            )}




            {tag_p_1 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {
                  setTag_p_1('html');
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                html
              </div>
            )}
            {tag_p_1 !== 0 && (
              <div 
                className="click_list_tag" 
                onClick={() => {
                  setTag_p_1(0);
                  setBoard_type(!board_type);
                  setPage(0);
                  setBoard_data([]);
                }}>
                #html
              </div>
            )}

            {tag_p_2 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {setTag_p_2("css"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                css
              </div>
            )}
            {tag_p_2 !== 0 && (
              <div className="click_list_tag" onClick={() => {setTag_p_2(0); setBoard_type(!board_type); setPage(0); setBoard_data([]); }}>
                #css
              </div>
            )}

            {tag_p_3 === 0 && (
              <div
                className="none_click_list_tag"
                onClick={() => {setTag_p_3("javascript"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                javascript
              </div>
            )}
            {tag_p_3 !== 0 && (
              <div className="click_list_tag" onClick={() => {setTag_p_3(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                #javascript
              </div>
            )}
          </div>
          {!show && (
            <div className="select_more_hastag" onClick={hashtag_Show}>
              ▼
            </div>
          )}
          {show && (
            <div className="select_more_hastag" onClick={hashtag_Show}>
              ▲
            </div>
          )}
        </div>
        {show && (
          <div>
            <div className="list_2">
              {tag_p_4 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_p_4("typescript"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  typescript
                </div>
              )}
              {tag_p_4 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_p_4(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #typescript
                </div>
              )}

              {tag_p_5 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_p_5("react"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  react
                </div>
              )}
              {tag_p_5 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_p_5(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #react
                </div>
              )}

              {tag_p_6 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_p_6("java"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  java
                </div>
              )}
              {tag_p_6 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_p_6(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #java
                </div>
              )}

              {tag_p_7 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_p_7("python"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  python
                </div>
              )}
              {tag_p_7 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_p_7(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #python
                </div>
              )}

              {tag_p_8 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_p_8("spring"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  spring
                </div>
              )}
              {tag_p_8 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_p_8(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #spring
                </div>
              )}

              {tag_p_9 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_p_9("springboot"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  springboot
                </div>
              )}
              {tag_p_9 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_p_9(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #springboot
                </div>
              )}

              {tag_p_10 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_p_10("node.js"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  node.js
                </div>
              )}
              {tag_p_10 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_p_10(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #node.js
                </div>
              )}

              {tag_cs_1 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_cs_1("운영체제"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  운영체제
                </div>
              )}
              {tag_cs_1 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_cs_1(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #운영체제
                </div>
              )}

              {tag_cs_2 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_cs_2("네트워크"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  네트워크
                </div>
              )}
              {tag_cs_2 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_cs_2(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #네트워크
                </div>
              )}

              {tag_cs_3 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_cs_3("자료구조"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  자료구조
                </div>
              )}
              {tag_cs_3 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_cs_3(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #자료구조
                </div>
              )}
            </div>
            <div className="list_3">
              {tag_cs_4 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_cs_4("컴퓨터구조"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  컴퓨터구조
                </div>
              )}
              {tag_cs_4 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_cs_4(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #컴퓨터구조
                </div>
              )}

              {tag_cs_5 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_cs_5("컴파일러"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  컴파일러
                </div>
              )}
              {tag_cs_5 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_cs_5(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #컴파일러
                </div>
              )}

              {tag_cs_6 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_cs_6("알고리즘"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  알고리즘
                </div>
              )}
              {tag_cs_6 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_cs_6(0); setBoard_type(!board_type); setPage(0); setBoard_data([])}}>
                  #알고리즘
                </div>
              )}

              {tag_cs_7 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_cs_7("데이터베이스"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  데이터베이스
                </div>
              )}
              {tag_cs_7 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_cs_7(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #데이터베이스
                </div>
              )}

              {tag_etc_1 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_etc_1("부트캠프"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  부트캠프
                </div>
              )}
              {tag_etc_1 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_etc_1(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #부트캠프
                </div>
              )}

              {tag_etc_2 === 0 && (
                <div
                  className="none_click_list_tag"
                  onClick={() => {setTag_etc_2("개발외주"); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  개발외주
                </div>
              )}
              {tag_etc_2 !== 0 && (
                <div className="click_list_tag" onClick={() => {setTag_etc_2(0); setBoard_type(!board_type); setPage(0); setBoard_data([]);}}>
                  #개발외주
                </div>
              )}
            </div>
          </div>
        )}

        <div className="board-list-container">{divElements}</div>
      </div>
    </div>
  );
};

export default Home_board_list;
