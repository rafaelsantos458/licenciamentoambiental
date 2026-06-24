import React from 'react';

interface LogoProps {
  className?: string; // Additional classes for positioning/sizing of the container
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'; // Sizing presets
  textColor?: 'dark' | 'light'; // Text color scheme / filters
}

export default function Logo({ className = '', iconSize = 'md', textColor = 'dark' }: LogoProps) {
  // Sizing presets for the complete logo image aspect ratio
  const logoDimensions = {
    sm: 'h-7 sm:h-8 w-auto',
    md: 'h-9 sm:h-11 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
    xl: 'h-24 sm:h-28 w-auto'
  }[iconSize];

  // If light mode (footer/dark background) we apply high-end CSS filters to make the dark elements bright white
  const filterStyle = textColor === 'light' 
    ? 'brightness-0 invert' 
    : '';

  // Direct google drive image loading (using Google Content Delivery endpoint for shared drive files)
  const imageUrl = "https://lh3.googleusercontent.com/d/1wIcQy-m7C7bkGEtiE7woQDSeun2QjBX2";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={imageUrl}
        alt="Solução Verde"
        referrerPolicy="no-referrer"
        className={`${logoDimensions} object-contain transition-transform duration-300 hover:scale-[1.03] ${filterStyle}`}
        id={`logo-img-element-${textColor}`}
      />
    </div>
  );
}
