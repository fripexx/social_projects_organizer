import React, {FC, useRef} from 'react';
import classes from "./InstagramPictureSlider.module.scss";
import pictureNotImage from "../../images/not-found-image.svg"
import {FileType, PhotoType} from "../../../../store/types/FileType";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface InstagramPictureSliderProps {
    media: (FileType | PhotoType)[],
    paginationRef: React.RefObject<HTMLDivElement>
}

const InstagramPictureSlider: FC<InstagramPictureSliderProps> = ({media, paginationRef}) => {
    const swiperRef = useRef<SwiperRef>(null);

    return (
        <Swiper
            ref={swiperRef}
            className={classes.swiper}
            slidesPerView={1}
            spaceBetween={0}
            modules={[Pagination]}
            pagination={{
                dynamicBullets: true,
                el: paginationRef.current
            }}
        >

            {media.map((mediaItem) => (
                <SwiperSlide key={mediaItem.id} className={classes.swiperSlide}>
                    <img
                        decoding={"async"}
                        loading={"lazy"}
                        className={classes.media}
                        src={mediaItem.path}
                        alt={""}
                    />
                </SwiperSlide>
            ))}

            {media.length === 0 &&
                <SwiperSlide className={classes.swiperSlide}>
                    <img
                        decoding={"async"}
                        loading={"lazy"}
                        className={classes.media}
                        src={pictureNotImage}
                        alt={""}
                    />
                </SwiperSlide>
            }

        </Swiper>
    );
};

export default InstagramPictureSlider;