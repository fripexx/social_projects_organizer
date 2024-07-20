import React, {FC, ImgHTMLAttributes} from 'react';
import classNames from "classnames";
import classes from "./ImageServer.module.scss";

interface ImageServerProps extends ImgHTMLAttributes<HTMLImageElement> {
    path: string;
    className?: string;
}

const ImageServer:FC<ImageServerProps> = ({path, className, ...rest}) => {
    return (
        <img
            className={classNames(classes.image, className)}
            src={`${process.env.REACT_APP_API_URL}/${path}`}
            {...rest}
        />
    );
};

export default ImageServer;