import React from "react";
import { Link } from 'react-router-dom';


const Mypage_1 = (props) => {

    const boardId_arr = props.value_boardId
    const myboard_arr = props.value_title;
    const bookmarkdId_arr = props.value_bookmarkId
    const bookmark_arr = props.value_bookmark

    return (
        <div className="mypage_1_container">
            <div className="mypage_1_container_1">
                <div className="mypage_1_container_1_title">내가쓴 글</div>
                <div className="mypage_1_container_1_content">
                    {myboard_arr.map((text, index) => (
                        <Link to={`/board/${boardId_arr[index]}`} key={boardId_arr[index]}><div onClick={() => localStorage.setItem('board_Id', boardId_arr[index])}>{text.length > 6 ? text.slice(0, 6) + "..." : text}</div></Link>
                        
                    ))}
                </div>
            </div>

            <div className="mypage_1_container_2">
                <div className="mypage_1_container_2_title">BOOK MARK</div>
                <div className="mypage_1_container_2_content">
                    {bookmark_arr.map((text, index) => (
                        <Link to={`/board/${bookmarkdId_arr[index]}`} key={bookmarkdId_arr[index]}><div onClick={() => localStorage.setItem('board_Id', bookmarkdId_arr[index])}>{text.length > 6 ? text.slice(0, 6) + "..." : text}</div></Link>
                        
                    ))}
                </div>
            </div>
        </div>
    )
    
}
export default Mypage_1;