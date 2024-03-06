import React from 'react'
import "./layout.scss"
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='layout'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout