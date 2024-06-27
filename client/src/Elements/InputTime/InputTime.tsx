import React, {FC, useEffect, useState} from 'react';
import classes from "./InputTime.module.scss";

interface InputTimeProps {
    changeCallback: (date: Date) => void,
    value: Date,
}

const getFormattedTime = (date: Date): string => {
    let hours: number | string = date.getHours();
    let minutes: number | string = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}`;
};

const InputTime:FC<InputTimeProps> = ({changeCallback, value}) => {
    const [inputValue, setValue] = useState<string>(getFormattedTime(value));

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

    useEffect(() => {
        const time = new Date();
        if(!inputValue) setValue(`${time.getHours()}:${time.getMinutes()}`)
    }, [inputValue]);

    return (
        <input
            className={classes.input}
            type={"time"}
            onChange={onChange}
            value={inputValue}
        />
    );
};

export default InputTime;