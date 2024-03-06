import React from 'react'
import "./login.scss"
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const [searchParams, setSearchParams] = useSearchParams()
    const message = searchParams.get("message")


    const { user, loading, error, dispatch } = useContext(AuthContext)

    const handleChange = (e) => {
        setLoginData((previous) => {
            return {
                ...previous,
                [e.target.name]: e.target.value
            }
        })
    }
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (loginData.username === "" || loginData.password === "") {
            dispatch({ type: "LOGIN_FAILURE", payload: { message: "Username or password isn't filled" } })
            return
        }

        async function loginRequest() {
            try {
                dispatch({ type: "LOGIN_START" })
                const { data } = await axios.post("http://localhost:3000/api/auth/login", loginData, { withCredentials: true })
                dispatch({ type: "LOGIN_SUCCESS", payload: data })
                navigate("/")

            } catch (err) {
                dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
            }
        }
        loginRequest()

    }

    return (
        <div className='login'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Sign in</h1>
                <label htmlFor="">Username</label>
                <input type='text' placeholder='bob123' name="username" onChange={(e) => handleChange(e)} value={loginData.username} />
                <label htmlFor="">Password</label>
                <input type='password' placeholder='' name='password' onChange={(e) => handleChange(e)} value={loginData.password} />
                <button disabled={loading}>Login</button>
                {error && <span>{error.message}</span>}
                {message && <span>{message}</span>}
            </form>
        </div>
    )
}

export default Login