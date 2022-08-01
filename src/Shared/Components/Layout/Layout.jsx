import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Routers from '../Routers/Routers';
import { useEffect, useState } from 'react';


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
        <div className={isBlackTheme ? 'black_theme' : 'white_theme'}>
            <Navbar />
            <Routers />
            <Footer />
        </div>
    )
}

export default Layout