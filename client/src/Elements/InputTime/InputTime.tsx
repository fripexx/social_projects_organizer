import React, {FC, useEffect, useState} from 'react';
import classes from "./InputTime.module.scss";

interface InputTimeProps {
    changeCallback: (date: Date) => void,
    value: Date,
    readonly?: boolean;
}

const InputTime:FC<InputTimeProps> = ({changeCallback, value, readonly = false}) => {
    const [inputValue, setValue] = useState<string>();

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const [hours, minutes] = e.target.value.split(':').map(Number);
        const newDate = new Date(value);

        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);

        setValue(e.target.value);
        changeCallback(newDate);
    }
    const getFormattedTime = (date: Date): string => {
        let hours: number | string = date.getHours();
        let minutes: number | string = date.getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        const time = new Date();
        if(!inputValue) setValue(`${time.getHours()}:${time.getMinutes()}`)
    }, [inputValue]);
    useEffect(() => {
        setValue(getFormattedTime(value))
    }, [value]);

    return (
        <>
            {inputValue &&
                <input
                    className={classes.input}
                    type={"time"}
                    onChange={onChange}
                    value={inputValue}
                    disabled={readonly}
                />
            }
        </>
    );
};

export default InputTime;