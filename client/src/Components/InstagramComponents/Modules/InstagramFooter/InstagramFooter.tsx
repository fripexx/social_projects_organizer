import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramFooter.module.scss";
import ProfilePicture from "../../Modules/ProfilePicture/ProfilePicture";
import classNames from "classnames";
import {ReactSVG} from "react-svg";
import homeIcon from "../../images/home-icon.svg";
import searchIcon from "../../images/search-icon.svg";
import addIcon from "../../images/add-icon.svg";
import reelsIcon from "../../images/reels-icon.svg";

interface InstagramFooterProps {
    picture: string | null,
    isFooterOverlay?: boolean,
    style?: CSSProperties,
    className?: string,
}

const InstagramFooter: FC<InstagramFooterProps> = ({picture, isFooterOverlay = false, style, className}) => {
    return (
        <div className={classNames(classes.container, className)} data-footer-overlay={isFooterOverlay} style={style}>

            <ReactSVG src={homeIcon}/>

            <ReactSVG src={searchIcon}/>

            <ReactSVG src={addIcon}/>

            <ReactSVG src={reelsIcon}/>

            <ProfilePicture
                className={classes.profilePicture}
                src={picture}
                size={"calc(var(--width) / 15)"}
            />

        </div>
    );
};

export default InstagramFooter;