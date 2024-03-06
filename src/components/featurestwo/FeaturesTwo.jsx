import React from 'react'
import "./featurestwo.scss"
import { useNavigate } from 'react-router-dom'

const FeaturesTwo = () => {
    const navigate = useNavigate()
    return (
        <div className='featuresTwo'>
            <div className="container">
                <div className="left">
                    <h1>fiverr <i>business</i></h1>
                    <h1>A business solution designed for <i>teams.</i></h1>
                    <p>Upgrade to a curated experience packed with tools and benifits, dedicated to businesses</p>
                    <div className="feature">
                        <img src='./images/check.png' />
                        <span>Get matched with the perfect talent by a customer success manager</span>
                    </div>
                    <div className="feature">
                        <img src='./images/check.png' />
                        <span>Connect to freelancers with proven business experience</span>
                    </div>
                    <div className="feature">
                        <img src='./images/check.png' />
                        <span>Mange teamwork and boost productivity with one powerfull workspace</span>
                    </div>
                    <button onClick={() => navigate("/becomeaseller")}>Explore Fiverr Business </button>
                </div>
                <div className="right">
                    <img src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png' />
                </div>
            </div>
        </div>
    )
}

export default FeaturesTwo