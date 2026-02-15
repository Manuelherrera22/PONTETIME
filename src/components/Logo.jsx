import React from 'react';

const Logo = ({ className = "", color = "black" }) => {
    // color="black" implies we are on a light background, so we use the standard logo (likely dark text)
    // color="white" implies we are on a dark background, so we use the logo designed for dark backgrounds
    const logoSrc = color === "white"
        ? "/images/logopontetimefondiónegro.png"
        : "/images/logopontetime.png";

    return (
        <img
            src={logoSrc}
            alt="PonteTIME Logo"
            className={`w-full h-full object-contain ${className}`}
        />
    );
};

export default Logo;
