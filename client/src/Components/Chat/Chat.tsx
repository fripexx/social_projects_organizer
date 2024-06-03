import React, {FC, useState, useRef, useEffect} from 'react';
import classes from "./Chat.module.scss";
import emojiIcon from "../../assets/images/emoji-icon.svg";
import paperClipIcon from "../../assets/images/paper-clip-icon.svg";
import {ReactSVG} from "react-svg";
import {MessageType} from "../../store/types/MessageType";
import {BasicUserInfo, UserType} from "../../store/types/UserType";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import Message from "../Message/Message";
import {Socket} from 'socket.io-client';
import ioServer from "../../axios/ioServer";

interface ChatProps {
    chat: string;
    model: string;
    team: BasicUserInfo[],
    currentUser: UserType
}

const Chat:FC<ChatProps> = ({chat, model, team, currentUser}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [sendMessage, setSendMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
    const [scrollToBottom, setScrollToBottom] = useState<boolean>(false)

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

    useEffect(() => {
        const newSocket = ioServer();

        setSocket(newSocket);

        newSocket.on('connect', () => {
            newSocket.emit('joinChat', {chat, model});
            newSocket.emit('getMessages', {chat, model});
        });

        newSocket.on('loadMessages', (messages: MessageType[]) => {
            setChatMessages(messages);
            setScrollToBottom(true)
        });
        newSocket.on('newMessage', (message: MessageType) => {
            setChatMessages((prevMessages) => [message, ...prevMessages, ]);
            setScrollToBottom(true)
        });

        newSocket.on('disconnect', () => {});

        return () => {
            newSocket.disconnect();
        };
    }, []);
    useEffect(() => {
        if(mainRef.current && scrollToBottom) {
            const scrollTop = mainRef.current.scrollTop;
            const scrollHeight = mainRef.current.scrollHeight;
            const clientHeight = mainRef.current.clientHeight;

            if(scrollHeight - clientHeight != scrollTop) {
                mainRef.current.scrollTop = scrollHeight - clientHeight;
                setScrollToBottom(false);
            }
        }
    }, [scrollToBottom]);

    return (
        <div className={classes.chat}>

            <main className={classes.main} ref={mainRef}>

                <div className={classes.messages}>

                    {chatMessages.length > 0 &&
                        chatMessages.map((message) => {
                            const teamUser = team.find(user => user.id === message.sender);
                            return (
                                <Message
                                    key={message.id}
                                    message={message}
                                    photo={teamUser ? teamUser.photo : null}
                                    isMessageCurrentUser={message.sender === currentUser.id}
                                />
                            )
                        })
                    }

                    {chatMessages.length === 0 &&
                        <div className={classes.noMessage}>
                            Тут ще немає повідомлень
                        </div>
                    }

                </div>

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

                        <button className={classes.addedButton}>
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

        </div>
    );
};

export default Chat;