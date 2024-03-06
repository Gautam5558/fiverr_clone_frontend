import React, { useEffect, useState } from 'react'
import "./navbar.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'


const Navbar = () => {
    const [active, setActive] = useState(false)

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", isActive)

        return () => {
            window.removeEventListener("scroll", isActive)
        }
    }, [])

    const { pathname } = useLocation()


    const { user, dispatch } = useContext(AuthContext)

    const logout = async () => {
        dispatch({ type: "LOGOUT" })
        try {

            const { data } = await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
            console.log(data)

        } catch (err) {
            console.log(err)
        }

    }
    const navigate = useNavigate()

    return (
        <div className={(active === true || pathname != "/") ? 'navbar active' : 'navbar'}>
            <div className="container">
                <Link to="/" className='link'><div className="logo">
                    <span className='text'>fiverr</span>
                    <span className='dot'>.</span>
                </div></Link>
                <div className="links">
                    <Link to="/becomeaseller" className={active === true || pathname != "/" ? 'link active' : 'link'}> <span>Fiverr Bussiness</span></Link>
                    <Link to="/gigs?" className={active === true || pathname != "/" ? 'link active' : 'link'}><span>Explore</span></Link>
                    <Link to="/" className={active === true || pathname != "/" ? 'link active' : 'link'}><span>English</span></Link>
                    {!user?.isSeller && <Link to="/becomeaseller" className={active === true || pathname != "/" ? 'link active' : 'link'}><span>Become a Seller</span></Link>}
                    {!user && <Link to="/login" className={active === true || pathname != "/" ? 'link active' : 'link'}><span>Sign in</span></Link>}
                    {!user && <button className={active === true || pathname != "/" ? 'link active' : 'link'} onClick={() => { navigate("/register") }}>Join</button>}
                    {user && <div className='user' onClick={() => { setIsOpen((previous) => { return !previous }) }}>
                        <img src={user.img || "/images/noavatar.jpg"} alt="" />
                        <span>{user.username}</span>
                        {isOpen && <div className='options'>
                            {user.isSeller &&
                                <>
                                    <Link to="/mygigs" className='link'><span>My Gigs</span></Link>
                                    <Link to="/add" className='link'><span>Add New Gig</span></Link>
                                </>}
                            <Link to="/orders" className='link'><span>Orders</span></Link>
                            <Link to="/messages" className='link'><span>Messages</span></Link>
                            <Link to="/" className='link' onClick={logout}><span>Logout</span></Link>
                        </div>}
                    </div>}
                </div>
            </div>
            {
                (active === true || pathname != "/") && <> <hr />

                    <div className="menu">
                        <Link to="/" className='link'><span>Graphics & Design</span></Link>
                        <Link to="/" className='link'><span>Video & Animation</span></Link>
                        <Link to="/" className='link'><span>Writing & Translation</span></Link>
                        <Link to="/" className='link'><span>AI Services</span></Link>
                        <Link to="/" className='link'><span>Digital Marketing</span></Link>
                        <Link to="/" className='link'><span>Music & Audio</span></Link>
                        <Link to="/" className='link'><span>Programming & Tech</span></Link>
                        <Link to="/" className='link'><span>Business</span></Link>
                        <Link to="/" className='link'><span>Lifestyle</span></Link>
                    </div>
                    <hr />
                </>
            }
        </div >
    )
}

export default Navbar