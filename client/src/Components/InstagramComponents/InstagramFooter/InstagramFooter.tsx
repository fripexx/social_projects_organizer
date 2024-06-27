import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramFooter.module.scss";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import classNames from "classnames";

interface InstagramFooterProps {
    profilePicture: string | null,
    isFooterOverlay?: boolean,
    style?: CSSProperties,
    className?: string,
}

const InstagramFooter: FC<InstagramFooterProps> = ({profilePicture, isFooterOverlay = false, style, className}) => {
    return (
        <div className={classNames(classes.container, className)} data-footer-overlay={isFooterOverlay} style={style}>

            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.4767 11.5358V22H15.9998L15.9998 17C15.9998 14.7909 14.2089 13 11.9998 13C9.79065 13 7.99979 14.7909 7.99979 17V22H1.86133L1.86133 11.5358L11.169 2L20.4767 11.5358Z"
                    fill="var(--Color-SVG, #000)"
                />
                <path
                    d="M20.4767 22V22.5H20.9767V22H20.4767ZM20.4767 11.5358H20.9767V11.3322L20.8345 11.1865L20.4767 11.5358ZM15.9998 22H15.4998V22.5H15.9998V22ZM7.99979 22V22.5H8.49979V22H7.99979ZM1.86133 22H1.36133V22.5H1.86133V22ZM1.86133 11.5358L1.50352 11.1865L1.36133 11.3322V11.5358H1.86133ZM11.169 2L11.5268 1.65075L11.169 1.28418L10.8112 1.65075L11.169 2ZM20.9767 22V11.5358H19.9767V22H20.9767ZM15.9998 22.5H20.4767V21.5H15.9998V22.5ZM16.4998 22V17H15.4998L15.4998 22H16.4998ZM16.4998 17C16.4998 14.5147 14.4851 12.5 11.9998 12.5V13.5C13.9328 13.5 15.4998 15.067 15.4998 17H16.4998ZM11.9998 12.5C9.51451 12.5 7.49979 14.5147 7.49979 17H8.49979C8.49979 15.067 10.0668 13.5 11.9998 13.5V12.5ZM7.49979 17V22H8.49979V17H7.49979ZM1.86133 22.5H7.99979V21.5H1.86133V22.5ZM1.36133 11.5358L1.36133 22H2.36133L2.36133 11.5358H1.36133ZM10.8112 1.65075L1.50352 11.1865L2.21913 11.885L11.5268 2.34925L10.8112 1.65075ZM20.8345 11.1865L11.5268 1.65075L10.8112 2.34925L20.1189 11.885L20.8345 11.1865Z"
                    fill="var(--Color-SVG, #000)"
                />
            </svg>

            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.0345 10C17.0345 14.5354 13.6273 18.1 9.55759 18.1C5.48792 18.1 2.08066 14.5354 2.08066 10C2.08066 5.46459 5.48792 1.9 9.55759 1.9C13.6273 1.9 17.0345 5.46459 17.0345 10Z"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                />
                <path
                    d="M20.7272 22L15.1426 16"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>

            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                    x="2.36133"
                    y="2"
                    width="18.6154"
                    height="20"
                    rx="5"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                />
                <line
                    x1="11.8248"
                    y1="6.9"
                    x2="11.8248"
                    y2="17.1"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <line
                    x1="6.98496"
                    y1="11.8"
                    x2="16.3542"
                    y2="11.8"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>

            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.6848 14.3268C15.0074 14.5334 15.0074 15.0499 14.6848 15.2565L9.60276 18.5106C9.28009 18.7172 8.87676 18.459 8.87676 18.0457L8.87676 11.5376C8.87676 11.1244 9.28009 10.8661 9.60276 11.0727L14.6848 14.3268Z"
                    fill="var(--Color-SVG, #000)"
                />
                <path
                    d="M6.5 2L10.5 8"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                />
                <path
                    d="M13.5 2L17.5 8"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                />
                <rect
                    x="2.33066"
                    y="1.9"
                    width="18.6769"
                    height="20.2"
                    rx="5.1"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                />
                <path
                    d="M2.5 8L22.5 8"
                    stroke="var(--Color-SVG, #000)"
                    strokeWidth="1.8"
                />
            </svg>

            <ProfilePicture
                className={classes.profilePicture}
                src={profilePicture}
                size={"calc(var(--width) / 15)"}
            />

        </div>
    );
};

export default InstagramFooter;