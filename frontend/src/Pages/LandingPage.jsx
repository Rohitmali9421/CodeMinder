import React from 'react'
import Header from '../Components/Header'
import HeroSection from '../Components/HeroSection'
import CodingPlatform from '../Components/CodingPlatform'
import PrepSimplifier from '../Components/PrepSimplifier'
import Footer from '../Components/Footer'
import FAQ from '../Components/FAQ'


function LandingPage() {
    return (
        <div className='  w-full px-4 sm:px-8 md:px-40 pt-20'>
            <HeroSection />
            <CodingPlatform />
            <PrepSimplifier />
            <FAQ />     
        </div>
    )
}

export default LandingPage
