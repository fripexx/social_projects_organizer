import React, {FC} from 'react';
import classes from "./InstagramLikes.module.scss";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import firstIcon from "./Images/first-person.png";
import secondIcon from "./Images/second-person.png";
import thirdIcon from "./Images/third-person.png";

interface InstagramLikesProps {
    profileName: string;

}

const InstagramLikes:FC<InstagramLikesProps> = ({profileName}) => {
    return (
        <div className={classes.container}>

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
                Уподобали <strong>{profileName}</strong> і <strong>ще 1256</strong>
            </div>

        </div>
    );
};

export default InstagramLikes;