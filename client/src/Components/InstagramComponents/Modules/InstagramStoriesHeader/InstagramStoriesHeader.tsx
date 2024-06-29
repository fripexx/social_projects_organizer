import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramStoriesHeader.module.scss";
import classNames from "classnames";
import ProfileLabel from "../ProfileLabel/ProfileLabel";
import InstagramStoriesPagination from "../InstagramStoriesPagination/InstagramStoriesPagination";
import {ProfileType} from "../../types/ProfileType";
import {ReactSVG} from "react-svg";
import crossIcon from "../../images/cross-icon.svg";
import dotsIcon from "../../images/dots-icon.svg";

interface InstagramStoriesHeaderProps {
    profile: ProfileType,
    colabProfile?: ProfileType,
    className?: string,
    style?: CSSProperties,
    progress?: number
}

const InstagramStoriesHeader:FC<InstagramStoriesHeaderProps> = ({profile, colabProfile, className, style, progress}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <InstagramStoriesPagination progress={progress}/>

            <div className={classes.content}>

                <div className={classes.userInfo}>

                    <ProfileLabel
                        profile={profile}
                        colabProfile={colabProfile}
                    />

                    <span className={classes.time}>6 год</span>

                </div>

                <div className={classes.buttons}>

                    <ReactSVG className={classes.dots} src={dotsIcon} width={"calc(var(--width) / 27)"}/>

                    <ReactSVG className={classes.cross} src={crossIcon}/>

                </div>

            </div>

        </div>
    );
};

export default InstagramStoriesHeader;