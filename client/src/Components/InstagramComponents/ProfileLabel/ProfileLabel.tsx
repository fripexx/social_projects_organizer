import React, {CSSProperties, FC} from 'react';
import classes from "./ProfileLabel.module.scss";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import classNames from "classnames";

interface ProfileLabelProps {
    profileName: string,
    profilePicture: string | null,
    colabProfileName?: string,
    colabProfilePicture?: string | null,
    location?: string,
    className?: string,
    style?: CSSProperties,
}

const ProfileLabel:FC<ProfileLabelProps> = ({profileName, profilePicture, location, className, style, colabProfileName, colabProfilePicture}) => {
    return (
        <div className={classNames(classes.profileInfo, className)} style={style} data-colab={!!colabProfileName}>

            {!colabProfileName &&
                <>
                    <ProfilePicture
                        className={classes.profilePicture}
                        src={profilePicture}
                    />

                    <div className={classes.textInfo}>

                        <span className={classes.profileName}>{profileName}</span>

                        {location &&
                            <span className={classes.location}>{location}</span>
                        }

                    </div>
                </>
            }

            {colabProfileName &&
                <>
                    <div className={classes.colabPictures}>

                        <ProfilePicture
                            className={classes.profilePicture}
                            src={profilePicture}
                        />

                        <ProfilePicture
                            className={classNames(classes.profilePicture, classes.colabProfilePicture)}
                            src={colabProfilePicture}
                        />

                    </div>

                    <span className={classes.profileName}>{profileName} та<br/> {colabProfileName}</span>

                </>
            }

        </div>
    );
};

export default ProfileLabel;