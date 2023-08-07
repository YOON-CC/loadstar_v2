import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import After_login from "./after_login";
import store from "../../store.js";
import "./home_header.css";

function Home_header() {
    const [number, setNumber] = useState(store.getState().number);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setNumber(store.getState().number);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="home_header_container">
          <div className="home_header_container_1">
            <div className="home_header_container_1_logo"><img src= {require ("../image/logo.png")}></img></div>
            <div className="home_header_container_1_btn_container">
              <After_login></After_login>
            </div>
          </div>
        </div>
    );
}

export default Home_header;