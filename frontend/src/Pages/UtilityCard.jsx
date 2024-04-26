import React from 'react'

const UtilityCard = (imgURL) => {
    return (
        <div>
            <div className="bg-cover bg-center   top-0 left-0" style={{ backgroundImage: `url(${imgURL})` }}>
            </div>
        </div>
    )
}

export default UtilityCard
