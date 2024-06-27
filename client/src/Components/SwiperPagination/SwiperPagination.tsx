import React, {FC} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import classes from "./SwiperPagination.module.scss";
import classNames from "classnames";

interface SwiperPaginationProps {
    paginationRef: React.RefObject<HTMLDivElement>,
    className?: string
}

const SwiperPagination:FC<SwiperPaginationProps> = ({paginationRef, className}) => {
    return (
        <div
            className={classNames(classes.pagination, className)}
            ref={paginationRef}
        />
    );
};

export default SwiperPagination;