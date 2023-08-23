import React, { useState, useEffect} from 'react';
import store from "../../store";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import Home_header from '../header/home_header';
import { Link, useNavigate} from 'react-router-dom';
import Login from './login';
import Search_id from '../search/search_id';
import Search_pwd from '../search/search_pwd';
import Join from '../join/join';


const Sign = () => {

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
        <div>
            <Home_header></Home_header>
            {number === 1 && <Login></Login>}
            {number === 2 && <Join></Join>}
            {number === 3 && <Search_id></Search_id>}
            {number === 4 && <Search_pwd></Search_pwd>}
        </div>
    )

}
export default Sign;