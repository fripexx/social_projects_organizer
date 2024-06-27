import React, {FC} from 'react';
import classes from "./EditPostButtons.module.scss";
import RoundIcon from "../../RoundIcon/RoundIcon";

export interface EditPostButton{
    key: string,
    text: string,
    icon: string,
    iconColor: string,
}

interface EditPostButtonsProps {
    buttons: EditPostButton[],
    callback: (key: string) => void,
}

const EditPostButtons:FC<EditPostButtonsProps> = ({buttons, callback}) => {
    return (
        <div className={classes.container}>

            {buttons.map((button) => {
                const {key, text, icon, iconColor} = button;

                return (
                    <button
                        key={key}
                        className={classes.button}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            callback(key)
                        }}
                    >

                        <RoundIcon icon={icon} color={iconColor}/>

                        <span>{text}</span>

                    </button>
                )
            })}

        </div>
    );
};

export default EditPostButtons;