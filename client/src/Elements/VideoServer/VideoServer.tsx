import React, {forwardRef, VideoHTMLAttributes } from 'react';
import classNames from 'classnames';
import classes from './VideoServer.module.scss';

interface VideoServerProps extends VideoHTMLAttributes<HTMLVideoElement> {
    path: string;
    className?: string;
}

const VideoServer = forwardRef<HTMLVideoElement, VideoServerProps>(({ path, className, ...rest }, ref) => {
    return (
        <video
            ref={ref}
            className={classNames(classes.video, className)}
            src={`${process.env.REACT_APP_API_URL}/${path}`}
            {...rest}
        />
    );
});

export default VideoServer;