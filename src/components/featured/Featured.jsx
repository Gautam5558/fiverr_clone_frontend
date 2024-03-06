import React, { useState } from 'react'
import "./featured.scss"
import { Link, useNavigate } from "react-router-dom"

const Featured = () => {

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/gigs?search=" + search)
    }

    return (
        <div className='featured'>
            <div className="container">
                <div className="left">
                    <h1>Find the perfect <i>freelance</i> services for your business.</h1>
                    <form className="search" onSubmit={(e) => { handleSubmit(e) }}>
                        <div className="searchInput">
                            <img src='./images/search.png' />
                            <input type='text' placeholder='Try "building a mobile app" ' onChange={(e) => { setSearch(e.target.value) }} value={search} />
                        </div>
                        <button>Search</button>
                    </form>
                    <div className="popular">
                        <span>Popular:</span>
                        <Link to="/gigs?cat=Web Design" className='link'><button>Web Design</button></Link>
                        <Link to="/gigs?cat=Wordpress" className='link'><button>Wordpress</button></Link>
                        <Link to="/gigs?cat=Logo Design" className='link'><button>Logo Design</button></Link>
                        <Link to="/gigs?cat=AI Services" className='link'><button>AI Services</button></Link>
                    </div>
                </div>
                <div className="right">
                    <img src='./images/man.png' />
                </div>
            </div>
        </div>
    )
}

export default Featured