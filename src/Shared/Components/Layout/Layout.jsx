import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Routers from '../Routers/Routers';
import React, { useEffect, useState } from 'react';
import SpaceBackground from "../../SpaceBackground";


const Layout = () => {

    const [isBlackTheme, themeHandler] = useState(false)

    useEffect(() => {

        if (window.scrollY > 0) { themeHandler(true) }
        document.addEventListener('scroll', () => {
            if (window.scrollY === 0) { themeHandler(false) }
            else if (!isBlackTheme && window.scrollY > 0) { themeHandler(true) }
        });

    }, [])

    return (
        <div>
            <SpaceBackground />
            <Navbar />
            <Routers />
            <Footer />
        </div>
    )
}

export default Layout