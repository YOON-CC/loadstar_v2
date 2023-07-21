import React, { useState, useEffect } from "react";
import ApexCharts from 'apexcharts';

const Mypage_0 = (props) => {
    
    return (
        
        <div className="mypage_0_container">

            <div className="cover1">아이디 보기</div>
            <div className="cover2">이메일 보기</div>
            <div className="mypage_0_container_1">
                <div>{props.value1}</div>
                <div>{props.value2}</div>
            </div>
            
            <div className="mypage_0_container_2">
                <div><img className="home_header_body_1_logo_img" src="image/logo.png"></img></div>
            </div>

        </div>
    )
    
}

export default Mypage_0;