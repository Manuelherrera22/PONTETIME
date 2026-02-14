import React from 'react';

const Logo = ({ className = "" }) => {
    return (
        <img
            src="/images/logopontetime.png"
            alt="PonteTIME Logo"
            className={`w-full h-full object-contain ${className}`}
        />
    );
};

export default Logo;
