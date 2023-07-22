import React from "react";
import { useNavigate} from 'react-router-dom';

const Board_delete_animation = () => {
    
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/');
    }, 1200);

    return (
        <div className="delete_container">
            <img className="delete_img" src="./image/logo.png"></img>
            
            {/* css스타일 */}
            <style>
                {`
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (min-width: 901px) { /*175 이전*/
                    .delete_container{
                        position: absolute;
                        background: linear-gradient(135deg, #251666, #4d3c9b, #4d3c9b, #251666, #251666);
                        height: 100%;
                        width: 100%;
                        /* margin-top : 270px; */
                        z-index : 4;
                    }
                    .delete_img{
                        position: absolute;
                        height: 350px;
                        width:380px;
                        top: 50%; 
                        left: 50%; 
                        transform: translate(-50%, -50%);
                    
                        animation: img_animation 1s linear;
                        opacity: 0;
                        animation-fill-mode: forwards;
                    
                    }
                    
                    @keyframes img_animation {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                        
                    }
                }
                /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@---------반응형---------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
                @media (max-width: 900px) { /*175 이후*/
                    .delete_container{
                        position: absolute;
                        background: linear-gradient(135deg, #251666, #4d3c9b, #4d3c9b, #251666, #251666);
                        height: 100%;
                        width: 100%;
                        /* margin-top : 270px; */
                        z-index : 4;
                    }
                    .delete_img{
                        position: absolute;
                        height: 150px;
                        width:170px;
                        top: 50%; 
                        left: 50%; 
                        transform: translate(-50%, -50%);

                        animation: img_animation 1s linear;
                        opacity: 0;
                        animation-fill-mode: forwards;

                    }

                    @keyframes img_animation {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                        
                    }
                }
                `}
            </style>
        </div>
    )
    
}
export default Board_delete_animation;