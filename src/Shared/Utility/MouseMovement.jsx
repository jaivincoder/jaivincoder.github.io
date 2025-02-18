import React, { createContext, useState, useContext } from 'react';

// Create a context to store mouse position
const MouseContext = createContext();

export const MouseProvider = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePosition({ x: clientX, y: clientY });
    };

    return (
        <MouseContext.Provider value={{ mousePosition, handleMouseMove }}>
            <div onMouseMove={handleMouseMove} style={{ height: '100vh', width: '100%' }}>
                {children}
            </div>
        </MouseContext.Provider>
    );
};

export const useMouse = () => useContext(MouseContext);
