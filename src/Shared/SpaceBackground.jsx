import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SpaceBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Stars Geometry
        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 5000;
        const starVertices = [];
        const starColors = [];

        for (let i = 0; i < starCount; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);
            starVertices.push(x, y, z);

            // Generate random colors for each star
            starColors.push(Math.random(), Math.random(), Math.random());
        }

        starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
        starsGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

        const starsMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            size: 3, // Adjust the size of the stars
            sizeAttenuation: true,
            map: new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/circle.png"),
            transparent: true,
        });

        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        camera.position.z = 5;

        // Animation Function
        const animate = () => {
            requestAnimationFrame(animate);
            starField.rotation.y += 0.002;
            starField.rotation.x += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup function
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            starsGeometry.dispose();
            starsMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "fixed", // Stays in the background
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -44, // Behind all other elements
                overflow: "hidden",
            }}
        />
    );
};

export default SpaceBackground;
