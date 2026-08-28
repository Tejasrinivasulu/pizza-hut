import React from 'react';
const SlideBackground = ({ bgImage, children }) => {
    return (<div className='hs-carousel-slide relative flex-none w-full h-full bg-center bg-no-repeat bg-cover z-0' style={{ backgroundImage: `url(${bgImage})` }}>
      <div className='absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/55 to-dark/40'/>
      <div className='absolute inset-0 bg-black/20'/>
      {children}
    </div>);
};
export default SlideBackground;
