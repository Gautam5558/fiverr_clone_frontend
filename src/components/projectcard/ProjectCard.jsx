import React from 'react'
import "./projectcard.scss"
import { Link } from 'react-router-dom'

const ProjectCard = ({ item }) => {
    return (
        <Link to="/" className='link'>
            <div className='projectCard'>
                <img src={item.img} className='mainImg' />
                <div className="info">
                    <img src={item.pp} className='profilepicture' />
                    <div className="texts">
                        <span>{item.cat}</span>
                        <h2>{item.username}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard