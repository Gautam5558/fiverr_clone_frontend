import React from 'react'
import "./features.scss"

const Features = () => {
    return (
        <div className='features'>
            <div className="container">
                <div className="left">
                    <h1>A whole world of freelance talent at your fingertips.</h1>
                    <div className="feature">
                        <div className="imgandh3">
                            <img src="./images/check.png" />
                            <h3>The best for every budget</h3>
                        </div>
                        <p>Find high quality services at every price point. No hourly rates, just project based pricing.</p>
                    </div>
                    <div className="feature">
                        <div className="imgandh3">
                            <img src="./images/check.png" />
                            <h3>The best for every budget</h3>
                        </div>
                        <p>Find high quality services at every price point. No hourly rates, just project based pricing.</p>
                    </div>
                    <div className="feature">
                        <div className="imgandh3">
                            <img src="./images/check.png" />
                            <h3>The best for every budget</h3>
                        </div>
                        <p>Find high quality services at every price point. No hourly rates, just project based pricing.</p>
                    </div>
                    <div className="feature">
                        <div className="imgandh3">
                            <img src="./images/check.png" />
                            <h3>The best for every budget</h3>
                        </div>
                        <p>Find high quality services at every price point. No hourly rates, just project based pricing.</p>
                    </div>
                </div>
                <div className="right">
                    <video src='./images/file_example_MP4_480_1_5MG.mp4' controls />
                </div>
            </div>
        </div>
    )
}

export default Features