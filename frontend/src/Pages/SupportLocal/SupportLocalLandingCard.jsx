import React from 'react';
import MarketData from "../../Data/MarketData";
import SmallCard from "./MarketCard";

const Market = () => {
    return (
        <div className="w-9/12 mx-auto my-5">
            <div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {MarketData.map(card => (
                    <SmallCard key={card.id} image={card.image} heading={card.heading} description={card.description} />
                ))}
            </div>
        </div>
    );
};

export default Market;
