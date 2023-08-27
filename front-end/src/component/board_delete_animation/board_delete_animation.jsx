import React from "react";
import { useNavigate} from 'react-router-dom';
import "./board_delete_animation.css";
const Board_delete_animation = () => {
    
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/');
    }, 1200);

    return (
        <div className="delete_container">
            <img className="delete_img" src= {require("../image/logo.png")}></img>
        </div>
    )
    
}
export default Board_delete_animation;