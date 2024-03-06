import React, { useState } from 'react'
import "./register.scss"
import { upload } from '../../utils/upload'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [isSeller, setIsSeller] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        country: "",
        phone: "",
        desc: "",
        isSeller: false,
        img: null
    })

    const [img, setImg] = useState(null)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setUserData((previous) => {
            return {
                ...previous,
                [e.target.name]: e.target.value
            }
        })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = await upload(img)
        console.log(url)

        setUserData((previous) => { return { ...previous, isSeller: isSeller, img: url } })

        try {
            const { data } = await axios.post("http://localhost:3000/api/auth/register", userData)
            navigate("/login")
        } catch (err) {
            setError(err.response.data.message)
        }

    }

    return (
        <div className='register'>
            <div className="container">
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="left">
                        <h1>Create a new account</h1>
                        <label>Username</label>
                        <input type='text' name="username" onChange={(e) => { handleChange(e) }} value={userData.username} />
                        <label>Email</label>
                        <input type='text' name="email" onChange={(e) => { handleChange(e) }} value={userData.email} />
                        <label>Password</label>
                        <input type='password' name="password" onChange={(e) => { handleChange(e) }} value={userData.password} />
                        <label htmlFor='profilePicture' >Profile Picture</label>
                        <input type='file' id='profilePicture' onChange={(e) => { setImg(e.target.files[0]) }} />
                        <label>Country</label>
                        <input type='text' name="country" onChange={(e) => { handleChange(e) }} value={userData.country} />
                        <button>Register</button>
                        {error && <span className='error'>{error}</span>}
                    </div>
                    <div className="right">
                        <h1>I want to become a seller</h1>
                        <div className="becomeaseller" name="isSeller" onClick={(e) => setIsSeller((previous) => { return !previous })}>
                            <label>Activate the seller account</label>
                            <div className={isSeller === true ? 'outer checked' : 'outer'}>
                                <div className="inner">

                                </div>
                            </div>
                        </div>
                        <label>Phone Number</label>
                        <input type='number' name="phone" onChange={(e) => { handleChange(e) }} value={userData.phone} />
                        <label>Description</label>
                        <textarea name='desc' onChange={(e) => { handleChange(e) }} value={userData.desc} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register