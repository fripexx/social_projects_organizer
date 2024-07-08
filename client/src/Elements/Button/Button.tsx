import React, {ButtonHTMLAttributes, ChangeEvent, FC} from 'react';
import classes from "./Button.module.scss";
import classNames from "classnames";
import RoundIcon from "../../Components/RoundIcon/RoundIcon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    icon?: string,
    iconColor?: string,
    buttonColor?: string,
    textColor?: string,
    style?: React.CSSProperties,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className?: string;
    [key: string]: any
}

const Button: FC<ButtonProps> = ({text, icon, iconColor, buttonColor, textColor, style, onClick, className, rest}) => {
    return (
        <button
            onClick={onClick}
            className={classNames(classes.button, className)}
            style={{background: buttonColor ? buttonColor : "", ...style}}
            {...rest}
        >

            {icon &&
                <RoundIcon icon={icon} color={iconColor || ""} />
            }

            <span className={classes.text} style={{color: textColor ? textColor : ""}}>
               {text}
            </span>

        </button>
    );
};

export default Button;