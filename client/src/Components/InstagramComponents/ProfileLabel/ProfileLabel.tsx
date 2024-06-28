import React, {CSSProperties, FC} from 'react';
import classes from "./ProfileLabel.module.scss";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import classNames from "classnames";
import {ProfileType} from "../types/ProfileType";

interface ProfileLabelProps {
    profile: ProfileType,
    colabProfile?: ProfileType,
    location?: string,
    className?: string,
    style?: CSSProperties,
}

const ProfileLabel:FC<ProfileLabelProps> = ({profile, colabProfile, location, className, style}) => {
    const {name, picture} = profile;

    return (
        <div className={classNames(classes.profileInfo, className)} style={style} data-colab={!!colabProfile}>

            {!colabProfile &&
                <>
                    <ProfilePicture
                        className={classes.profilePicture}
                        src={picture}
                    />

                    <div className={classes.textInfo}>

                        <span className={classes.profileName}>{name}</span>

                        {location &&
                            <span className={classes.location}>{location}</span>
                        }

                    </div>
                </>
            }

            {colabProfile &&
                <>
                    <div className={classes.colabPictures}>

                        <ProfilePicture
                            className={classes.profilePicture}
                            src={picture}
                        />

                        <ProfilePicture
                            className={classNames(classes.profilePicture, classes.colabProfilePicture)}
                            src={colabProfile.picture}
                        />

                    </div>

                    <span className={classes.profileName}>{name} та<br/> {colabProfile.name}</span>

                </>
            }

        </div>
    );
};

export default ProfileLabel;