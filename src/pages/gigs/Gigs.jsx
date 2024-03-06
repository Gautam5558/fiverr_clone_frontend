import React, { useState } from 'react'
import "./gigs.scss"
import GigCard from '../../components/gigcard/GigCard'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'

const Gigs = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [sortType, setSortType] = useState("sales")

    const minRef = useRef()
    const maxRef = useRef()

    const selectSort = (type) => {
        setSortType(type)
        setIsOpen(false)
        refetch()
    }



    const { search } = useLocation()
    console.log(search)

    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ['gigsPage'],
        queryFn: () => axios.get("http://localhost:3000/api/gigs?" + search.substring(1) + "&min=" + minRef.current.value + "&max=" + maxRef.current.value + "&sort=" + sortType).then((res) => { return res.data })
    })

    const applySort = () => {
        refetch()
    }




    return (
        <div className='gigs'>
            <div className="container">
                <span className='nestedPosition'>FIVERR {">"} GRAPHICS & DESIGN {">"}</span>
                <h1>AI Artists</h1>
                <p>Explore the boundaries of art and technology with Fiverr's AI Artists</p>
                <div className="menu">
                    <div className="left">
                        <span>Budget</span>
                        <input ref={minRef} type='number' placeholder='min' />
                        <input ref={maxRef} type='number' placeholder='max' />
                        <button onClick={applySort}>Apply</button>
                    </div>
                    <div className="right">
                        <span className='sortBy'>Sortby</span>
                        <span className='sortType'>{sortType === "createdAt" ? "Newest" : "Best Selling"}</span>
                        <img src='./images/down.png' onClick={() => { setIsOpen((previous) => { return !previous }) }} />
                        {isOpen && <div className="options">
                            {sortType != "createdAt" && <span onClick={(e) => {
                                selectSort("createdAt")
                            }}>Newest</span>}
                            {sortType != "sales" && <span onClick={(e) => {
                                selectSort("sales")
                            }}>Best Selling</span>}
                        </div>}
                    </div>
                </div>
                <div className="cards">
                    {data?.map((item) => {
                        return (
                            <GigCard item={item} key={item._id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Gigs