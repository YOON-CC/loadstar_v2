import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import store from "../../store";
import axios from 'axios';
import ApexCharts from 'apexcharts';
import { Link, useNavigate} from 'react-router-dom';
import "./board_object.css";
import Home_header from "../header/home_header";

const Board_object = () => {
    /*네비게이트*/
    const navigate = useNavigate();
    //로컬스토리지 추출
    const user_Id = localStorage.getItem('user_Id');
    const access_token = localStorage.getItem('access-token');
    const board_Id = localStorage.getItem('board_Id');
    
    //쿠키에서 세션 추출 
    // const cookieString  = document.cookie.match('(^|;)\\s*' + 'X-REFRESH-TOKEN' + '\\s*=\\s*([^;]+)').pop();
    // const prefix = 'X-REFRESH-TOKEN=';
    // const extractedValue = cookieString.substring(cookieString.indexOf(prefix) + prefix.length);
    // const endIndex = extractedValue.indexOf("%");
    // const refresh_token = extractedValue.slice(0, endIndex);

    //그래프
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
              type: 'rangeBar',
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
                type: 'datetime',
                labels: {
                    style: {
                        colors: '#262752', // x축 글 색상
                    },
                },
                // axisBorder: {
                //     color: '#262752', // X축 선 색상
                // },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#262752', // y축 글 색상
                    },
                },
            },
            colors: ['#262752'],
          };
    
          const chart = new ApexCharts(
            document.querySelector("#chart"),
            options
          );
          chart.render();
    
          return () => {
            chart.destroy();
          };
        }
    }, [chartData]);

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@초반 api 받아오기@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    //게시글 아이디, 게시글 유저인덱스, 제목, 내용,  그래프이미지, 해시테그, 댓글 목록
    const [boardview_boardId, setBoardview_boardId] = useState('');
    const [boardview_userId, setBoardview_userId] = useState('');
    const [boardview_username, setBoardview_username] = useState('');
    const [boardview_title, setBoardview_title] = useState('');
    const [boardview_content, setBoardview_content] = useState('');
    const [boardview_hashtags, setBoardview_hashtags] = useState([]);
    const [boardview_comment, setBoardview_comment] = useState([]);
    const [boardview_createAt, setBoardview_createAt] = useState('');
    const [boardview_modifiedAt, setBoardview_modifiedAt] = useState('');
    const [boardview, setBoardview] = useState(0);

    //댓글 작성
    const [boardview_comment_content_change, setBoardview_comment_content_change] = useState('');

    //댓글 전송
    const [boardview_commentwrite, setBoardview_commentwrite] = useState(0);
    
    //댓글 삭제
    const [boardview_commentdelete, setBoardview_commentdelete] = useState(0);

    //댓글 수정
    const [editedCommentId, setEditedCommentId] = useState(null);

    //북마크 상태
    const [bookmark, setBookmark] = useState('');
    const [bookmark_state, setBookmark_state] = useState(null); // 북마크 상태변화를 강제로 수행

    //편집 강제 수행
    const [edit_state, setEdit_state] = useState(null); // 북마크 상태변화를 강제로 수행


    const handleBoardView = async () => {

        try {   
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/boards/${board_Id}`, {
                crossDomain: true,
                withCredentials: true
            });
          
            if (response.status === 200) {
                console.log("d")
                setBoardview_boardId(response.data.boardId);
                setBoardview_userId(response.data.userId); // 게시글을 쓴 사용자 유저 인덱스
                setBoardview_username(response.data.username)
                setBoardview_title(response.data.title);
                setBoardview_content(response.data.content);
                setBoardview_hashtags(response.data.hashtags);
                setBoardview_comment(response.data.comments);
                setBoardview_createAt(response.data.createdAt.split("T")[0]);
                setBoardview_modifiedAt(response.data.modifiedAt.split("T")[0]);
                setBoardview(response.data.view);

                setChartData(response.data.arr);

                setBoardview_commentwrite(0);
                setEditedCommentId(null);
                setBoardview_commentdelete(0);
                setEdit_state(0);
                
                setBookmark(response.data.bookmark)
            }
            

        } catch (error) {

        }
    };

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 호출되는 로직
        handleBoardView();
    }, [boardview_commentwrite, bookmark, bookmark_state, boardview_commentdelete, edit_state]);

    const hashtagElements = boardview_hashtags.map((hashtag, index) => (
        <div key={index}>{hashtag}</div>
    ));

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@댓글 수정 및 삭제 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    
    const [editComment, setEditComment] = useState('');

    const handleEditCommentChange = (event) => {
        setEditComment(event.target.value)
    };

    const handleBoardcommentEdit = async (boardview_comment_userId, event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/comments/${boardview_comment_userId}`,{
                content : editComment
            },{
                crossDomain: true,
                withCredentials: true
            });
            
            if (response.status === 200) {
                Swal.fire({
                    title: '댓글수정',
                    text: '댓글을 수정했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                setBoardview_commentdelete(1)
                setEditComment(null)
            }
        }
        catch (error) {

        }
    } 


    const handleBoardcommentdelete = async (boardview_comment_userId, event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${boardview_comment_userId}`,{
                crossDomain: true,
                withCredentials: true
            });
            
            if (response.status === 200) {
                Swal.fire({
                    title: '댓글삭제',
                    text: '댓글을 삭제했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                setBoardview_commentdelete(1)
                
            }
        }
        catch (error) {

        }
    }


    const CommentList = boardview_comment.map(comment => (
        <div key={comment.commentId} className="board_view_review_container_list">
            <div className="board_view_review_container_list_container">
                <div className="board_view_review_container_first_line">
                    <div className="board_view_review_container_list_1">{comment.username} </div>
                    {comment.userId == user_Id && (
                    <div className="board_view_review_container_list_3_btn_container">
                        <button className="board_view_review_container_list_container_btn" onClick={() => setEditedCommentId(comment.commentId)}>✏️</button>
                        <form onSubmit={(event) => handleBoardcommentdelete(comment.commentId, event)}>
                            <button className="board_view_review_container_list_container_btn">X</button>
                        </form>
                    </div>
                    )}
                    {comment.userId != user_Id && (
                        <div className="board_view_review_container_list_3_btn_container">
                            <div className="board_view_review_container_list_3_btn_container_no_owner">X</div>
                        </div>
                    )}

                </div>
                <div className="board_view_review_container_list_3">{comment.modifiedAt.split("T")[0]}</div>

            </div>
            {editedCommentId !== comment.commentId && <div className="board_view_review_container_list_4">{comment.commentContent}</div>}
            {editedCommentId === comment.commentId && 
                <div className="board_view_review_container_list_4_edit_container">
                    <textarea className="board_view_review_container_list_4_edit" placeholder={comment.commentContent} onChange={handleEditCommentChange}></textarea>
                    <div className="board_view_review_container_list_4_edit_btn_container">
                        <div onClick={() => setEditedCommentId(null)}>취소</div>
                        <form onSubmit={(event) => handleBoardcommentEdit(comment.commentId, event)}>
                            <button>수정</button>
                        </form>
                    </div>
                </div>
            }

        </div>
    ));


    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@댓글 작성 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    const handleBoardComment = async (event) => {
        event.preventDefault();
        //로컬스토리지 추출
            
        //댓글작성
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/comments`, {
                boardId : boardview_boardId,
                content : boardview_comment_content_change,
            }, 
            {
                crossDomain: true,
                withCredentials: true
            });
            if (response.status === 200) {
                Swal.fire({
                    title: '댓글작성',
                    text: '댓글작성을 완료했습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
            }
        }
        catch (error) {

        }
        
    }
    const handleBoardComment_state_change = () => {
        setBoardview_commentwrite(1);
    };

    const handleBoardComment_content_change = (event) => { 
        setBoardview_comment_content_change(event.target.value)
    };

    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@북마크 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    const handleBoardBookmark_1 = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/bookmarks`, {
                boardId: board_Id,
            }, 
            {
                crossDomain: true,
                withCredentials: true
            });

            if (response.status === 200) {
                setBookmark_state(1);
            }
        }
        catch (error) {

        }
    }
    const handleBoardBookmark_2 = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/bookmarks/${board_Id}`,{
                crossDomain: true,
                withCredentials: true
            });
            
            if (response.status === 200) {
                setBookmark_state(0);
            }
        }
        catch (error) {

        }
    }
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@게시글 삭제 api@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    const handleBoarddelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/boards/${boardview_boardId}`,{
                crossDomain: true,
                withCredentials: true
            });
            
            if (response.status === 200) {
                
                navigate('/delete');
            }
        }
        catch (error) {

        }
    }
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@편집@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    /*편집모드*/
    const [boardedit_mode, setBoardEdit_mode] = useState(false);
    const handleEditmode = (event) => {
        setBoardEdit_mode(!boardedit_mode)
    };

    /*제목변경*/
    const [boardedit_title, setBoardedit_title] = useState(boardview_title);

    const handleboardedit_titleChange = (event) => { //년도
        setBoardedit_title(event.target.value)
    };
    /*해시태그 변경*/
    const [send_edit_hashtag, setSendEditHashtag] = useState([]);

    /*내용변경*/
    const [boardedit_content, setBoardedit_content] = useState(boardview_content);
    const handleboardedit_contentChange = (event) => { //년도
        setBoardedit_content(event.target.value)
    };

    const handleBoardEditSubmit = async (event) => {
        event.preventDefault();
        console.log(boardedit_title, boardedit_content, send_edit_hashtag)
        if (boardedit_title === '' || boardedit_content === ''){
            Swal.fire({
                title: 'Edit',
                text: '제목 또는 내용을 입력해주세요!',
                icon: 'warning',
                confirmButtonText: '확인',
            });
        }
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/boards/${boardview_boardId}`, {
                title : boardedit_title,
                content : boardedit_content,
                hashtags : send_edit_hashtag
            }, 
            {
                crossDomain: true,
                withCredentials: true   
            });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Edit',
                    text: '게시물이 수정되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                setBoardEdit_mode(false)
                setEdit_state(1)
            }

        } catch (error) {
            Swal.fire({
                title: 'Edit',
                text: '편집되지 않았습니다!',
                icon: 'error',
                confirmButtonText: '확인',
            });
            // 에러 처리 작업 추가
        }
    };
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@해시태그 편집들@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    /*해시테그 boardview_hashtags*/
    const [edit_hashtags, setEditHashtags] = useState([
        { text: '질문글', selected: false },

        { text: '비현직자', selected: false },
        { text: '현직자', selected: false },
        { text: '전공자', selected: false },
        { text: '비전공자', selected: false },
        { text: 'front', selected: false },
        { text: 'back', selected: false },

        { text: 'html', selected: false },
        { text: 'css', selected: false },
        { text: 'javascript', selected: false },
        { text: 'typescript', selected: false },
        { text: 'react', selected: false },
        { text: 'java', selected: false },
        { text: 'python', selected: false },
        { text: 'spring', selected: false },
        { text: 'springboot', selected: false },
        { text: 'node.js', selected: false },

        { text: '운영체제', selected: false },
        { text: '네트워크', selected: false },
        { text: '자료구조', selected: false },
        { text: '컴퓨터구조', selected: false },
        { text: '컴파일러', selected: false },
        { text: '알고리즘', selected: false },
        { text: '데이터베이스', selected: false },

        { text: '부트캠프', selected: false },
        { text: '개발외주', selected: false },
    ]);
      
    useEffect(() => {
        setEditHashtags((prevEditHashtags) => {
          return prevEditHashtags.map((editHashtag) => {
            return {
              ...editHashtag,
              selected: boardview_hashtags.some((hashtag) => hashtag === editHashtag.text),
            };
          });
        });
      }, [boardview_hashtags]);

    const handleClick = (index) => {
        setEditHashtags((prevHashtags) => {
            const updatedHashtags = prevHashtags.map((hashtag, i) => {
                if (i === index) {
                    return { ...hashtag, selected: !hashtag.selected };
                } else if (hashtag.text === '비현직자' && prevHashtags[index].text === '현직자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === '현직자' && prevHashtags[index].text === '비현직자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === '전공자' && prevHashtags[index].text === '비전공자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === '비전공자' && prevHashtags[index].text === '전공자') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === 'front' && prevHashtags[index].text === 'back') {
                    return { ...hashtag, selected: false };
                } else if (hashtag.text === 'back' && prevHashtags[index].text === 'front') {
                    return { ...hashtag, selected: false };
                } else {
                    return hashtag;
                }
            });
      
          return updatedHashtags;
        });
    };

    useEffect(() => {
        const selectedHashtags = edit_hashtags.filter((hashtag) => hashtag.selected);
        const selectedHashtagTexts = selectedHashtags.map((hashtag) => hashtag.text);
        setSendEditHashtag(selectedHashtagTexts);
    }, [edit_hashtags]);


    //네비게이트 자동 실행
    const handleLogout = () => {
        navigate('/');
        store.dispatch({type:"HOME"});
    };

    

    return (
        <div className="board_object_body">
            {/* 헤더*/}
            <Home_header></Home_header>
            {boardedit_mode === false && (
            <div>
                <div className="board_info_title_hashtag_container">
                    {/* 편집 및 수정 */}
                    <div className="edit_and_delete_container">
                        <div className="board_object_tool_c1">
                            {user_Id == boardview_userId && <button className = "board_object_tool_c1_btn" onClick={handleEditmode}>수정</button>} 
                            {user_Id != boardview_userId && <div className = "no_board_object_tool_c1_btn">수정</div>} 
                        </div>
                        <div className="board_object_tool_c2">
                            {user_Id == boardview_userId && <button className = "board_object_tool_c2_btn" onClick={handleBoarddelete}>삭제</button>}
                            {user_Id != boardview_userId && <div className = "no_board_object_tool_c2_btn">삭제</div>} 
                        </div>
                    </div>

                    {/* 제목*/}
                        <div className="board_object_title">
                            {boardview_title}
                        </div>


                    {/* 해시테그*/}
                        <div className="board_object_hashtag">
                            {hashtagElements}
                        </div>


                    {/* 글쓴이 아이디, 게시일 */}
                    <div className="board_object_info">
                        <div className="board_object_info_owner">{boardview_username}</div>
                        <div className="board_object_info_edit_container">
                            {/* <div>작성일 : {boardview_createAt}</div> */}
                            <div>{boardview_createAt} 작성 | {boardview_modifiedAt} 수정 | 조회수 {boardview}</div>
                        </div>
                    </div>
                </div>

                {/* 그래프*/}
                <div className="board_object_chart_container">
                    <div id="chart" />
                </div>

                {/* 내용*/}

                    <div className="board_object_content">
                        {boardview_content}
                    </div>

                
                {/*구분라인*/}
                <div className="board_object_line"></div>

                {/*댓글작성란*/}
                <div className="board_object_commentwrite">
                    <form onSubmit={handleBoardComment}>
                        <textarea type="text" className="board_object_commentwrite_input" onChange={handleBoardComment_content_change} placeholder="댓글을 작성해주세요!"></textarea>
                    </form>   
                </div>

                {/*댓글보내기*/}
                <form onSubmit={handleBoardComment}>
                    <button type="submit" className="board_object_commentwrite_btn" onClick={handleBoardComment_state_change}>댓글 작성</button>
                </form>
                
                {/*댓글리스트*/}
                <div className="board_view_review_container">
                    {CommentList}
                </div>

                {/*푸터*/}
                <div className="board_object_footer">
                    <img className="board_object_footer_c3" src={require("../image/logo.png")}></img>
                    <div className="board_object_footer_c1">2023</div>
                    <div className="board_object_footer_c2">당신의 길라잡이</div>  
                </div>

                {/*즐겨찾기, 게시글 삭제 및 수정*/}

                <div className="board_object_tool">
                    <div className = "board_object_tool_c3">
                        {bookmark === false && <img className="star1" src={require("../image/star_1.png")} onClick={handleBoardBookmark_1}></img>} 
                        {bookmark === true && <img className="star2" src={require("../image/star_2.png")} onClick={handleBoardBookmark_2}></img>} 
                    </div>
                    <div className="board_object_tool_watch">99+</div>              
                </div>
            </div>
            )}

            {boardedit_mode === true && (
            <div className="board_object_edit_container">
                <div className="board_object_edit_container_tip">✏️EDIT MODE</div>

                <input className="board_object_title_edit" placeholder={boardview_title} onChange={handleboardedit_titleChange}></input>

                <div className="board_object_hashtag_edit_mode">
                    {edit_hashtags.map((hashtag, index) => (
                    <div key={index} style={{ backgroundColor: hashtag.selected ? '#262752' : '#ffffff' }} onClick={() => handleClick(index)}>
                        {hashtag.text}
                    </div>
                    ))}
                </div>

                <textarea className="board_object_content_edit" placeholder={boardview_content} onChange={handleboardedit_contentChange}></textarea>


                <div className="board_edit_btn_container">
                    <div onClick={handleEditmode}>
                        취소
                    </div>           
                    <form onSubmit={handleBoardEditSubmit}>
                        <button >
                            저장
                        </button>
                    </form>
                </div>

                <div className="board_edit_chart_container">
                    <div id="chart" />
                </div>

            </div>

            )}
        </div>
    )
    
}

export default Board_object;