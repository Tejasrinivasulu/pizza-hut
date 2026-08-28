'use client';
import { useEffect, useState } from 'react';
const PLACEHOLDER = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop';
const FoodImage = ({ src, alt, className = '', width, height }) => {
    const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);
    useEffect(() => {
        setImgSrc(src || PLACEHOLDER);
    }, [src]);
    return (<img src={imgSrc} alt={alt} width={width} height={height} className={`object-cover ${className}`} onError={() => setImgSrc(PLACEHOLDER)}/>);
};
export default FoodImage;
