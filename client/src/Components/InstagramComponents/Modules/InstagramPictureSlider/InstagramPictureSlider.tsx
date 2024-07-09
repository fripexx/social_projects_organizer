import React, {FC, useRef} from 'react';
import classes from "./InstagramPictureSlider.module.scss";
import pictureNotImage from "../../images/not-found-image.svg"
import {FileType, PhotoType} from "../../../../store/types/FileType";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export type AspectRatio = '1.91/1' | '1/1' | '4/5';

interface InstagramPictureSliderProps {
    media: (FileType | PhotoType)[],
    paginationRef: React.RefObject<HTMLDivElement>,
    aspectRatio?: AspectRatio
}

const InstagramPictureSlider: FC<InstagramPictureSliderProps> = ({media, paginationRef, aspectRatio = '1/1'}) => {
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
                        src={`${process.env.REACT_APP_API_URL}/${mediaItem.path}`}
                        alt={""}
                        style={{aspectRatio}}
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