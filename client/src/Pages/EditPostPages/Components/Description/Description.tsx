import React, {CSSProperties, FC, useState} from 'react';
import classes from "./Description.module.scss"
import classNames from "classnames"
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
import {ReactSVG} from "react-svg";
import emojiIcon from "../../../../assets/images/emoji-icon.svg";

interface CommentsProps {
    value: string;
    changeCallback: (value: string) => void;
    label?: string;
    className?: string;
    style?: CSSProperties;
    readonly?: boolean;
}

const Description: FC<CommentsProps> = ({value, changeCallback, label, className, style, readonly = false}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(prevState => !prevState);
    }
    const emojiHandler = (emojiObject: EmojiClickData) => {
        changeCallback(value + emojiObject.emoji)
    }
    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeCallback(e.currentTarget.value)
    }

    return (
        <div className={classNames(classes.container, className)} style={style}>

            {label &&
                <span className={classes.label}>{label}</span>
            }

            <textarea
                value={value}
                placeholder={"..."}
                onChange={changeHandler}
                className={classes.textarea}
                rows={10}
                disabled={readonly}
            />

            {!readonly &&
                <>
                    <footer className={classes.footer}>

                        <button className={classes.emojiButton} onClick={toggleEmojiPicker}
                                data-active={showEmojiPicker}>
                            <ReactSVG src={emojiIcon}/>
                        </button>

                    </footer>

                    <EmojiPicker
                        className={classes.emojiPicker}
                        lazyLoadEmojis={true}
                        open={showEmojiPicker}
                        onEmojiClick={emojiHandler}
                    />
                </>
            }

        </div>
    );
};

export default Description;