import React, {FC, useEffect, useRef, useState} from 'react';
import classes from "./Chat.module.scss";
import emojiIcon from "../../assets/images/emoji-icon.svg";
import paperClipIcon from "../../assets/images/paper-clip-icon.svg";
import dotsLoaderIcon from "../../assets/images/dots-loader.svg";
import {ReactSVG} from "react-svg";
import {MessageType} from "../../store/types/MessageType";
import {BasicUserInfo, UserType} from "../../store/types/UserType";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import Message from "../Message/Message";
import {Socket} from 'socket.io-client';
import ioServer from "../../api/ioServer";
import PreviewFile, {PreviewFileType} from "../PreviewFile/PreviewFile";
import ChatMediaUpload from "./Components/ChatMediaUpload/ChatMediaUpload";
import {useAppDispatch} from "../../store/hooks/redux";
import {sendMessage as sendMessageThunk} from "../../store/thunks/ChatThunks";
import {v4 as uuid} from "uuid";

interface ChatProps {
    chat: string,
    model: "Project" | "Post",
    team: BasicUserInfo[],
    currentUser: UserType,
    unreadCallback?: (count: number) => void
}

const Chat:FC<ChatProps> = ({chat, model, team, currentUser, unreadCallback}) => {
    const dispatch = useAppDispatch()
    const [socket, setSocket] = useState<Socket | null>(null);
    const [sendMessage, setSendMessage] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showUploadModalState, setShowUploadModal] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
    const [loadMore, setLoadMore] = useState<boolean>(false)
    const [files, setFiles] = useState<PreviewFileType[]>([]);
    const [pendingMessage, setPendingMessage] = useState<MessageType | null>(null);
    const mainRef = useRef<HTMLTextAreaElement>(null);

    const changeSendMessage = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setSendMessage(e.target.value);
    }
    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setSendMessage((prevState) => prevState + emojiObject.emoji);
    };
    const toggleEmojiPicker = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEmojiPicker(prevState => !prevState);
    }
    const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (socket) {
            const formData = new FormData();

            formData.append("chat", chat);
            formData.append("model", model);
            formData.append("content", sendMessage.trim());

            for (const file of files) formData.append("chatFiles", file.fileBlob);

            const previewMessage = {
                id: uuid(),
                chat,
                sender: currentUser.id,
                content: sendMessage,
                readBy: [],
                timeSend: new Date(),
                files: [],
            }
            setPendingMessage(previewMessage);
            dispatch(sendMessageThunk(formData));
            setSendMessage('');
            setShowEmojiPicker(false);
            setFiles([])
        }
    }
    const showUploadModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowUploadModal(true);
    }
    const hideUploadModal = (): void => {
        setShowUploadModal(false);
    }
    const addUploadCallback = (addFiles: PreviewFileType[]): void => {
        setFiles(addFiles);
        setShowUploadModal(false);
    }
    const removeFileCallback = (removeId: string) => {
        setFiles(prevState => [...prevState].filter(file => file.id !== removeId));
    }
    const readCallback = (messageId: string) => {
        if (socket) socket.emit('readMessage', {messageId, chat, model});
    }

    useEffect(() => {
        const newSocket = ioServer();

        setSocket(newSocket);

        newSocket.on('connect', () => {
            newSocket.emit('joinChat', {chat, model});
            newSocket.emit('getMessages', {chat, model});
            newSocket.emit('getUnreadMessages', {chat, model});
        });

        newSocket.on('getMessages', (messages: MessageType[]) => {
            setChatMessages(messages);
        });

        newSocket.on('setUnreadMessages', (unreadCount: number) => {
            if(unreadCallback) unreadCallback(unreadCount);
            newSocket.emit('getUnreadMessages', {chat, model});

        });

        newSocket.on('loadMessages', (messages: MessageType[]) => {
            setChatMessages(prevState => [...prevState, ...messages]);
            setLoadMore(false)
        });

        newSocket.on('messageIsRead', (readMessage: MessageType) => {
            setTimeout(() => {
                setChatMessages(prevState => {
                    return [...prevState].map(message => {
                        if(message.id === readMessage.id){
                            return {...message, readBy: readMessage.readBy}
                        }
                        return message
                    });
                });
                newSocket.emit('getUnreadMessages', {chat, model});
            }, 1000)
        });

        newSocket.on('newMessage', (message: MessageType) => {
            setPendingMessage(null)
            setChatMessages((prevMessages) => [message, ...prevMessages]);
            newSocket.emit('getUnreadMessages', {chat, model});
        });

        newSocket.on('disconnect', () => {});

        return () => {
            newSocket.disconnect();
        };
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            if (mainRef.current && mainRef.current.scrollTop) {
                const invertScrollTop = mainRef.current.scrollHeight - mainRef.current.clientHeight + mainRef.current.scrollTop;

                if(invertScrollTop < 30 && !loadMore) setLoadMore(true);
            }
        };

        if (mainRef.current)  mainRef.current.addEventListener('scroll', handleScroll);

        return () => {
            if (mainRef.current) mainRef.current.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if(loadMore && socket) socket.emit('loadMessages', {chat, model, skip: chatMessages.length});
    }, [loadMore]);

    return (
        <div className={classes.chat}>

            <main className={classes.main} ref={mainRef}>

                {chatMessages.length > 0 ? (
                    <>
                        {pendingMessage &&
                            <Message
                                key={pendingMessage.id}
                                message={pendingMessage}
                                photo={currentUser.photo}
                                isMessageCurrentUser={true}
                                isPending={true}
                                currentUser={currentUser}
                            />
                        }

                        {chatMessages.map((message) => {
                            const teamUser = team.find(user => user.id === message.sender);
                            return (
                                <Message
                                    key={message.id}
                                    message={message}
                                    photo={teamUser ? teamUser.photo : null}
                                    senderName={teamUser ? `${teamUser.name} ${teamUser.surname}` : ""}
                                    isMessageCurrentUser={message.sender === currentUser.id}
                                    readCallback={readCallback}
                                    currentUser={currentUser}
                                />
                            )
                        })}

                        <div className={classes.loader} data-show={loadMore}>
                            <ReactSVG src={dotsLoaderIcon}/>
                        </div>
                    </>

                ) : (
                    <div className={classes.noMessage}>
                        Тут ще немає повідомлень
                    </div>
                )}

            </main>

            <footer className={classes.footer}>

                {files.length !== 0 &&
                    <div className={classes.previewFiles}>
                        {files.map(file => {
                            return (
                                <PreviewFile
                                    key={file.id}
                                    removeCallback={removeFileCallback}
                                    file={file}
                                />
                            )
                        })}

                    </div>
                }

                <div className={classes.footerContainer}>

                    <textarea
                        placeholder={"Написати повідомлення..."}
                        className={classes.sendMessageField}
                        value={sendMessage}
                        onChange={changeSendMessage}
                    />

                    <div className={classes.sendMessageFieldButtons}>

                        <div className={classes.iconButtons}>

                            <button className={classes.emojiButton} onClick={toggleEmojiPicker}
                                    data-active={showEmojiPicker}>
                                <ReactSVG src={emojiIcon}/>
                            </button>

                            <button className={classes.addedButton} onClick={showUploadModal}
                                    data-active={showUploadModalState}>
                                <ReactSVG src={paperClipIcon}/>
                            </button>

                        </div>

                        <button className={classes.sendButton} onClick={handleSendMessage}>
                            Надіслати
                        </button>

                    </div>

                </div>

                <EmojiPicker
                    open={showEmojiPicker}
                    className={classes.emojiPicker}
                    onEmojiClick={onEmojiClick}
                />

            </footer>

            <ChatMediaUpload
                show={showUploadModalState}
                hideCallback={hideUploadModal}
                uploadCallback={addUploadCallback}
            />

        </div>
    );
};

export default Chat;