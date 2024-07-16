import React, {FC, MouseEvent, useEffect, useState} from 'react';
import classes from "./EditPostButtons.module.scss";
import classNames from "classnames";
import Button from "../../../Elements/Button/Button";
import dots from "../../../assets/images/three-dots-icon.svg";
import {ReactSVG} from "react-svg";
import Backdrop from "../../Backdrop/Backdrop";

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
    const [isOpen, setOpen] = useState<boolean>(false)

    const openHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setOpen(prevState => !prevState)
    }
    useEffect(() => {
        document.body.setAttribute('data-backdrop', isOpen.toString());
    }, [isOpen]);

    return (
        <div className={classNames(classes.container, className)}>

            <button className={classes.openButton} onClick={openHandler} data-open={isOpen}>
                <ReactSVG src={dots}/>
            </button>

            <div className={classes.buttonsList} data-open={isOpen}>
                {buttons.map((button) => {
                    const {key, text, icon, iconColor} = button;

                    return (
                        <Button
                            key={key}
                            className={classes.button}
                            text={text}
                            styleType={"grey"}
                            icon={icon}
                            iconColor={iconColor}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                setOpen(false);
                                callback(key)
                            }}
                        />
                    )
                })}
            </div>

        </div>
    );
};

export default EditPostButtons;