import React, {FC} from 'react';
import classes from "./EditPostButtons.module.scss";
import classNames from "classnames";
import Button from "../../../Elements/Button/Button";

export interface EditPostButton{
    key: string,
    text: string,
    icon: string,
    iconColor: string,
}

interface EditPostButtonsProps {
    buttons: EditPostButton[],
    callback: (key: string) => void,
    className?: string;
}

const EditPostButtons:FC<EditPostButtonsProps> = ({buttons, callback, className}) => {
    return (
        <div className={classNames(classes.container, className)}>

            {buttons.map((button) => {
                const {key, text, icon, iconColor} = button;

                return (
                    <Button
                        key={key}
                        className={classes.button}
                        text={text}
                        icon={icon}
                        iconColor={iconColor}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            callback(key)
                        }}
                    />
                )
            })}

        </div>
    );
};

export default EditPostButtons;