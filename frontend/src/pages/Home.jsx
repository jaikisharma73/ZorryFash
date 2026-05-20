import React from 'react'
import Hero from '../components/Hero'
import LatestTransformations from '../components/LatestTransformations'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div className="-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]">
      <Hero />
      <LatestTransformations />
      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home
