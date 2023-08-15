import React from "react";
import "./mypage.css";
import { Link } from "react-router-dom";

const Mypage_5 = () => {
  const handleManualClick = () => {
    window.open(
      "https://www.notion.so/6fe66bc44fa2491cbd8c94675bd17cef?v=c1de34f3715c462e926079e0b9fb7b97&pvs=4"
    );
  };

  return (
    <div className="mypage_container">
      <div className="mypage_6_top">
        loadstar는 보다 자세한 이용 방법을 안내해드리기 위해 아래 링크를
        제공합니다.
      </div>
      <button className="mypage_6_content" onClick={handleManualClick}>
        loadstar 이용 방법 바로가기
      </button>
    </div>
  );
};

export default Mypage_5;
