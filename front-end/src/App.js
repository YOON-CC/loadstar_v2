import React, { Component } from "react";
import No_login_home_header from "./component/header/no_login_home_header";
import Home_board_list from "./component/body/home_board_list";
import Sign from "./component/login/sign";
import Search_id from "./component/search/search_id";
import Search_pwd from "./component/search/search_pwd";
import Join from "./component/join/join";
import Mypage from "./component/mypage/mypage";
import Board_post from "./component/board/board_post";
import Welcome from "./component/welcome/welcome";
import Board_object from "./component/board/board_object";
import Board_delete_animation from "./component/board_delete_animation/board_delete_animation";
import Drawing from "./component/drawing/drawing";
import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    number: store.getState().number,
  };
  constructor(props) {
    super(props);

    store.subscribe(
      function () {
        this.setState({ number: store.getState().number });
      }.bind(this)
    );
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home_board_list></Home_board_list>}></Route>
          <Route path="/sign" element={<Sign></Sign>}></Route>
          <Route
            path="/board/*"
            element={<Board_object></Board_object>}></Route>
          <Route path="/mypage" element={<Mypage></Mypage>}></Route>
          <Route path="/boardwrite" element={<Board_post></Board_post>}></Route>
          <Route
            path="/delete"
            element={<Board_delete_animation></Board_delete_animation>}></Route>
          <Route path="/drawing" element={<Drawing></Drawing>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
