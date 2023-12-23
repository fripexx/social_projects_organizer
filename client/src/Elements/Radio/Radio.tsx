import React, {FC, InputHTMLAttributes} from 'react';
import classes from "./Radio.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
const Radio:FC<InputProps> = ({ label, checked, ...inputProps }) => {
    const classesName = [classes.input];

    if(checked) {
        classesName.push(classes.input__checked);
    }

    return (
        <label className={classes.label}>

            <input
                className={classesName.join(" ")}
                type={"radio"}
                {...inputProps}
            />

            {label &&
                <span className={classes.title}>{label}</span>
            }

        </label>
    );
};

export default Radio;