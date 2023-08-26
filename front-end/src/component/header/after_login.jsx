import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AfterLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, {
                crossDomain: true,
                withCredentials: true
            });
            if (response.status === 200){
                navigate('/');
                dispatch({ type: "HOME" });
            }
        }
        catch (error) {
   
        }
    }


    return (
        <div className="home_header_body_1_login_form">
            <form onSubmit={handleLogout}>
                <button className="home_header_body_1_c1">
                    로그아웃
                </button>
            </form>
            <Link to="/mypage" style={{ textDecoration: 'none' }}>
                <div className="home_header_body_1_c2">마이페이지</div>
            </Link>
        </div>
    );
};

export default AfterLogin;