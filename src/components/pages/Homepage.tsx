import React from 'react';
import Hero from '../Hero';
import FeaturedProducts from '../FeaturedProducts';
import Features from '../Features';


const Homepage: React.FC = () => {
    return (
        <div>
            <Hero />
            <FeaturedProducts />
            <Features />
        </div>
    );
};

export default Homepage;
