import React, {FC} from 'react';
import classes from "./Message.module.scss";
import {MessageType} from "../../store/types/ChatTypes";
import {PhotoType} from "../../store/types/FileType";
import Logo from "../Logo/Logo";

interface MessageProps {
    message: MessageType;
    photo: PhotoType | null,
    isMessageCurrentUser?: boolean
}

const Message: FC<MessageProps> = ({message, photo, isMessageCurrentUser = false}) => {
    const {id, sender, content, files, isRead, timeSend, chat} = message;

    return (
        <div className={classes.container} data-is-current-user={isMessageCurrentUser}>

            <div className={classes.message}>

                {photo &&
                    <Logo photo={photo} size={34} showBorder={false}/>
                }

                <div className={classes.content}>
                    {content}
                </div>

            </div>

        </div>
    );
};

export default Message;