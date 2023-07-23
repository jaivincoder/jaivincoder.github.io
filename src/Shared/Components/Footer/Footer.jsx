import styles from './footer.module.scss';
import moment from 'moment';
import { Fragment } from 'react';
const Footer = () => {

    return (
        <Fragment>
            <footer className={styles['footer']}>
                <div className="row m-auto" style={{ width: '60%' }}>
                    <div style={{display: 'none'}} className="col-md-6 justify-content-center">
                        <div>
                            <h6 className={styles['list-heading']}>Contact Me</h6>
                            <ul className={`${styles['footer-list']} ${styles['cursor-none-list']}`}>
                                <li className={`${styles['list-item']}`}>

                                </li>
                                <li className={`${styles['list-item']}`}>
                                    {/* Phone : +91-1234567891 */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 justify-content-center d-md-flex">
                        <div className='text-center'>
                            <h6 className={styles['list-heading']}>Profiles</h6>
                            <div className={`${styles['footer-list']} d-flex justify-content-center`}>
                                <a role={'button'} rel="noreferrer" style={{ marginRight: '20px', display:'contents' }} target={'_blank'} href="https://www.fiverr.com/jaivinmovaliya?public_mode=true">
                                    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200" cy="200" fill="#00b22d" r="200" /><g fill="#fff"><path d="M364.4 162.7c0-6.6-5.2-12-11.8-12-6.4 0-11.7 5.3-11.7 12 0 6.6 5.2 12 11.7 12 6.6.1 11.8-5.3 11.8-12zm-11.8 8.7c-4.5 0-8-3.8-8-8.7 0-4.8 3.5-8.6 8-8.6 4.6 0 8.2 3.8 8.2 8.6 0 4.9-3.6 8.7-8.2 8.7z" /><path d="M355.8 163.7c.6-.2 1.9-1.1 1.9-3 0-2.3-1.5-3.7-4-3.7h-5.3v11.3h3.5v-3.8h.9l1.6 3.8h3.8l-2.1-3.9c-.2-.6-.3-.7-.3-.7zm-3-1.6h-.9v-2.7h.9c.8 0 1.2.4 1.2 1.3.1.9-.4 1.4-1.2 1.4z" /><circle cx="104.6" cy="163" r="9" /><path d="M114 177.9H72.8v-2.7c0-5.3 5.3-5.4 8-5.4 3.1 0 4.5.3 4.5.3v-14.6s-2.8-.4-6.6-.4c-8.6 0-24.5 2.4-24.5 20.6v2.3h-7.5v13.5h7.5V220h-7v13.5H81V220h-8.2v-28.5h22.5V220h-7v13.5H121V220h-7zm70 0h-29.5v13.5h5l-6.4 20c-1.2 3.3-1.5 7.3-1.5 7.3h-.4s-.3-4-1.5-7.3l-6.4-20h5v-13.5h-29.5v13.5h6.2l15.4 42h22l15.4-42h6.2zm54.6 25.5c0-15.4-9.3-26.8-25.8-26.8-17.9 0-28.9 12.7-28.9 29 0 14.8 10.7 29.1 30.5 29.1 15 0 23.9-7.8 23.9-7.8l-6.8-12.9s-7.4 5.3-15.6 5.3c-5.9 0-11.5-3.1-12.9-10.2h35.2c-.1-.1.4-3.9.4-5.7zm-35.2-4.6c1-4.3 3.6-8.2 8.9-8.2 4.1 0 7 3.8 7 8.2zm114.1-8.1h-.2s.2-1.1.2-2.8V185c0-5.1-2.8-7.1-7.9-7.1h-17.5v13.5h5.2c1.5 0 2.4.9 2.4 2.4V220h-7.5v13.5h33.7V220h-7.5v-8.1c0-10.1 5-16.7 15.3-16.7 2.3 0 3.8.3 3.8.3v-18.3s-1.1-.2-2.2-.2c-8.4-.1-15.4 6.1-17.8 13.7zm-49.3 0h-.2s.2-1.1.2-2.8V185c0-5.1-2.8-7.1-7.9-7.1h-17.5v13.5h5.2c1.5 0 2.4.9 2.4 2.4V220h-7.5v13.5h33.7V220h-7.5v-8.1c0-10.1 5-16.7 15.3-16.7 2.3 0 3.8.3 3.8.3v-18.3s-1.1-.2-2.2-.2c-8.5-.1-15.5 6.1-17.8 13.7z" /></g></svg>
                                </a>
                                <a role={'button'} rel="noreferrer" href="#" target={'_blank'}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="blue" className="bi bi-linkedin" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                    </svg> */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className={`${styles['terms-and-condition-box']}`}>
                <p className={`${styles['text']}`}>
                    {
                        moment().format('MMMM Do YYYY') + ' , ' + moment().format('dddd') + ' , ' + moment().format('hh:mm A')
                    }
                </p>
                <div className={`${styles['text-box']}`}>
                    <p style={{ textDecoration: 'none' }} className={`${styles['text']}`}>
                        <span><span className="text-animation">Made with</span><span style={{color:'red'}}> ♥ </span> <span className="text-animation">by Jaivin Movaliya</span></span>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer;
