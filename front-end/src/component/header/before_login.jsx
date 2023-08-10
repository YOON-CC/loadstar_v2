import React, { Component } from "react";
import store from "../../store";
import { Link, useNavigate } from "react-router-dom";

export default class Before_login extends Component{

    render() { 
        return (
            <div className="home_header_body_1_login_form">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <div className="home_header_body_1_c1_login" onClick={function(){
                        store.dispatch({type:"LOGIN"});
                    }.bind(this)}>로그인</div>
                </Link>


                <div className="home_header_body_1_c2"onClick={function(){
                    store.dispatch({type:"JOIN"});
                }.bind(this)}>회원가입</div>
            </div>
        )
    }
}