import React, { useState } from "react";
import store from "../../store";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./search_id.css";

const Search_id = () => {

    //아이디표시
    const [showId, setShowId] = useState('당신의 아이디를 찾아드립니다.'); 

    //이메일
    const [newemail, setnewemail] = useState(''); 

    //이메일 컨트롤 함수
    const handlenewemailgChange = (event) => {
        setnewemail(event.target.value)
    };

    //이메일 요청 함수
    const handlejoinSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/find-id`, {
                params: {
                    email: newemail
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200){
                // console.log(response.data);
                setShowId(response.data.message)
            }
        }
        catch (error) {
            if (error.response && error.response.status === 400) {
                // 400 에러 처리
                setShowId("해당 이메일로 가입한 아이디가 없습니다.")
            } else {
                // 네트워크 오류 등의 예외 처리
                // console.error('API 요청 중 오류 발생:', error);
            }    
        }
    }

    return (
        <div className="search_id_container">
            <div className="search_id_container_title">아이디 찾기</div>
            <form onSubmit={handlejoinSubmit}>
                <div className="search_id_container_email_container">
                    <input type="text" className="email-input" value={newemail} onChange={handlenewemailgChange} placeholder="이메일을 입력하세요."></input>
                    <button type="submit" className="email-box_send">확인</button>
                </div>
                <div className="this_is_id">{showId}</div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="stop_search_id_container">
                        <div className="stop_search_id_container_button">확인/돌아가기</div>
                    </div>
                </Link>
            </form>
        </div>
    )
}

export default Search_id;