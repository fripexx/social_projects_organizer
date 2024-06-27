import React, {FC, useState} from 'react';
import classes from "./PostDescription.module.scss";
import EmojiPicker, {EmojiClickData, EmojiStyle} from "emoji-picker-react";
import {ReactSVG} from "react-svg";
import emojiIcon from "../../../assets/images/emoji-icon.svg";

const PostDescription: FC = () => {
    const [value, setValue] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const onClickEmojiButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowEmojiPicker(prevState => !prevState);
    }
    const addEmojiSymbol = (emojiObject: EmojiClickData) => {
        setValue((prevState) => prevState + emojiObject.emoji);
    };
    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className={classes.container}>

            <span className={classes.title}>Опис посту</span>

            <textarea
                className={classes.textarea}
                value={value}
                onChange={onChangeTextArea}
                rows={5}
                placeholder={"..."}
            />

            <button
                className={classes.emojiButton}
                onClick={onClickEmojiButton}
                data-active={showEmojiPicker}
            >
                <ReactSVG src={emojiIcon}/>
            </button>

            <EmojiPicker
                open={showEmojiPicker}
                className={classes.emojiPicker}
                onEmojiClick={addEmojiSymbol}
                lazyLoadEmojis={true}
                emojiStyle={EmojiStyle.GOOGLE}
            />

        </div>
    );
};

export default PostDescription;