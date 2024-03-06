import React, { useState } from 'react'
import "./reviews.scss"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Review from '../review/Review'

const Reviews = ({ gigId }) => {

    const queryClient = useQueryClient()
    const [reviewError, setReviewError] = useState(null)

    const { data, isLoading, error } = useQuery({
        queryKey: ["QueryReviews"],
        queryFn: () => axios.get("http://localhost:3000/api/reviews/" + gigId).then((res) => { return res.data })
    })

    const mutation = useMutation({
        mutationFn: (reviewData) => axios.post("http://localhost:3000/api/reviews", reviewData, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries(["QueryReviews"])
        },
        onError: (err) => {
            setReviewError(err.response.data.message)
        }
    })

    if (isLoading) {
        return "loading"
    }
    if (error) {
        return "there was some error"
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const desc = e.target[0].value
        const star = e.target[1].value
        mutation.mutate({ desc, star, gigId: gigId })
        e.target[0].value = ""
    }

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {data.map((item) => {
                return (
                    <Review key={item._id} item={item} />
                )
            })}

            <div className="addReview">
                {reviewError && <span className='error'>{reviewError}!</span>}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <textarea placeholder='Write review here...' />
                    <select name='star'>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button>Add a Review</button>
                </form>
            </div>
        </div>
    )
}

export default Reviews