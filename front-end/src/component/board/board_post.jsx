import React, { useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import Home_header from '../header/home_header';
import "./board_post.css";

const Board_post = () => {
    const navigate = useNavigate();

    //토큰 받기
    const access_token = localStorage.getItem('access-token');
    const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
    const prefix = 'X-REFRESH-TOKEN=';
    const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
    const endIndex = extractedValue.indexOf("%");
    const refresh_token = extractedValue.slice(0, endIndex);

    //게시물 종류(참고글 or 질문글)
    const [posttype, setPosttype] = useState(0);
    
    //제목
    const [title, setTitle] = useState(''); 
    const handletitleChange = (event) => { 
        setTitle(event.target.value)
    };

    //내용
    const [content, setContent] = useState(''); 
    const handlecontentChange = (event) => { 
        setContent(event.target.value)
    };

    //해시테그
    const [d1, setD1] = useState(0);
    const [d2, setD2] = useState(0);
    const [d3, setD3] = useState(0);
    const [d4, setD4] = useState(0);
    const [d5, setD5] = useState(0);
    const [d6, setD6] = useState(0);
      
    const [h1, setH1] = useState(0);
    const [h2, setH2] = useState(0);
    const [h3, setH3] = useState(0);
    const [h4, setH4] = useState(0);
    const [h5, setH5] = useState(0);
    const [h6, setH6] = useState(0);
    const [h7, setH7] = useState(0);
    const [h8, setH8] = useState(0);
    const [h9, setH9] = useState(0);
    const [h10, setH10] = useState(0);

    const [cs1, setCs1] = useState(0);
    const [cs2, setCs2] = useState(0);
    const [cs3, setCs3] = useState(0);
    const [cs4, setCs4] = useState(0);
    const [cs5, setCs5] = useState(0);
    const [cs6, setCs6] = useState(0);
    const [cs7, setCs7] = useState(0);

    const [e1, setE1] = useState(0);
    const [e2, setE2] = useState(0);

    const allTags = [
        d1, d2, d3, d4, d5, d6,
        h1, h2, h3, h4, h5, h6, h7, h8, h9, h10,
        cs1, cs2, cs3, cs4, cs5, cs6, cs7,
        e1, e2, posttype
    ].filter(tag => tag !== 0);

    //api 연결
    const handlepostSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/boards`, {
                title : title,
                showGraph : "y",
                hashtags : allTags,
                content : content,
            }, 
            {
                headers: {
                    'X-ACCESS-TOKEN': access_token,
                    'X-REFRESH-TOKEN': refresh_token
                }
            });

            //요청 성공
            if (response.status === 200) {
                // store.dispatch({type:"AFTER_LOGIN"});
                Swal.fire({
                    title: 'Post',
                    text: '게시물을 등록했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                navigate('/');
              
            }
        }
        catch (error) {
        }
    }
    
    return (
        <div>
            <Home_header></Home_header>
            <div className="board_post_container">
                <div className="board_post_container_tip">🙌 해시태그가 포함된 게시글은 사용자들과 더 원활한 소통이 가능합니다!</div>
                <form onSubmit={handlepostSubmit}>
                    <div className="board_post_container_title">
                        <input type="text" onChange={handletitleChange} maxLength={20} placeholder="제목을 요약해주세요!"></input>
                    </div>

                    <div className="board_post_container_check">
                        {/* 기본설정 */}
                        {posttype === 0 && <div className ="none_click_tag" onClick={() => setPosttype("질문글")}>질문글</div>}
                        {posttype !== 0 && <div className ="click_tag" onClick={() => setPosttype(0)}>#질문글</div>}

                        {d1 === 0 && <div className="none_click_tag" onClick={() => {setD1("비현직자"); setD2(0)}}>비현직자</div>}
                        {d1 !== 0 && <div className="click_tag" onClick={() => setD1(0)}>#비현직자</div>}

                        {d2 === 0 && <div className="none_click_tag" onClick={() => {setD2("현직자"); setD1(0)}}>현직자</div>}
                        {d2 !== 0 && <div className="click_tag" onClick={() => setD2(0)}>#현직자</div>}

                        {d3 === 0 && <div className="none_click_tag" onClick={() => {setD3("비전공자"); setD4(0);}}>비전공자</div>}
                        {d3 !== 0 && <div className="click_tag" onClick={() => setD3(0)}>#비전공자</div>}

                        {d4 === 0 && <div className="none_click_tag" onClick={() => {setD4("전공자"); setD3(0);}}>전공자</div>}
                        {d4 !== 0 && <div className="click_tag" onClick={() => setD4(0)}>#전공자</div>}

                        {d5 === 0 && <div className="none_click_tag" onClick={() => {setD5("front"); setD6(0);}}>front</div>}
                        {d5 !== 0 && <div className="click_tag" onClick={() => setD5(0)}>#front</div>}

                        {d6 === 0 && <div className="none_click_tag" onClick={() => {setD6("back"); setD5(0);}}>back</div>}
                        {d6 !== 0 && <div className="click_tag" onClick={() => setD6(0)}>#back</div>}

                        {/* 언어 */}
                        {h1 === 0 && <div className="none_click_tag" onClick={() => setH1("html")}>html</div>}
                        {h1 !== 0 && <div className="click_tag" onClick={() => setH1(0)}>#html</div>}

                        {h2 === 0 && <div className="none_click_tag" onClick={() => setH2("css")}>css</div>}
                        {h2 !== 0 && <div className="click_tag" onClick={() => setH2(0)}>#css</div>}

                        {h3 === 0 && <div className="none_click_tag" onClick={() => setH3("javascript")}>javascript</div>}
                        {h3 !== 0 && <div className="click_tag" onClick={() => setH3(0)}>#javascript</div>}

                        {h4 === 0 && <div className="none_click_tag" onClick={() => setH4("typescript")}>typescript</div>}
                        {h4 !== 0 && <div className="click_tag" onClick={() => setH4(0)}>#typescript</div>}

                        {h5 === 0 && <div className="none_click_tag" onClick={() => setH5("react")}>react</div>}
                        {h5 !== 0 && <div className="click_tag" onClick={() => setH5(0)}>#react</div>}

                        {h6 === 0 && <div className="none_click_tag" onClick={() => setH6("java")}>java</div>}
                        {h6 !== 0 && <div className="click_tag" onClick={() => setH6(0)}>#java</div>}

                        {h7 === 0 && <div className="none_click_tag" onClick={() => setH7("python")}>python</div>}
                        {h7 !== 0 && <div className="click_tag" onClick={() => setH7(0)}>#python</div>}

                        {h8 === 0 && <div className="none_click_tag" onClick={() => setH8("spring")}>spring</div>}
                        {h8 !== 0 && <div className="click_tag" onClick={() => setH8(0)}>#spring</div>}

                        {h9 === 0 && <div className="none_click_tag" onClick={() => setH9("springboot")}>springboot</div>}
                        {h9 !== 0 && <div className="click_tag" onClick={() => setH9(0)}>#springboot</div>}

                        {h10 === 0 && <div className="none_click_tag" onClick={() => setH10("node.js")}>node.js</div>}
                        {h10 !== 0 && <div className="click_tag" onClick={() => setH10(0)}>#node.js</div>}
                        {/* CS */}
                        {cs1 === 0 && <div className="none_click_tag" onClick={() => setCs1("운영체제")}>운영체제</div>}
                        {cs1 !== 0 && <div className="click_tag" onClick={() => setCs1(0)}>#운영체제</div>}

                        {cs2 === 0 && <div className="none_click_tag" onClick={() => setCs2("네트워크")}>네트워크</div>}
                        {cs2 !== 0 && <div className="click_tag" onClick={() => setCs2(0)}>#네트워크</div>}
                        
                        {cs3 === 0 && <div className="none_click_tag" onClick={() => setCs3("자료구조")}>자료구조</div>}
                        {cs3 !== 0 && <div className="click_tag" onClick={() => setCs3(0)}>#자료구조</div>}

                        {cs4 === 0 && <div className="none_click_tag" onClick={() => setCs4("컴퓨터구조")}>컴퓨터구조</div>}
                        {cs4 !== 0 && <div className="click_tag" onClick={() => setCs4(0)}>#컴퓨터구조</div>}
                    </div>
                    <div className="board_post_container_check_2">
                        {cs5 === 0 && <div className="none_click_tag" onClick={() => setCs5("알고리즘")}>알고리즘</div>}
                        {cs5 !== 0 && <div className="click_tag" onClick={() => setCs5(0)}>#알고리즘</div>}

                        {cs6 === 0 && <div className="none_click_tag" onClick={() => setCs6("데이터베이스")}>데이터베이스</div>}
                        {cs6 !== 0 && <div className="click_tag" onClick={() => setCs6(0)}>#데이터베이스</div>}

                        {cs7 === 0 && <div className="none_click_tag" onClick={() => setCs7("컴파일러")}>컴파일러</div>}
                        {cs7 !== 0 && <div className="click_tag" onClick={() => setCs7(0)}>#컴파일러</div>}
                        {/* 기타 */}
                        {e1 === 0 && <div className="none_click_tag" onClick={() => setE1("부트캠프")}>부트캠프</div>}
                        {e1 !== 0 && <div className="click_tag" onClick={() => setE1(0)}>#부트캠프</div>}

                        {e2 === 0 && <div className="none_click_tag" onClick={() => setE2("개발외주")}>개발외주</div>}
                        {e2 !== 0 && <div className="click_tag" onClick={() => setE2(0)}>#개발외주</div>}
                    </div>


                    <div className="board_post_container_detail">
                        <textarea type="text" onChange={handlecontentChange} placeholder="내용을 적어주세요!"></textarea>
                    </div>

                    {(title === '' || content ==='') && (
                        <div className="board_post_container_button">
                            <Link to="/" style={{ textDecoration: 'none' }}><div className="board_post_container_button_cancel">취소</div></Link>
                            <div className="board_post_container_button_post">등록</div>
                        </div>   
                    )}

                    {title !== '' && content !=='' && (
                        <div className="board_post_container_button">
                            <Link to="/" style={{ textDecoration: 'none' }}><div className="board_post_container_button_cancel">취소</div></Link>
                            <button className="board_post_container_button_post">등록</button>
                        </div>   
                    )}

                </form>

                {/* css스타일 */}
                {/* <style>
                    {`

                    `}
                </style> */}
            </div>
        </div>
    )
    
}

export default Board_post;