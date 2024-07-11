import React, {FC} from 'react';
import classes from "./RoundIcon.module.scss";
import {ReactSVG} from "react-svg";
import classNames from "classnames";

interface RoundIconProps {
    icon: string,
    color: string,
    size?: number,
    className?: string;
}

const RoundIcon:FC<RoundIconProps> = ({icon, color, size = "25", className}) => {
    return (
        <div
            className={classNames(classes.icon, className)}
            style={{ background: color, '--size': `${size}px` } as React.CSSProperties}
        >
            <ReactSVG src={icon}/>
        </div>
    );
};

export default RoundIcon;