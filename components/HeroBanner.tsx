
  import React from 'react';
  import { Link } from 'react-router-dom';
  
  interface HeroBannerProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
  }
  
  const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, ctaText, ctaLink, imageUrl }) => {
    return (
      <div 
        className="relative bg-cover bg-center rounded-lg shadow-2xl overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})`, height: '60vh', minHeight: '400px' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-brand-light mb-8 max-w-2xl">
            {subtitle}
          </p>
          <Link
            to={ctaLink}
            className="bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-md"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    );
  };
  
  export default HeroBanner;
      