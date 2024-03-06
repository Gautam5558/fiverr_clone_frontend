import React from 'react'
import "./review.scss"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Review = ({ item }) => {

    const { data, error, isLoading } = useQuery({
        queryKey: [`${item.userId}`],
        queryFn: () => axios.get("http://localhost:3000/api/users/" + item.userId).then((res) => { return res.data })
    })

    if (isLoading) {
        return "loading..."
    }

    if (error) {
        return "There was some error"
    }


    return (
        <div className='review'>
            <div className="item">
                <div className="user">
                    <img className='pp' src={data.img || "/images/noavatar.jpg"} />
                    <div className="reviewUserInfo">
                        <span>{data.username}</span>
                        <div className="country">
                            <img src='https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png' />
                            <span className='countryname'>{data.country}</span>
                        </div>
                    </div>
                </div>

                <div className="stars">
                    {Array(item.star).fill().map((item, index) => {
                        return (<img src='/images/star.png' key={index} />)
                    })}

                    <span>{item.star}</span>
                </div>
                <p>{item.desc}</p>
                <div className="helpful">
                    <span>Helpful?</span>
                    <img src='/images/like.png' />
                    <span>Yes</span>
                    <img src='/images/dislike.png' />
                    <span>No</span>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Review