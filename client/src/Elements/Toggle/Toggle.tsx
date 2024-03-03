import React, {FC, InputHTMLAttributes, useEffect, useState} from 'react';
import classes from "./Toggle.module.scss";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {}

const Toggle:FC<ToggleProps> = ({...rest}) => {
    return (
        <input
            {...rest}
            className={classes.toggle}
            type={"checkbox"}
        />
    );
};

export default Toggle;