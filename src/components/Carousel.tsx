import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface CarouselProps {
  children: ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children: slides }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((current) => (current === slides.length - 1 ? 0 : current + 1));
  }, [slides.length]);

  const prevImage = () => {
    setCurrentImage((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000);
    return () => clearInterval(intervalId);
  }, [nextImage]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        {/* Wrapper for slides */}
        <div
          className="carousel-wrapper"
          style={{
            transform: `translateX(-${currentImage * 100}%)`
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-slide">
              {slide}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button onClick={prevImage} className="carousel-button left">
          <FaArrowLeft />
        </button>
        <button onClick={nextImage} className="carousel-button right">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
