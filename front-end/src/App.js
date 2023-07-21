import React, {Component} from "react";
import No_login_home_header from "./component/header/no_login_home_header";
import Home_board_list from "./component/body/home_board_list";
import Login from "./component/login/login";
import Search_id from "./component/search/search_id";
import Search_pwd from "./component/search/search_pwd";
import Change_pwd from "./component/change/change_pwd";
import Join from "./component/join/join";
import Mypage from "./component/mypage/mypage";
import Board_post from "./component/board/board_post";
import Welcome from "./component/welcome/welcome";
import Board_object from "./component/board/board_object";
import Board_delete_animation from "./component/board_delete_animation/board_delete_animation"
import Drawing from "./component/drawing/drawing";
import store from "./store";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

export default class App extends Component{
  state = {
    number:store.getState().number,
  } 
  constructor(props){
    super(props);
    
    store.subscribe(function(){
      this.setState({number:store.getState().number});
    }.bind(this));
  }

  render() {

    if (this.state.number === 0 || this.state.number === 1 || this.state.number === 2 || this.state.number === 3 ||
        this.state.number === 4 || this.state.number === 5 || this.state.number === 6 || this.state.number === 10) {
        return (
          <div className="App">
            <No_login_home_header></No_login_home_header>
            {this.state.number === 1 && <Login></Login>} 
            {this.state.number === 2 && <Join></Join>} 
            {this.state.number === 3 && <Search_id></Search_id>} 
            {this.state.number === 4 && <Search_pwd></Search_pwd>} 
            {this.state.number === 5 && <Change_pwd></Change_pwd>} 
            {this.state.number === 6 && <Welcome></Welcome>}
          </div>
        );
      }
    else{
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home_board_list></Home_board_list>}></Route>
            <Route path="/board/*" element={<Board_object></Board_object>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            <Route path="/boardwrite" element={<Board_post></Board_post>}></Route>
            <Route path="/delete" element={<Board_delete_animation></Board_delete_animation>}></Route>
            <Route path="/drawing" element={<Drawing></Drawing>}></Route>
          </Routes>
        </BrowserRouter>
      );
    }
  }
}
