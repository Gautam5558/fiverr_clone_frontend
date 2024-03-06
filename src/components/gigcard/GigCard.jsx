import React from 'react'
import "./gigcard.scss"
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const GigCard = ({ item }) => {



    const { isLoading, data, error, refetch } = useQuery({
        queryKey: [`${item.userId}`],
        queryFn: () => axios.get("http://localhost:3000/api/users/" + item.userId).then((res) => { return res.data })
    })


    return (
        <Link to={"/gig/" + item._id} className='link'>
            <div className='gigCard'>
                <img src={item.coverImg} />
                <div className="info">
                    <div className="user">
                        <img src={data?.img} />
                        <span>{data?.username}</span>
                    </div>
                    <p>{item.desc}</p>
                    <div className="star">
                        <img src='./images/star.png' />
                        <span>{item.totalStars != 0 && Math.round(item.totalStars / item.starNumber)}</span>
                    </div>
                    <hr />
                    <div className="details">
                        <img src='./images/heart.png' />
                        <div className="price">
                            <span>STARING AT</span>
                            <h2>${item.price}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GigCard