import React, {CSSProperties, FC} from 'react';
import classes from "./ProfilePicture.module.scss";
import classNames from "classnames";
import noImage from "./Images/no-image.jpg";

interface ProfilePictureProps {
    className?: string;
    src?: string | null;
    size?: string | number;
}

const ProfilePicture: FC<ProfilePictureProps> = ({className, src, size}) => {
    return (
        <div
            className={classNames(classes.container, className)}
            style={{"--size": size} as CSSProperties}
        >

            {src &&
                <img
                    decoding={"async"}
                    loading={"lazy"}
                    className={classes.picture}
                    src={src}
                    alt={""}
                />
            }

            {src === null &&
                <img
                    decoding={"async"}
                    loading={"lazy"}
                    className={classes.picture}
                    src={noImage}
                    alt={""}
                />
            }

        </div>

    );
};

export default ProfilePicture;