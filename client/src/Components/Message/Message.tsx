import React, {FC, useEffect, useState} from 'react';
import classes from "./Message.module.scss";
import {MessageType} from "../../store/types/MessageType";
import {PhotoType} from "../../store/types/FileType";
import Logo from "../Logo/Logo";

interface MessageProps {
    message: MessageType;
    photo: PhotoType | null,
    isMessageCurrentUser?: boolean
}

const Message: FC<MessageProps> = ({message, photo, isMessageCurrentUser = false}) => {
    const {id, sender, content, files, isRead, timeSend, chat} = message;
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const dateObj = new Date(timeSend);

        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const formattedTime = `${formattedHours}:${formattedMinutes}`;

        setTime(formattedTime);
    }, [time])

    return (
        <div className={classes.container} data-is-current-user={isMessageCurrentUser}>

            <div className={classes.message}>

                {photo &&
                    <Logo className={classes.logo} photo={photo} size={34} showBorder={false}/>
                }

                <div className={classes.content}>

                    <span>
                       {content}
                    </span>

                    <time className={classes.time}>
                        {time ? time : "00:00"}
                    </time>

                </div>

            </div>

        </div>
    );
};

export default Message;