import { Fragment } from 'react';
import styles from './navbar.module.scss';

const Navbar = () => {

    return (
        <Fragment>
            <nav className={styles['nav']}>
                <div className={styles['logo-box'] + ' w-100 '}>
                    <p className={styles['logo'] + ' position-relative'}>
                        Jaivin Movaliya
                    </p>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar