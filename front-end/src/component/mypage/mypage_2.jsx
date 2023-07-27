import React from "react";

const Mypage_2 = () => {
    const handleClick1 = () => {
        window.open('https://www.notion.so/Loadstar-010b97456e40412489fcd9d46c926521?pvs=4');
    };
    return (
        <div className="mypage_2_container">
            <div className="mypage_2_manual_loadstar">"이용방법을 확인하고 LoadStar의 다양한 기능을 사용해보세요!"</div>
            <div className="mypage_2_manual_container_img"><img className="manual_img" src={require("../image/manual.png")}></img></div>
            <div className="mypage_2_manual_container">
            <div onClick={handleClick1}>이용방법 보기</div>
            </div>
        </div>
    );
};

export default Mypage_2;