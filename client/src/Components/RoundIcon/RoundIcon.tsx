import React, {FC} from 'react';
import classes from "./RoundIcon.module.scss";

interface RoundIconProps {
    icon: string,
    color: string,
    size?: string,
}

const RoundIcon:FC<RoundIconProps> = ({icon, color, size = "25px"}) => {
    return (
        <div
            className={classes.icon}
            style={{ background: color, '--size': size } as React.CSSProperties}
        >
            <img
                loading={"lazy"}
                decoding={"async"}
                src={icon}
                alt={""}
            />
        </div>
    );
};

export default RoundIcon;