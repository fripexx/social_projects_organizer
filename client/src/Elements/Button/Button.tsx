import React, {ButtonHTMLAttributes, ChangeEvent, FC} from 'react';
import classes from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    icon?: string,
    iconColor?: string,
    buttonColor?: string,
    textColor?: string,
    style?: React.CSSProperties,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    [key: string]: any
}

const Button: FC<ButtonProps> = ({text, icon, iconColor, buttonColor, textColor, style, onClick, rest}) => {
    return (
        <button
            onClick={onClick}
            className={classes.button}
            style={{background: buttonColor ? buttonColor : "", ...style}}
            {...rest}
        >

            {icon &&
                <span className={classes.icon} style={{background: iconColor ? iconColor : ""}}>
                    <img src={icon} alt=""/>
                </span>
            }

            <span className={classes.text} style={{color: textColor ? textColor : ""}}>
               {text}
            </span>

        </button>
    );
};

export default Button;