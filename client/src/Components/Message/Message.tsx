import React, {FC, useEffect, useState} from 'react';
import classes from "./Message.module.scss";
import {MessageType} from "../../store/types/MessageType";
import {PhotoType} from "../../store/types/FileType";
import Logo from "../Logo/Logo";
import MessageFile from "./Components/MessageFile/MessageFile";
import {setFilesInSlider, setActiveIndexSlider} from "../../store/reducers/UISlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {ReactSVG} from "react-svg";
import dotsLoaderIcon from "../../assets/images/dots-loader.svg";

interface MessageProps {
    message: MessageType;
    photo: PhotoType | null,
    isMessageCurrentUser?: boolean,
    isPending?: boolean,
}

const Message: FC<MessageProps> = ({message, photo, isMessageCurrentUser = false, isPending = false}) => {
    const dispatch = useAppDispatch()
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

    const openFile = (fileId: string) => {
        const filterFiles = files.filter(file => file.type === "image" || file.type === "video")
        let activeIndex = 0

        filterFiles.find((file, index) => file.id === fileId ? activeIndex = index : activeIndex = 0)

        dispatch(setActiveIndexSlider(activeIndex))
        dispatch(setFilesInSlider(filterFiles))
    }

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

                    {files.length !== 0 &&
                        <div className={classes.files}>

                            {files.map(file => {
                                return (
                                    <MessageFile
                                        key={file.id}
                                        file={file}
                                        openHandler={openFile}
                                    />
                                )
                            })}

                        </div>
                    }

                    {isPending ? (
                        <div className={classes.loader}>
                            <ReactSVG src={dotsLoaderIcon}/>
                        </div>
                    ) : (
                        <time className={classes.time}>
                            {time || "00:00"}
                        </time>
                    )}

                </div>

            </div>

        </div>
    );
};

export default Message;