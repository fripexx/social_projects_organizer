import React, {ButtonHTMLAttributes, ChangeEvent, FC} from 'react';
import classes from "./Button.module.scss";
import classNames from "classnames";
import RoundIcon from "../../Components/RoundIcon/RoundIcon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    icon?: string,
    iconColor?: string,
    iconSize?: number;
    buttonColor?: string,
    textColor?: string,
    style?: React.CSSProperties,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className?: string;
    styleType?: "grey" | "grey-blue" | "dark" | "white";
    [key: string]: any
}

const Button: FC<ButtonProps> = ({text, icon, iconColor, iconSize = 25, buttonColor, textColor, style, onClick, className, styleType, ...rest}) => {
    return (
        <button
            onClick={onClick}
            className={classNames(classes.button, className)}
            style={{background: buttonColor ? buttonColor : "", ...style}}
            data-style={styleType}
            {...rest}
        >

            {icon &&
                <RoundIcon
                    className={classes.icon}
                    icon={icon}
                    color={iconColor || ""}
                    size={iconSize}
                />
            }

            <span className={classes.text} style={{color: textColor ? textColor : ""}}>
               {text}
            </span>

        </button>
    );
};

export default Button;