import React, { useState, useEffect } from 'react';
import Home_header from '../header/home_header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';

const Home_board_list = () => {

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
        tag_type_1, tag_user_1, tag_user_2, tag_user_3, tag_user_4, tag_user_5,
        tag_user_6, tag_p_1, tag_p_2, tag_p_3, tag_p_4, tag_p_5, tag_p_6, tag_p_7,
        tag_p_8, tag_p_9, tag_p_10, tag_cs_1, tag_cs_2, tag_cs_3, tag_cs_4, tag_cs_5,
        tag_cs_6, tag_cs_7, tag_etc_1, tag_etc_2
    ].filter(tag => tag !== 0);

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
    //적용하기
    const handlehashtagboard = () => { 
        setBoard_type(!board_type)
        setShow(!show);
        setPage(0); 
        setBoard_data([])
    };

    //초기화
    const handledefaultboard = () => { 
        setBoard_type(!board_type)
        setShow(!show);
        setPage(0); 
        setBoard_data([])

        setTag_type_1(0);
        setTag_user_1(0);
        setTag_user_2(0);
        setTag_user_3(0);
        setTag_user_4(0);
        setTag_user_5(0);
        setTag_user_6(0);

        setTag_p_1(0);
        setTag_p_2(0);
        setTag_p_3(0);
        setTag_p_4(0);
        setTag_p_5(0);
        setTag_p_6(0);
        setTag_p_7(0);
        setTag_p_8(0);
        setTag_p_9(0);
        setTag_p_10(0);

        setTag_cs_1(0);
        setTag_cs_2(0);
        setTag_cs_3(0);
        setTag_cs_4(0);
        setTag_cs_5(0);
        setTag_cs_6(0);
        setTag_cs_7(0);

        setTag_etc_1(0);
        setTag_etc_2(0);
    };

    //페이지 받기작업
    const [page, setPage] = useState(0);
    const [divElements, setDivElements] = useState([]);

    //서버에서 받은 데이터 
    const [board_data, setBoard_data] = useState([]);

    //헤시태그 고르기 버튼 들어가기

    const hashtag_Show = () => {
        setShow(!show);
    };
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@--차트 받아옴--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    useEffect(() => {
        const handleBoardInfo = async () => {
            const hashtagsQuery = allTags.join(",");
            try {
            const response = await axios.get("https://lodestar.shop/boards", {
                params: {
                    page: page,
                    hashtags:hashtagsQuery
                },
                headers: {
                "Content-Type": "application/json"
                }
            });
        
            if (response.status === 200) {
                //튜플로 합치기 (boardId, 그래프 보여주기, Q&A여부 ,제목, 해시테그)
                const combinedArray = response.data.map(item => [item.boardId, item.careerImage, item.title, item.hashtags, item.arr]);                
                
                setBoard_data(prevTitle => {
                    const existingIds = prevTitle.map(item => item[0]);
                    const newItems = combinedArray.filter(item => !existingIds.includes(item[0]));
                    return [...prevTitle, ...newItems];
                });
            }
            } catch (error) {
            // 에러 처리
            }
        };
        
        handleBoardInfo();

    }, [board_type, page]);
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 100; // 스크롤 위치 임계값

            if (scrollPosition > scrollThreshold) {
            setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    useEffect(() => {
        const updatedDivElements = [];
        for (let i = 0; i < board_data.length; i++) {
            const title = board_data[i][2];
            const hash_tag = board_data[i][3];
            const board_Id = board_data[i][0];
            const chartData = board_data[i][4];

            //빈 데이터의 경우 continue
            if (chartData.length === 0) {continue};
            
            const options = {
                chart: {
                  height: 350,
                  type: 'rangeBar',
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
                    barHeight: 10,
                    borderRadius: 2,
                  },
                },
                xaxis: {
                  type: 'datetime',
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
                colors: ['#ffffff'],
              };
              
              const series = [
                {
                  data: chartData,
                },
              ];
          

            updatedDivElements.push(
                <Link to={`/board/${board_Id}`} key={board_Id} style={{ textDecoration: 'none' }}>
                    <div className="board-list" onClick={() => localStorage.setItem('board_Id', board_Id)}>
                        <div className="board-list_c1">

                            <div className="board-list_c1_img">
                                <Chart className="chanchan" options={options} series={series} type="rangeBar" height = "140" width="250"/>
                            </div>

                            <div className="board-list_c1_tag"></div>
                        </div>
                        <div className="board-list_c2">{title}</div>
                        {hash_tag && hash_tag.length === 1 && (
                        <div className="board-list_c3">
                            <div className="board-list_c3_tag">{hash_tag[0]}</div>
                        </div>
                        )}
                        {hash_tag && hash_tag.length > 1 && (
                        <div className="board-list_c3">
                            <div className="board-list_c3_tag">{hash_tag[0]}</div>
                            <div className="board-list_c3_tag">{hash_tag[1]}</div>
                            <div className="board-list_c3_tag_end">...</div>
                        </div>
                        )}
                    </div>
                </Link>
            );
        }
        
        setDivElements(updatedDivElements);
    },[board_data]);

    return (
        <div>
        <Home_header></Home_header>
        <div className="home_board_list_body">
        <form>
            <div className="home_hashtag_body">
                <div className="home_hashtag_container">
                    <div className="hashtag" onClick={hashtag_Show}>해시태그 고르기 <img src="/image/click_hastag.png"></img></div>
                    
                </div>
            </div>
        </form>
        {show && (
            <div className="home_hashtag_container_view">
                <div className="home_hashtag_container_view_container">
                    <div className="list_0_container">
                        <div className="hashtag_title">게시글 TYPE</div>
                        <div className="list_0">
                            {tag_type_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_type_1("질문글")}>질문글</div>}                            
                            {tag_type_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_type_1(0)}>질문글</div>}
                        </div>
                    </div>
                    <div className="list_1_container">
                        <div className="hashtag_title">기본설정</div>
                        <div className="list_1">
                            {tag_user_1 === 0 && (<div className="none_click_list_tag" onClick={() => {setTag_user_1("전공자"); setTag_user_2(0);}}>전공자</div>)}
                            {tag_user_1 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_1 === "전공자") {setTag_user_1(0);} else {setTag_user_1("전공자"); setTag_user_2(0);}}}>전공자</div>)}

                            {tag_user_2 === 0 && (<div className="none_click_list_tag" onClick={() => {setTag_user_2("비전공자");setTag_user_1(0);}}>비전공자</div>)}
                            {tag_user_2 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_2 === "비전공자") {setTag_user_2(0);} else {setTag_user_2("비전공자");setTag_user_1(0);}}}>비전공자</div>)}

                            {tag_user_3 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_3("현직자");setTag_user_4(0);}}>현직자</div>)}
                            {tag_user_3 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_3 === "현직자") {setTag_user_3(0);} else {setTag_user_3("현직자");setTag_user_4(0);}}}>현직자</div>)}

                            {tag_user_4 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_4("비현직자");setTag_user_3(0);}}>비현직자</div>)}
                            {tag_user_4 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_4 === "비현직자") {setTag_user_4(0);} else {setTag_user_4("비현직자");setTag_user_3(0);}}}>비현직자</div>)}

                            {tag_user_5 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_5("프론트엔드");setTag_user_6(0);}}>프론트엔드</div>)}
                            {tag_user_5 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_5 === "프론트엔드") {setTag_user_5(0);} else {setTag_user_5("프론트엔드");setTag_user_6(0);}}}>프론트엔드</div>)}

                            {tag_user_6 === 0 && (<div className="none_click_list_tag" onClick={() => { setTag_user_6("백엔드");setTag_user_5(0);}}>백엔드</div>)}
                            {tag_user_6 !== 0 && (<div className="click_list_tag" onClick={() => {if (tag_user_6 === "백엔드") {setTag_user_6(0);} else {setTag_user_6("백엔드");setTag_user_5(0);}}}>백엔드</div>)}
                        </div>
                    </div>
                    <div className="list_2_container">
                        <div className="hashtag_title">프로그래밍 언어</div>
                        <div className="list_2">
                            {tag_p_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_1("html")}>html</div>}
                            {tag_p_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_1(0)}>html</div>}

                            {tag_p_2 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_2("css")}>css</div>}
                            {tag_p_2 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_2(0)}>css</div>}

                            {tag_p_3 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_3("javascript")}>javascript</div>}
                            {tag_p_3 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_3(0)}>javascript</div>}

                            {tag_p_4 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_4("typescript")}>typescript</div>}
                            {tag_p_4 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_4(0)}>typescript</div>}

                            {tag_p_5 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_5("react")}>react</div>}
                            {tag_p_5 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_5(0)}>react</div>}

                            {tag_p_6 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_6("java")}>java</div>}
                            {tag_p_6 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_6(0)}>java</div>}
                        </div>
                        <div className="list_2">
                            {tag_p_7 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_7("python")}>python</div>}
                            {tag_p_7 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_7(0)}>python</div>}
                            
                            {tag_p_8 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_8("spring")}>spring</div>}
                            {tag_p_8 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_8(0)}>spring</div>}

                            {tag_p_9 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_9("springboot")}>springboot</div>}
                            {tag_p_9 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_9(0)}>springboot</div>}

                            {tag_p_10 === 0 && <div className="none_click_list_tag" onClick={() => setTag_p_10("node.js")}>node.js</div>}
                            {tag_p_10 !== 0 && <div className="click_list_tag" onClick={() => setTag_p_10(0)}>node.js</div>}
                        </div>
                    </div>
                    <div className="list_3_container">
                        <div className="hashtag_title">CS</div>
                        <div className="list_3">
                            {tag_cs_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_1("운영체제")}>운영체제</div>}
                            {tag_cs_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_1(0)}>운영체제</div>}

                            {tag_cs_2 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_2("네트워크")}>네트워크</div>}
                            {tag_cs_2 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_2(0)}>네트워크</div>}

                            {tag_cs_3 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_3("자료구조")}>자료구조</div>}
                            {tag_cs_3 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_3(0)}>자료구조</div>}

                            {tag_cs_4 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_4("컴퓨터구조")}>컴퓨터구조</div>}
                            {tag_cs_4 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_4(0)}>컴퓨터구조</div>}

                            {tag_cs_5 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_5("컴파일러")}>컴파일러</div>}
                            {tag_cs_5 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_5(0)}>컴파일러</div>}

                            {tag_cs_6 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_6("알고리즘")}>알고리즘</div>}
                            {tag_cs_6 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_6(0)}>알고리즘</div>}

                        </div>
                        <div className="list_3">
                            {tag_cs_7 === 0 && <div className="none_click_list_tag" onClick={() => setTag_cs_7("데이터베이스")}>데이터베이스</div>}
                            {tag_cs_7 !== 0 && <div className="click_list_tag" onClick={() => setTag_cs_7(0)}>데이터베이스</div>}
                        </div>
                    </div>
                    <div className="list_4_container">
                        <div className="hashtag_title">활동</div>
                        <div className="list_4">
                            {tag_etc_1 === 0 && <div className="none_click_list_tag" onClick={() => setTag_etc_1("부트캠프")}>부트캠프</div>}
                            {tag_etc_1 !== 0 && <div className="click_list_tag" onClick={() => setTag_etc_1(0)}>부트캠프</div>}

                            {tag_etc_2 === 0 && <div className="none_click_list_tag" onClick={() => setTag_etc_2("개발외주")}>개발외주</div>}
                            {tag_etc_2 !== 0 && <div className="click_list_tag" onClick={() => setTag_etc_2(0)}>개발외주</div>}
                        </div>
                    </div>
                    <div className="hashtag_btn_container">
                        <div onClick={handlehashtagboard}>적용하기</div>
                        <div onClick={handledefaultboard}>초기화</div>
                        <div onClick={hashtag_Show}>취소</div>
                    </div>
                </div>
            </div>
        )}

        <div className="board-list-container">
            {divElements}
        </div>

        </div>
            {/* css스타일 */}
            <style>
                {`
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (min-width: 901px) { /*175 이전*/
                    .home_board_list_body{
                        position: absolute;
                        /* background-color: blueviolet; */
                        height: 1500px;
                        width: 100%;
                        margin-top: 200px;
                        flex-wrap: wrap;    
                    }

                    /*카테고리*/
                    .home_hashtag_body{
                        position : absolute;
                        /* background-color: #86c242; */
                        height: 40px;
                        width: 100%;
                    }

                    .home_hashtag_container{
                        position : absolute;
                        /* background-color: #88ff00; */
                        height: 100%;
                        width: 500px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: flex;
                        margin-top: 3px;
                        z-index: 1;
                    }

                    .home_hashtag_container_c1{
                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        height: 30px;
                        width: 70px;
                        margin-top: 5px;

                        border-radius: 10px;
                        color: #ffffff;
                        font-weight: bold;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 8px;
                        cursor: pointer;
                        border: none;

                    }
                    .home_hashtag_container_c1:hover{
                        background-color: #2f2659;
                    }
                    .board-list_c1_img{
                        position: relative;
                        width: 100%;
                        /* background-color: aqua; */
                    }
                    .chanchan{
                        position: absolute;
                        margin-left: -12px;
                    }

                    /*카테고리 끝*/

                    /*게시물 리스트 바디*/
                    .board-list-container{
                        position: relative;
                        /* background-color: #305902; */
                        width:540px;

                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 30px;
                        left: 50%;
                        transform: translate(-50%);
                        
                    }

                    .board-list{
                        position: relative;
                        width: 242px;
                        height: 200px;
                        margin-top: 17px;
                        margin-left: 18.5px;
                        font-weight: bold;
                        font-size: 20px;
                        /* color: rgb(255, 255, 255); */
                        background: linear-gradient(135deg, #3d26a7, #3f28a7, #3e2e87, #43328d, rgb(57, 36, 147));

                        border-radius: 10px;
                        border: none;
                        animation: board_blinking 5s infinite;
                        cursor: pointer;
                    }
                    .board-list:hover{
                        filter: brightness(80%);
                    }

                    @keyframes board_blinking {
                        0% {
                            box-shadow: 0 0px 5px 0 rgb(163, 163, 163);
                        }
                        50% {
                            box-shadow: 0 0px 5px 0 rgb(0, 0, 0);
                        }
                        100% {
                            box-shadow: 0 0px 5px 0 rgb(163, 163, 163);
                        }
                    }

                    .board-list_c1{
                        height: 130px;
                        width: 242px;
                        display: flex;
                        justify-content: space-between;
                        border-radius: 10px 10px 0px 0px;
                        
                    }
                    .home_header_body_1_graph_img{
                        height: 100%;
                        width: 242px;
                        /* background-color: #4a3b8b; */
                        border-radius: 10px 10px 0px 0px;
                        border: none; 
                    }

                    .board-list_c2{
                        height: 30px;
                        width: 93%;
                        /* background-color: rgb(0, 30, 255);  */
                        margin-left: 8px;
                        font-size: 14px;
                        font-weight: bold;
                        color: rgb(255, 255, 255);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .board-list_c3{
                        position: absolute;
                        height: 40px;
                        width: 100%;
                        /* background-color: rgb(94, 227, 125); */
                        border-radius: 0px 0px 10px 10px ;
                        display: flex;
                        justify-content: space-evenly;

                    }

                    .board-list_c3_tag{
                        margin-top: 2px;
                        background-color: #0000003b;
                        height: 25px;
                        width: 80px;
                        border-radius: 5px;

                        font-size: 12px;
                        font-weight: bold;
                        color: #ffffff;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .board-list_c3_tag_end{
                        margin-top: 2px;
                        background-color: #0000003b;
                        height: 25px;
                        width: 30px;
                        border-radius: 5px;

                        font-size: 13px;
                        font-weight: bold;
                        color: #ffffff;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    /*헤시테그*/
                    .hashtag{
                        background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                        height: 30px;
                        width: 500px;
                        margin-top: 5px;

                        border-radius: 10px;
                        color: #000000;
                        font-weight: bold;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                    .hashtag:hover{
                        background: linear-gradient(135deg, #b9ac33, #d5ca6c, #d7c73e);
                    }
                    .hashtag img{
                        height: 13px;
                        width: 13px;
                        margin-left: 5px;
                    }
                    .home_hashtag_container_view{
                        position: relative;
                        /* background-color: #FFED48; */
                        height: 460px;
                        width: 500px;
                        top: 275px;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        padding-bottom: 9px;
                    }
                    .home_hashtag_container_view_container{
                        position: absolute;
                        /* background: linear-gradient(135deg, #fff06d, rgb(252, 243, 164), #fff06d); */
                        background: linear-gradient(135deg, #e2e2e2, #ffffff, #e2e2e2);
                        height: 460px;
                        width: 100%;
                        border-radius: 10px;
                        box-shadow: 0 0px 10px 0 rgb(178, 178, 178);
                        margin-top: 6px;
                    }
                    .hashtag_title{
                        /* background-color: #0000000a; */
                        font-size: 10px;
                        font-weight: bold;
                        margin-top: 10px;
                        
                        color: #ffffff;
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 5px;
                    }
                    .none_click_list_tag{
                        background: #b2b2b246;
                        width: 70px;
                        height: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        
                        color: #fff;
                        font-weight: bold;
                        font-size: 10px;

                        margin-left: 8.5px;
                        box-shadow: 0 0 2px 0 rgb(148, 148, 148);
                        cursor: pointer;
                    }
                    .click_list_tag{
                        background: linear-gradient(135deg, #2f2659, #614eb7, #2f2659);
                        width: 70px;
                        height: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        
                        color: #fff;
                        font-weight: bold;
                        font-size: 10px;

                        margin-left: 8.5px;
                        box-shadow: 0 0 2px 0 rgb(148, 148, 148);
                        cursor: pointer;
                    }
                    /*1번줄*/
                    .list_0_container{
                        background: #0000001f;
                        height: 50px;
                        width: 480px;
                        border-radius: 5px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        /* overflow: auto; */
                        padding-bottom: 8px;
                    }
                    .list_0{
                        height: 35px;
                        width: 480px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                        padding-bottom: 8px;
                    }
                    .list_1_container{
                        background: #0000001f;
                        height: 50px;
                        width: 480px;
                        border-radius: 5px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        /* overflow: auto; */
                        padding-bottom: 8px;
                    }
                    .list_1{
                        height: 35px;
                        width: 480px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                        padding-bottom: 8px;
                    }

                    .list_2_container{
                        background: #0000001f;
                        height: 85px;
                        width: 480px;
                        border-radius: 5px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        /* overflow: auto; */
                        padding-bottom: 8px;
                    }
                    .list_2{
                        height: 35px;
                        width: 480px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }


                    .list_3_container{
                        background: #1e1d1d1f;
                        height: 85px;
                        width: 480px;
                        border-radius: 5px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        /* overflow: auto; */
                        padding-bottom: 8px;
                    }
                    .list_3{
                        height: 35px;
                        width: 480px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }
                    .list_4_container{
                        background: #0000001f;
                        height: 50px;
                        width: 480px;
                        border-radius: 5px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        /* overflow: auto; */
                        padding-bottom: 8px;
                    }
                    .list_4{
                        height: 35px;
                        width: 480px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }
                    .hashtag_btn_container{
                        /* background-color: #13074b; */
                        height: 50px;
                        width: 100%;

                        display: flex;
                        justify-content: space-evenly;
                    }
                    .hashtag_btn_container div{
                        background: #78787899;
                        height: 30px;
                        width: 100px;
                        margin-top: 12px;
                        font-size: 13px;
                        font-weight: bold;
                        color: #fff;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        box-shadow: 0 0 2px 0 rgb(193, 185, 134);
                    }
                    .hashtag_btn_container div:hover{
                        background: rgba(71, 71, 71, 0.6);
                        cursor: pointer;
                    }
                }
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (max-width: 900px) { /*175*/
                    .home_board_list_body{
                        position: absolute;
                        /* background-color: blueviolet; */
                        height: 1500px;
                        width: 100%;
                        margin-top: 120px;
                        flex-wrap: wrap;
                        
                    }

                    /*카테고리*/
                    .home_hashtag_body{
                        position : absolute;
                        /* background-color: #86c242; */
                        height: 20px;
                        width: 100%;
                    }

                    .home_hashtag_container{
                        position : absolute;
                        /* background-color: #88ff00; */
                        height: 100%;
                        width: 270px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: flex;
                        margin-top: 6px;
                        z-index: 1;
                    }

                    .home_hashtag_container_c1{
                        background: linear-gradient(135deg, #13074b, #372978, #13074b);
                        height: 20px;
                        width: 45px;
                        border-radius: 5px;
                        color: #ffffff;
                        font-weight: bold;
                        font-size: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 8px;
                        cursor: pointer;
                        border: none;

                    }
                    .home_hashtag_container_c1:hover{
                        background-color: #2f2659;
                    }

                    /*카테고리 끝*/

                    /*게시물 리스트 바디*/
                    .board-list-container{
                        position: relative;
                        /* background-color: #305902; */
                        width:270px;
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 15px;
                        left: 50%;
                        transform: translate(-50%);
                        
                    }

                    .board-list{
                        position: relative;
                        width: 270px;
                        height: 200px;
                        margin-top: 17px;
                        font-weight: bold;
                        font-size: 20px;
                        /* color: rgb(255, 255, 255); */
                        background: linear-gradient(135deg, #3d26a7, #3f28a7, #3e2e87, #43328d, rgb(57, 36, 147));
                        border-radius: 10px;
                        border: none;
                        animation: board_blinking 5s infinite;
                        cursor: pointer;
                    }
                    .board-list:hover{
                        filter: brightness(80%);
                    }

                    @keyframes board_blinking {
                        0% {
                            box-shadow: 0 0px 5px 0 rgb(163, 163, 163);
                        }
                        50% {
                            box-shadow: 0 0px 5px 0 rgb(0, 0, 0);
                        }
                        100% {
                            box-shadow: 0 0px 5px 0 rgb(163, 163, 163);
                        }
                    }

                    .board-list_c1{
                        height: 130px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        border-radius: 10px 10px 0px 0px;
                        
                    }

                    .home_header_body_1_graph_img{
                        height: 100%;
                        width: 270px;
                        /* background-color: #a799e6; */
                        border-radius: 10px 10px 0px 0px;
                        border: none; 
                    }

                    .board-list_c2{
                        height: 30px;
                        width: 100%;
                        /* background-color: rgb(0, 30, 255);  */
                        font-size: 13px;
                        font-weight: bold;
                        color: rgb(255, 255, 255);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .board-list_c3{
                        position: absolute;
                        height: 40px;
                        width: 100%;
                        /* background-color: rgb(94, 227, 125); */
                        border-radius: 0px 0px 10px 10px ;
                        display: flex;
                        justify-content: space-evenly;

                    }

                    .board-list_c3_tag{
                        margin-top: 2px;
                        background: #0000004d;
                        height: 25px;
                        width: 80px;
                        border-radius: 5px;

                        font-size: 60%;
                        font-weight: bold;
                        color: #ffffff;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .board-list_c3_tag_end{
                        margin-top: 2px;
                        background: #0000004d;
                        height: 25px;
                        width: 30px;
                        border-radius: 5px;

                        font-size: 13px;
                        font-weight: bold;
                        color: #ffffff;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    /*헤시테그*/
                    .hashtag{
                        background: linear-gradient(135deg, #FFED48, #fff384, #FFED48);
                        height: 20px;
                        width: 270px;

                        border-radius:5px;
                        color: #000000;
                        font-weight: bold;
                        font-size: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                    .hashtag:hover{
                        background: linear-gradient(135deg, #b9ac33, #d5ca6c, #d7c73e);
                    }
                    .hashtag img{
                        height: 10px;
                        width: 10px;
                        margin-left: 5px;
                    }
                    .home_hashtag_container_view{
                        position: relative;
                        /* background-color: #FFED48; */
                        height: 395px;
                        width: 270px;
                        top: 231px;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        padding-bottom: 5px;
                    }
                    .home_hashtag_container_view_container{
                        position: absolute;
                        background: linear-gradient(135deg, #e2e2e2, #ffffff, #e2e2e2);
                        height: 395px;
                        width: 100%;
                        border-radius: 10px;
                        box-shadow: 0 0px 10px 0 rgb(178, 178, 178);
                    }
                    .hashtag_title{
                        /* background-color: #0000000a; */
                        font-size: 10px;
                        font-weight: bold;
                        
                        color: #ffffff;
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 5px;
                    }
                    .none_click_list_tag{
                        background: #b2b2b246;
                        width: 72px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        
                        color: #fff;
                        font-weight: bold;
                        font-size: 10px;

                        margin-left: 8.5px;
                        box-shadow: 0 0 2px 0 rgb(148, 148, 148);
                        cursor: pointer;
                    }
                    .click_list_tag{
                        background: linear-gradient(135deg, #2f2659, #614eb7, #2f2659);
                        width: 72px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        
                        color: #fff;
                        font-weight: bold;
                        font-size: 10px;

                        margin-left: 8.5px;
                        box-shadow: 0 0 2px 0 rgb(148, 148, 148);
                        cursor: pointer;
                    }
                    .list_0_container{
                        background: #0000001f;
                        height: 60px;
                        width: 250px;
                        border-radius: 3px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        overflow-x: hidden;
                        /* padding-bottom: 8px; */
                        margin-top: 10px;

                    }
                    .list_0_container::-webkit-scrollbar {
                        width: 2px;
                    }
                    .list_0_container::-webkit-scrollbar-thumb {
                        background-color: #757575;
                        border-radius: 10px;
                        border: 1px solid transparent;
                    }
                    .list_0_container::-webkit-scrollbar-track {
                        border-radius: 50px;
                        /* box-shadow: inset 0px 0px 5px rgb(106, 93, 93); */
                    }

                    .list_0{
                        /* background-color: #13074b; */
                        height: 55px;
                        width: 270px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }

                    .list_1_container{
                        background: #0000001f;
                        height: 60px;
                        width: 250px;
                        border-radius: 3px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        overflow-x: hidden;
                        /* padding-bottom: 8px; */
                        margin-top: 10px;

                    }
                    .list_1_container::-webkit-scrollbar {
                        width: 2px;
                    }
                    .list_1_container::-webkit-scrollbar-thumb {
                        background-color: #757575;
                        border-radius: 10px;
                        border: 1px solid transparent;
                    }
                    .list_1_container::-webkit-scrollbar-track {
                        border-radius: 50px;
                        /* box-shadow: inset 0px 0px 5px rgb(106, 93, 93); */
                    }

                    .list_1{
                        /* background-color: #13074b; */
                        height: 55px;
                        width: 270px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }

                    .list_2_container{
                        background: #0000001f;
                        height: 60px;
                        width: 250px;
                        border-radius: 3px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        overflow-x: hidden;
                        /* padding-bottom: 8px; */
                        margin-top: 10px;

                    }
                    .list_2_container::-webkit-scrollbar {
                        width: 2px;
                    }
                    .list_2_container::-webkit-scrollbar-thumb {
                        background-color: #757575;
                        border-radius: 10px;
                        border: 1px solid transparent;
                    }
                    .list_2_container::-webkit-scrollbar-track {
                        border-radius: 50px;
                        /* box-shadow: inset 0px 0px 5px rgb(106, 93, 93); */
                    }

                    .list_2{
                        /* background-color: #13074b; */
                        height: 55px;
                        width: 270px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }


                    .list_3_container{
                        background: #0000001f;
                        height: 60px;
                        width: 250px;
                        border-radius: 3px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        overflow-x: hidden;
                        /* padding-bottom: 8px; */
                        margin-top: 10px;

                    }
                    .list_3_container::-webkit-scrollbar {
                        width: 2px;
                    }
                    .list_3_container::-webkit-scrollbar-thumb {
                        background-color: #757575;
                        border-radius: 10px;
                        border: 1px solid transparent;
                    }
                    .list_3_container::-webkit-scrollbar-track {
                        border-radius: 50px;
                        /* box-shadow: inset 0px 0px 5px rgb(106, 93, 93); */
                    }

                    .list_3{
                        /* background-color: #13074b; */
                        height: 55px;
                        width: 270px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }

                    .list_4_container{
                        background: #0000001f;
                        height: 60px;
                        width: 250px;
                        border-radius: 3px;
                        margin-left: 10px;
                        box-shadow: 0 0 4px 0 rgb(141, 141, 141);
                        overflow-x: hidden;
                        /* padding-bottom: 8px; */
                        margin-top: 10px;

                    }
                    .list_4_container::-webkit-scrollbar {
                        width: 2px;
                    }
                    .list_4_container::-webkit-scrollbar-thumb {
                        background-color: #757575;
                        border-radius: 10px;
                        border: 1px solid transparent;
                    }
                    .list_4_container::-webkit-scrollbar-track {
                        border-radius: 50px;
                        /* box-shadow: inset 0px 0px 5px rgb(106, 93, 93); */
                    }

                    .list_4{
                        /* background-color: #13074b; */
                        height: 55px;
                        width: 270px;
                        border-radius: 5px;
                        flex-wrap: wrap;
                        display: flex;
                        /* overflow: auto; */
                    }

                    .hashtag_btn_container{
                        /* background-color: #13074b; */
                        height: 25px;
                        width: 100%;

                        display: flex;
                        justify-content: space-evenly;
                        margin-top: 13px;
                    }
                    .hashtag_btn_container div{
                        background: #78787899;
                        height: 25px;
                        width: 80px;
                        font-size: 13px;
                        font-weight: bold;
                        color: #fff;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 5px;
                        box-shadow: 0 0 2px 0 rgb(193, 185, 134);
                    }
                    .hashtag_btn_container div:hover{
                        background: rgba(71, 71, 71, 0.6);
                        cursor: pointer;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Home_board_list;