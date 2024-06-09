import React, {FC, useState, useRef, useEffect} from 'react';
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
import ModalUploadFile from "../Modals/ModalUploadFile/ModalUploadFile";
import {PreviewFileType} from "../PreviewFile/PreviewFile";
import Backdrop from "../Backdrop/Backdrop";
import ChatMediaUpload from "./Components/ChatMediaUpload/ChatMediaUpload";

interface ChatProps {
    chat: string;
    model: string;
    team: BasicUserInfo[],
    currentUser: UserType
}

const Chat:FC<ChatProps> = ({chat, model, team, currentUser}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [sendMessage, setSendMessage] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showUploadModalState, setShowUploadModal] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
    const [loadMore, setLoadMore] = useState<boolean>(false)

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
            socket.emit('sendMessage', {
                chat,
                model,
                content: sendMessage,
                files: []
            });

            setSendMessage('');
            setShowEmojiPicker(false);
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
        setShowUploadModal(false);
    }

    useEffect(() => {
        const newSocket = ioServer();

        setSocket(newSocket);

        newSocket.on('connect', () => {
            newSocket.emit('joinChat', {chat, model});
            newSocket.emit('getMessages', {chat, model});
        });

        newSocket.on('getMessages', (messages: MessageType[]) => {
            setChatMessages(messages);
        });

        newSocket.on('loadMessages', (messages: MessageType[]) => {
            setChatMessages(prevState => [...prevState, ...messages]);
            setLoadMore(false);
        });

        newSocket.on('newMessage', (message: MessageType) => {
            setChatMessages((prevMessages) => [message, ...prevMessages, ]);
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
                if(invertScrollTop === 0 && !loadMore) {
                    setLoadMore(true);
                }
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
                        {chatMessages.map((message) => {
                            const teamUser = team.find(user => user.id === message.sender);
                            return (
                                <Message
                                    key={message.id}
                                    message={message}
                                    photo={teamUser ? teamUser.photo : null}
                                    isMessageCurrentUser={message.sender === currentUser.id}
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

                <div className={classes.footerContainer}>

                    <textarea
                        placeholder={"Написати повідомлення..."}
                        className={classes.sendMessageField}
                        value={sendMessage}
                        onChange={changeSendMessage}
                    />

                    <div className={classes.sendMessageFieldButtons}>

                        <button className={classes.emojiButton} onClick={toggleEmojiPicker} data-active={showEmojiPicker}>
                            <ReactSVG src={emojiIcon}/>
                        </button>

                        <button className={classes.addedButton} onClick={showUploadModal} data-active={showUploadModalState}>
                            <ReactSVG src={paperClipIcon}/>
                        </button>

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