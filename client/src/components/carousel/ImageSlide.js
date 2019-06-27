import React from 'react';

const ImageSlide = ({ url, text }) => {
    const styles = {
      position:'relative',
      backgroundImage: `url(${url})`,      
      backgroundSize: 'cover',
      backgroundPosition: 'center',     
    };
  
    return (
      <div className="image-slide" style={styles}><h3 className="slider-text">{text}</h3></div>
    );
  }

  export default ImageSlide;
  