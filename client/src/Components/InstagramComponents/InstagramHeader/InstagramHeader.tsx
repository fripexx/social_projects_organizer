import React, {FC} from 'react';
import classes from "./InstagramHeader.module.scss";

interface InstagramHeaderProps {
    profileName: string;
}

const InstagramHeader:FC<InstagramHeaderProps> = ({profileName}) => {
    return (
        <div className={classes.container}>

            <svg className={classes.button} width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 10C0 10.3818 0.145996 10.7075 0.449219 10.9995L9.20898 19.5684C9.44482 19.8154 9.75928 19.939 10.1187 19.939C10.8486 19.939 11.4214 19.3774 11.4214 18.6362C11.4214 18.2769 11.2754 17.9512 11.0283 17.7041L3.1333 10L11.0283 2.2959C11.2754 2.0376 11.4214 1.71191 11.4214 1.35254C11.4214 0.622559 10.8486 0.0610352 10.1187 0.0610352C9.75928 0.0610352 9.44482 0.18457 9.20898 0.431641L0.449219 9.00049C0.145996 9.29248 0.0112305 9.61816 0 10Z"
                    fill="black"
                />
            </svg>

            <div className={classes.centerField}>

                <span className={classes.profileName}>
                    {profileName}
                </span>

                <span className={classes.label}>
                    Дописи
                </span>

            </div>

        </div>
    );
};

export default InstagramHeader;