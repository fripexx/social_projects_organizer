import React, {FC, useEffect, useState, useRef} from 'react';
import classes from "./Message.module.scss";
import {MessageType} from "../../store/types/MessageType";
import {PhotoType} from "../../store/types/FileType";
import Logo from "../Logo/Logo";
import MessageFile from "./Components/MessageFile/MessageFile";
import {setFilesInSlider, setActiveIndexSlider} from "../../store/reducers/UISlice";
import {useAppDispatch} from "../../store/hooks/redux";
import {ReactSVG} from "react-svg";
import dotsLoaderIcon from "../../assets/images/dots-loader.svg";
import messageReadIcon from "../../assets/images/message-read.svg";
import {UserType} from "../../store/types/UserType";

interface MessageProps {
    message: MessageType;
    photo: PhotoType | null,
    senderName?: string,
    isMessageCurrentUser?: boolean,
    isPending?: boolean,
    readCallback?: (messageId: string) => void,
    currentUser: UserType
}

const Message: FC<MessageProps> = ({message, photo, readCallback, isMessageCurrentUser = false, currentUser, isPending = false, senderName = ""}) => {
    const dispatch = useAppDispatch()
    const {id, sender, content, files, timeSend, readBy, chat} = message;
    const [time, setTime] = useState<string | null>(null);
    const [isRead, setIsRead] = useState<boolean>(false);
    const messageRef = useRef<HTMLDivElement>(null);

    const openFile = (fileId: string) => {
        const filterFiles = files.filter(file => file.type === "image" || file.type === "video")
        let activeIndex = 0

        filterFiles.find((file, index) => file.id === fileId ? activeIndex = index : activeIndex = 0)

        dispatch(setActiveIndexSlider(activeIndex))
        dispatch(setFilesInSlider(filterFiles))
    }

    useEffect(() => {
        const dateObj = new Date(timeSend);

        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const formattedTime = `${formattedHours}:${formattedMinutes}`;

        setTime(formattedTime);
    }, [time])
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (
                        entry.isIntersecting &&
                        readCallback &&
                        !isMessageCurrentUser &&
                        !readBy.includes(currentUser.id)
                    ) {
                        readCallback(id)
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (messageRef.current) observer.observe(messageRef.current);

        return () => {
            if (messageRef.current) observer.unobserve(messageRef.current);
        };
    }, [id]);
    useEffect(() => {
        if(readBy.length !== 0) setIsRead(true)
    }, [readBy]);


    return (
        <div className={classes.container} data-is-current-user={isMessageCurrentUser} ref={messageRef}>

            <div className={classes.message}>

                <Logo
                    className={classes.logo}
                    photo={photo}
                    size={34}
                    showBorder={false}
                    title={senderName}
                />

                <div className={classes.content}>

                    <span>{content}</span>

                    {files.length !== 0 &&
                        <div className={classes.files} data-grid-column={files.length < 3 ? files.length : 3}>

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

                    <div className={classes.footer}>

                        {isPending ? (
                            <div className={classes.loader}>
                                <ReactSVG src={dotsLoaderIcon}/>
                            </div>
                        ) : (
                            <time className={classes.time}>
                                {time || "00:00"}
                            </time>
                        )}

                        {isMessageCurrentUser &&
                            <ReactSVG
                                className={classes.isRead}
                                wrapper={"span"}
                                src={messageReadIcon}
                                data-is-read={isRead}
                            />
                        }

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Message;