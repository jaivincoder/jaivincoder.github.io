import styles from './home.module.scss';
import React from 'react';
import { useEffect, useState } from 'react';
import { imageGallery } from '../../Shared/Utility/constant';
import { LightgalleryItem, LightgalleryProvider } from "react-lightgallery";
import Sample from '../Sample/Sample';
import './home.css'

const Home = () => {

    const about = 'Hi, There';
    const about2 = 'I am Jaivin';
    const about3 = 'I am a full stack developer';
    const [aboutMe, setAboutMe] = useState([]);
    const [aboutMe2, setAboutMe2] = useState([]);
    const [aboutMe3, setAboutMe3] = useState([]);

    useEffect(() => {
        setAboutMe(about.split(''));
        setAboutMe2(about2.split(''));
        setAboutMe3(about3.split(''));
    }, []);

    var description = '';

    const shoudRedirect = (project) => {
        if (project.split('.')?.length > 1) {
            window.open(`https://${project}`, '_blank');
        }
    }

    return (
        <div className={`${styles['home']}`}>
            <section className={`${styles['main']} d-flex mt-5`}>
                <div className='d-flex main-low w-100 justify-content-around'>
                    <div>
                        <img src={'images/profile.jpg'} alt="..." className={`${styles["section-main-image"]}`} />
                    </div>
                    <div className='d-flex flex-column justify-content-center new-me'>
                        <div className="text-container">
                            {
                                aboutMe.length > 0 && aboutMe.map((data, index) => (
                                    <span key={index + Math.random()} style={{ animationDelay: `${((index + 1) * 0.2)}s` }}>{data}</span>
                                ))
                            }
                        </div>
                        <div className="text-container">
                            {
                                aboutMe2.length > 0 && aboutMe2.map((data, index) => (
                                    <span key={index + Math.random()} style={{ animationDelay: `${((index + 1) * 0.2)}s` }}>{data}</span>
                                ))
                            }
                        </div>
                        <div className="text-container">
                            {
                                aboutMe3.length > 0 && aboutMe3.map((data, index) => (
                                    <span key={Math.random() + index} style={{ animationDelay: `${((index + 1) * 0.2)}s` }}>{data}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section className='sec2 mt-5'>
                <Sample />
                <div className={`${styles['fiverr-main']}`} >
                    <img alt={'...'} src={'images/fiverr.png'} className={`${styles['fiverr']}`} />
                </div >
                <div className={`${styles['freelancing']} `}>
                    <h4>
                        This is my freelancing profile.I have been providing services of technologies shown in the image above on Fiverr.com. Within a reasonable amount of timespan, I managed to achieve a level 1 seller tag with 99.99% of positive feedback and a 100% of on-time project delivery status.
                    </h4>
                    FREELANCING PROFILE:-   <a style={{ textDecoration: 'underline' }} rel="noreferrer" href='https://www.fiverr.com/jaivinmovaliya?public_mode=true' target={'_blank'}>CLICK HERE TO CHECKOUT</a>
                </div>
            </section>
            <section className={`${styles['gallery']}`}>
                <h3 className={`${styles["section-heading"]} ${styles["main-color"]}  ${styles["f-3"]} `}>
                    Projects
                </h3>
                <p className={`${styles["section-description"]}  ${styles["f-2"]}`}>
                    I have worked on
                </p>
                {/* <LightGallery
                    speed={500}
                    download={false}
                    selector={'a'}
                    elementClassNames={`${styles['image-box']}`}
                >
                    {
                        Array.isArray(imageGallery) && imageGallery.map((image, i) => {
                            if (image.description) {
                                description = image.description;
                            }
                            return (
                                <React.Fragment key={i}>
                                    {imageGallery[i]?.project !== imageGallery[i - 1]?.project &&
                                        <div style={{ 'width': 'inherit' }} className={`text-center w-100  }`}>
                                            <div className={`  ${styles["title-font"]}  ${image.project.split('.')?.length > 1 ? styles["web"] : ''} ${image.project.split('.')?.length > 1 ? styles["cursor-pointer"] : ''}`} onClick={() => shoudRedirect(image.project)}>
                                                {image?.project}
                                            </div>
                                            {image.description &&
                                                <div className={`${styles["main-color"]} ${styles["description-font"]} `}>
                                                    {image.description}
                                                </div>
                                            }
                                        </div>

                                    }
                                    <a className={`${styles['image-cover']} ${imageGallery[i] !== imageGallery[i - 1] && 'mt-5'} d-block`} key={image.src} href={image.src}>
                                        <img alt={` ${description} Img-${i + 1}`} src={image.src} className={`${styles['image']}`} />
                                    </a>
                                </React.Fragment>
                            )
                        })
                    }
                </LightGallery> */}

                <LightgalleryProvider lightgallerySettings={{ download: false, speed: 500, thumbnail: false, zoom: false, fullScreen: false, dynamic: true, flipHorizontal: false, top: "47px" }} >
                    <div className={`${styles['image-box']}`}>
                        {
                            Array.isArray(imageGallery) && imageGallery.map((image, i) => {
                                if (image.description) {
                                    description = image.description;
                                }
                                return (
                                    <React.Fragment key={i}>
                                        {imageGallery[i]?.project !== imageGallery[i - 1]?.project &&
                                            <div style={{ 'width': 'inherit' }} className={`text-center w-100  }`}>
                                                <div className={`  ${styles["title-font"]}  ${image.project.split('.')?.length > 1 ? styles["web"] : ''} ${image.project.split('.')?.length > 1 ? styles["cursor-pointer"] : ''}`} onClick={() => shoudRedirect(image.project)}>
                                                    {image?.project}
                                                </div>
                                                {image.description &&
                                                    <div className={`${styles["main-color"]} ${styles["description-font"]} `}>
                                                        {image.description}
                                                    </div>
                                                }
                                            </div>

                                        }
                                        <div key={i} className={`${styles['image-cover']} ${imageGallery[i] !== imageGallery[i - 1] && 'mt-5'} d-block`} >
                                            <LightgalleryItem className={`${styles['image']}`} subHtml={`${description} Img-${i + 1}`} group={image.group} src={image.src}>
                                                <img alt={` ${description} Img-${i + 1}`} src={image.src} className={`${styles['image']}`} />
                                            </LightgalleryItem>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </LightgalleryProvider>

            </section>
            <section className='form-contact'>
                {/* <form >
                    <div className='form-group'>
                        <label htmlFor="email">Email*:</label>
                        <input type="email" placeholder='Email' onChange={(e) => onChangeEmail(e)} value={contactMeForm.email} id="email" name="email" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="phone">Phone:</label>
                        <input type="number" onChange={(e) => onChangeNumber(e)} placeholder='Phone(Optional)' value={contactMeForm.phone} id="phone" name="phone" />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="description*">Description:</label>
                        <textarea type="text" onChange={(e) => onChangeDescription(e)} placeholder='What is it about ?' id="description" value={contactMeForm.description} name="description" />
                    </div>
                    <div className='d-flex justify-content-center'>
                         <button className='submitButton' onClick={onSubmit}  name='submit' type='submit'>Submit</button>
                    </div>
                </form> */}
            </section>
        </div >
    )
}

export default Home;