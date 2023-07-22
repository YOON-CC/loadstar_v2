import React, { useEffect } from "react";
import store from "../../store";
 
const Welcome = () => {
    useEffect(() => {
        const { userId } = store.getState();
        setTimeout(() => {
            store.dispatch({
                type: "HOME",
                payload: {
                number: 10,
                userId: userId,
                },
            });
        }, 5000);
    }, []);

  return (
    <div>
        <div className="welcome_container">
            <div className="text1">THANKS FOR</div>
            <div className="text2">JOINING</div>
            <div className="text3">OUR SITE</div>
            <img className="welcome_img" src="./image/logo.png" alt="Welcome" />
        </div>

        {/* css스타일 */}
        <style>
            {`
            /* 반응형 */
            @media (min-width: 901px) {
                .welcome_container {
                    position: absolute;
                    background-color: rgba(0, 0, 0, 0.678);
                    height: 100%;
                    width: 100%;
                    z-index: 4;
                    }

                    .text1 {
                    position: absolute;
                    height: 100px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 100px;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    animation: text_animation 0.3s;
                }

                .text2 {
                    position: absolute;
                    height: 100px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 100px;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    animation: text_animation 0.3s;
                    animation-delay: 0.3s;
                }

                .text3 {
                    position: absolute;
                    height: 100px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 100px;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    animation: text_animation 1s;
                    animation-delay: 0.6s;
                }

                .welcome_img {
                    position: absolute;
                    height: 350px;
                    width: 380px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: img_animation 1.5s linear;
                    animation-delay: 1.6s;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
            }

            @media (max-width: 900px) {
                .welcome_container {
                    position: absolute;
                    background-color: rgba(0, 0, 0, 0.678);
                    height: 100%;
                    width: 100%;
                    z-index: 4;
                    }

                    .text1 {
                    position: absolute;
                    height: 100px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    animation: text_animation 0.3s;
                }

                .text2 {
                    position: absolute;
                    height: 100px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    animation: text_animation 0.3s;
                    animation-delay: 0.3s;
                }

                .text3 {
                    position: absolute;
                    height: 100px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    animation: text_animation 1s;
                    animation-delay: 0.6s;
                }

                .welcome_img {
                    position: absolute;
                    height: 150px;
                    width: 170px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: img_animation 1.5s linear;
                    animation-delay: 1.6s;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
            }

            @keyframes text_animation {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes img_animation {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            `}
      </style>
    </div>
    
  );
};

export default Welcome;