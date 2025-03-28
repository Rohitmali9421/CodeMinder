import React from 'react'
import Header from '../Components/Home/Header'
import HeroSection from '../Components/Home/HeroSection'
import CodingPlatform from '../Components/Home/CodingPlatform'
import PrepSimplifier from '../Components/Home/PrepSimplifier'
import FAQ from '../Components/Home/FAQ'
import CodingPortfolio from '@/Components/Home/CodingPortfolio'


function LandingPage() {
    return (
        <div className='  w-full overflow-x-hidden'>
            <HeroSection />
            <PrepSimplifier />
            {/* <CodingPlatform />
            
            <CodingPortfolio />
            <FAQ />      */}
        </div>
    )
}

export default LandingPage
