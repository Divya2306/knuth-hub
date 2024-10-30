// EventImageCarousel.js
import React, { useState } from 'react';
import './Carousel.css';

function Carousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <button onClick={prevImage} className="carousel-button">&#10094;</button>
      <img src={images[currentImageIndex]} alt={`Event ${currentImageIndex + 1}`} className="carousel-image" />
      <button onClick={nextImage} className="carousel-button">&#10095;</button>
    </div>
  );
}

export default Carousel;
