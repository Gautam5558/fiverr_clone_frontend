import React from 'react'
import "./orders.scss"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Orders = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()


    const { data, error, isLoading } = useQuery({
        queryKey: ["Orders"],
        queryFn: () => axios.get("http://localhost:3000/api/orders", { withCredentials: true, }).then((res) => { return res.data })
    })

    if (isLoading) {
        return "loading..."
    }

    if (error) {
        return "there was some error"
    }

    const handleClick = async (sellerId, buyerId) => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/conversations/single/" + sellerId + buyerId, { withCredentials: true })
            navigate("/message/" + sellerId + buyerId)
        } catch (err) {
            if (err.response.status === 402) {
                try {
                    await axios.post("http://localhost:3000/api/conversations", { to: user.isSeller ? buyerId : sellerId }, { withCredentials: true })
                    navigate("/message/" + sellerId + buyerId)
                } catch (err) {
                    console.log(err)
                }

            }
        }
    }

    return (
        <div className='orders'>
            <div className="container">
                <div className="title">
                    <h1>Orders</h1>
                </div>
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>{user.isSeller ? "Buyer" : "Seller"}</th>
                        <th>Contact</th>
                    </tr>
                    {data.map((order) => {
                        return (
                            <tr key={order._id}>
                                <td><img className='img' src={order.img} /></td>
                                <td>{order.title}</td>
                                <td>{order.price}</td>
                                <td>{user.isSeller ? order.buyerId.substring(0, 30) : order.sellerId.substring(0, 30)}</td>
                                <td><img className='delete' src='/images/message.png' onClick={(e) => handleClick(order.sellerId, order.buyerId)} /></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default Orders