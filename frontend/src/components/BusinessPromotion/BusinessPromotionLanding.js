import React, { useState } from 'react';
import SmallCard from './CarouselCard'; 
import NearbyData from '../../Data/NearbyData'; 
import optionsData from './OptionData';

const MainPage = () => {
    const [selectedOption, setSelectedOption] = useState(optionsData[0]);
    

    return (
        <div className="flex flex-col md:flex-row">
            {/* Left portion - Scrollable list of options */}
            <div className="w-full md:w-2/12 h-screen overflow-y-auto border-r border-gray-200">
                {optionsData.map(option => (
                    <div key={option.id} className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => setSelectedOption(option)}>
                        <h3 className="text-lg font-semibold">{option.title}</h3>
                        <p className="text-gray-500">{option.description}</p>
                    </div>
                ))}
            </div>

            {/* Right portion - Detailed view */}
            <div className="w-full ">
                {selectedOption && (
                    <div className='w-9/12 mx-auto'>
                        <div className='mb-4'>
                            <h1 className='text-left'>Promote your business</h1>
                        </div>
                        <div className='flex flex-wrap justify-center'>
                            {/* Map over NearbyData array to render each SmallCard */}
                            {NearbyData.map((item) => (
                                <SmallCard key={item.id} image={item.image} heading={item.heading} rating={item.rating} deliveryTime={item.deliveryTime} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
