
  import React from 'react';
  
  interface RatingStarsProps {
    rating: number; // Value from 0 to 5
    maxStars?: number;
    size?: 'sm' | 'md' | 'lg';
  }
  
  const StarIconFilled: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
  );
  
  const StarIconOutline: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.82.61l-4.725-2.885a.562.562 0 0 0-.652 0l-4.725 2.885a.562.562 0 0 1-.82-.61l1.285-5.385a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
  
  const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxStars = 5, size = 'md' }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5; // No half star for this version, round to nearest full or empty.
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0); // Not using halfStar
  
    const starSizeClass = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    }[size];
  
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIconFilled key={`full-${i}`} className={`${starSizeClass} text-yellow-400`} />
        ))}
        {/* For simplicity, not implementing half stars. Could be added with a different icon or clipping. */}
        {[...Array(Math.max(0, maxStars - fullStars))].map((_, i) => (
          <StarIconOutline key={`empty-${i}`} className={`${starSizeClass} text-yellow-400`} />
        ))}
      </div>
    );
  };
  
  export default RatingStars;
      