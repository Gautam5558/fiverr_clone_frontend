import React from 'react'
import "./home.scss"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedby/TrustedBy'
import Slides from '../../components/slides/Slides'
import { cards } from '../../utils/data'
import CategoryCard from '../../components/categorycard/CategoryCard'
import Features from '../../components/features/Features'
import FeaturesTwo from '../../components/featurestwo/FeaturesTwo'
import { projects } from '../../utils/data'
import ProjectCard from '../../components/projectcard/ProjectCard'


const Home = () => {
    return (
        <div className='home'>
            <Featured />
            <TrustedBy />
            <Slides slidesToShow={5} arrowsScroll={5}  >
                {cards.map((item) => {
                    return (
                        <CategoryCard item={item} key={item.id} />
                    )
                })}
            </Slides>
            <Features />
            <FeaturesTwo />
            <Slides slidesToShow={4} arrowsScroll={4}  >
                {projects.map((item) => {
                    return (<ProjectCard item={item} key={item.id} />
                    )
                })}
            </Slides>
        </div>
    )
}

export default Home