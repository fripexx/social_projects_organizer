import React, {FC, useState, useRef, useEffect} from 'react';
import classes from "./Chat.module.scss";
import emojiIcon from "../../assets/images/emoji-icon.svg";
import paperClipIcon from "../../assets/images/paper-clip-icon.svg";
import {ReactSVG} from "react-svg";
import {MessageType} from "../../store/types/ChatTypes";
import {BasicUserInfo, UserType} from "../../store/types/UserType";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import Message from "../Message/Message";

interface ChatProps {
    chatId: string;
    messages: MessageType[],
    team: BasicUserInfo[],
    geMessagesCallback: () => void,
    currentUser: UserType
}

const Chat:FC<ChatProps> = ({messages, team, currentUser}) => {
    const [sendMessage, setSendMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

    useEffect(() => {
        if(mainRef.current) mainRef.current.scrollTop = mainRef.current.scrollHeight;
    },[])

    return (
        <div className={classes.chat}>

            <main className={classes.main} ref={mainRef}>

                {messages.length > 0 &&
                    messages.map((message) => {
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

                {messages.length === 0 &&
                    <div className={classes.noMessage}>
                        Тут ще немає повідомлень
                    </div>
                }

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

                        <button className={classes.sendButton}>
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