import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramStoriesHeader.module.scss";
import classNames from "classnames";
import ProfileLabel from "../ProfileLabel/ProfileLabel";
import InstagramStoriesPagination from "../InstagramStoriesPagination/InstagramStoriesPagination";
import {ProfileType} from "../types/ProfileType";

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

                    <svg className={classes.dots} width="15" height="4" viewBox="0 0 15 4" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="3" height="3" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                        <rect width="3" height="3" x="6" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                        <rect width="3" height="3" x="12" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                    </svg>

                    <svg className={classes.cross} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line
                            x1="21.4995"
                            y1="3.41232"
                            x2="2.97331"
                            y2="21.9385"
                            stroke={"var(--Color-SVG, #000)"}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <line
                            x1="2.97332"
                            y1="3.93942"
                            x2="21.4995"
                            y2="22.4656"
                            stroke={"var(--Color-SVG, #000)"}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>


                </div>

            </div>


        </div>
    );
};

export default InstagramStoriesHeader;