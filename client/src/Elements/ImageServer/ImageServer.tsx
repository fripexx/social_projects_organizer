import React, {forwardRef, ImgHTMLAttributes} from 'react';
import classNames from "classnames";
import classes from "./ImageServer.module.scss";

interface ImageServerProps extends ImgHTMLAttributes<HTMLImageElement> {
    path: string;
    className?: string;
}

const ImageServer = forwardRef<HTMLImageElement, ImageServerProps>(({path, className, ...rest}, ref) => {
    return (
        <img
            ref={ref}
            className={classNames(classes.image, className)}
            src={`${process.env.REACT_APP_API_URL}/${path}`}
            {...rest}
        />
    );
});

export default ImageServer;