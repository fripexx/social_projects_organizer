import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramLikes.module.scss";
import classNames from "classnames";
import ProfilePicture from "../Modules/ProfilePicture/ProfilePicture";
import firstIcon from "./Images/first-person.png";
import secondIcon from "./Images/second-person.png";
import thirdIcon from "./Images/third-person.png";

interface InstagramLikesProps {
    name: string,
    style?: CSSProperties,
    className?: string,
}

const InstagramLikes:FC<InstagramLikesProps> = ({name, className, style}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <div className={classes.profiles}>

                <ProfilePicture
                    src={firstIcon}
                    size={"calc(var(--width) / 20)"}
                    className={classes.logo}
                />

                <ProfilePicture
                    src={thirdIcon}
                    size={"calc(var(--width) / 20)"}
                    className={classes.logo}
                />

                <ProfilePicture
                    src={secondIcon}
                    size={"calc(var(--width) / 20)"}
                    className={classes.logo}
                />

            </div>

            <div className={classes.text}>
                Уподобали <strong>{name}</strong> і <strong>ще 1256</strong>
            </div>

        </div>
    );
};

export default InstagramLikes;