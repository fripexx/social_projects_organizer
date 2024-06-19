import React, {FC, useEffect, useRef, useState} from 'react';
import classes from "./FilesSlider.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import {FileType, PhotoType} from "../../store/types/FileType";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Zoom} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface FilesSliderProps {
    files: (FileType | PhotoType)[],
    show: boolean,
    activeSlide?: number,
    closeCallback: () => void,
}

const FilesSlider:FC<FilesSliderProps> = ({files, show, activeSlide = 0, closeCallback}) => {
    const swiperRef = useRef<any>(null);

    const handleClickContainer = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.tagName !== 'IMG' && target.tagName !== 'VIDEO') closeCallback();
    };
    const handleClickCloseButton = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        closeCallback()
    }

    useEffect(() => {
        const swiper = swiperRef.current?.swiper
        if (swiper) swiper.slideTo(activeSlide, 0);
    }, [activeSlide]);

    return (
        <Backdrop isOpen={show} clickCallback={closeCallback} className={classes.backdrop}>

            <div onClick={handleClickContainer} className={classes.container} data-show={show}>

                <header className={classes.header}>

                    <div className={classes.close} onClick={handleClickCloseButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 490 490"><polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/></svg>
                    </div>

                </header>

                <Swiper
                    ref={swiperRef}
                    className={classes.swiper}
                    slidesPerView={1}
                    spaceBetween={15}
                    modules={[Zoom, Pagination]}
                    zoom={true}
                    pagination={{clickable: true}}

                >
                    {files.map(file => {
                        return (
                            <SwiperSlide key={file.id} className={classes.slide}>

                                {file.type === "image" &&
                                    <div className={"swiper-zoom-container"}>
                                        <img
                                            className={classes.image}
                                            loading={"lazy"}
                                            decoding={"async"}
                                            src={`${process.env.REACT_APP_API_URL}/${file.path}`}
                                            alt={file.name}
                                            title={file.name}
                                        />
                                    </div>
                                }

                                {file.type === "video" &&
                                    <video controls className={classes.video}>
                                        <source
                                            src={`${process.env.REACT_APP_API_URL}/${file.path}`}
                                            type={file.mimetype}
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                }

                            </SwiperSlide>
                        )
                    })}
                </Swiper>

            </div>

        </Backdrop>
    );
};

export default FilesSlider;