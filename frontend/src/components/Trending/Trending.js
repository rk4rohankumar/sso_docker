import React from 'react';
import CarouselCard from './TrendingCard'; 

const Trending = ({TrendingData}) => {
    return (
        <div className='w-9/12 mx-auto'>
            <div className='mb-4'>
                <h1 className='text-left text-xl m-5 font-semibold'>Trending this Week</h1>
            </div>
            <CarouselCard data={TrendingData} />
        </div>
    );
};

export default Trending;
