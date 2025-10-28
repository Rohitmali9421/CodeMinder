import Calendar from '../Components/EventTracker/Calendar'
import React from 'react'

function EventTracker() {
    return (
        <div className="flex flex-row mt-20 ">
            
            <div className='w-full'>
                <Calendar />

            </div>
        </div>
    )
}

export default EventTracker
