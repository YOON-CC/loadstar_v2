import React from "react";
import "./mypage.css";
import { Link } from "react-router-dom";

const Mypage_6 = () => {
  const handlegithubClick1 = () => {
    window.open("https://github.com/YOON-CC", "_blank");
  };
  const handlegithubClick2 = () => {
    window.open(
      "https://github.com/preferrrr?tab=overview&from=2023-06-01&to=2023-06-11",
      "_blank"
    );
  };
  const handlegithubClick3 = () => {
    window.open("https://github.com/ddogong", "_blank");
  };

  return (
    <div className="mypage_6_container">
      <div className="mypage_6_loadstar">
        LoadStar는 개발자가 꿈인 사용자들이 <br />
        로드맵을 공유, 참고하며 진로방향을 설정하는 웹사이트입니다.
      </div>
      <div className="mypage_6_version_container">
        <div className="mypage_6_version_container_img">
          <img
            className="home_header_body_1_logo_img"
            src={require("../image/version_img.png")}></img>
        </div>
        <div className="mypage_6_version_container_contents">
          <div className="mypage_6_version_container_contents_num">
            <div>Version</div>
            <div>0.0.1</div>
          </div>
        </div>
      </div>
      <div className="mypage_6_version_developer">
        <div className="mypage_6_version_developer_title">Developers &#62;</div>
        <div
          className="mypage_6_version_developer1"
          onClick={handlegithubClick1}>
          조윤찬
        </div>
        <div
          className="mypage_6_version_developer2"
          onClick={handlegithubClick2}>
          이선호
        </div>
        <div
          className="mypage_6_version_developer3"
          onClick={handlegithubClick3}>
          강서연
        </div>
      </div>
    </div>
  );
};

export default Mypage_6;
