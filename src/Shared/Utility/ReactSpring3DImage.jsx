import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useMouse } from './MouseMovement'; // Import the mouse context

const Image3D = ({ src, alt }) => {
    const { mousePosition } = useMouse(); // Get the mouse position from context

    // Apply a spring animation based on the mouse position
    const style = useSpring({
        transform: `perspective(500px) rotateX(${(mousePosition.y / window.innerHeight) * 20}deg) rotateY(${(mousePosition.x / window.innerWidth) * 20}deg)`,
        config: { tension: 120, friction: 14 },
    });

    return (
        <animated.img
            src={src}
            alt={alt}
            style={{
                ...style,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                backgroundColor: 'transparent',
                overflow:'hidden'
            }}
        />
    );
};

export default Image3D;
