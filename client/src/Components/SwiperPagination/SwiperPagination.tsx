import React, { forwardRef, Ref } from 'react';
import classes from "./SwiperPagination.module.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import classNames from "classnames";

interface SwiperPaginationProps {
    className?: string;
}

const SwiperPagination = forwardRef<HTMLDivElement, SwiperPaginationProps>(({ className }, ref: Ref<HTMLDivElement>) => {
    return (
        <div
            ref={ref}
            className={classNames(classes.pagination, className)}
        />
    );
});

export default SwiperPagination;