import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AfterLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate('/');
        dispatch({ type: "HOME" });
    };

    return (
        <div className="home_header_body_1_form_after">
            <div className="home_header_body_1_c1" onClick={handleLogout}>
                로그아웃
            </div>
            <Link to="/mypage" style={{ textDecoration: 'none' }}>
                <div className="home_header_body_1_c2">마이페이지</div>
            </Link>
        </div>
    );
};

export default AfterLogin;