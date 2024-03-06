import React from 'react'
import "./slides.scss"
import { Slider } from 'infinite-react-carousel'


const Slides = ({ slidesToShow, arrowsScroll, children }) => {
    return (
        <div className='slides'>
            <div className="container" >
                <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} centerPadding={30} swipe={true}>
                    {children}
                </Slider>
            </div>
        </div >
    )
}

export default Slides