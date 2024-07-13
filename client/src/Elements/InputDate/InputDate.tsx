import React, {FC, useEffect, useState} from 'react';
import classes from "./InputDate.module.scss";

interface InputDateProps {
    changeCallback: (date: Date) => void,
    value: Date,
}

const InputDate:FC<InputDateProps> = ({changeCallback, value}) => {
    const [inputValue, setInputValue] = useState<string>();

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const [year, month, day] = e.target.value.split('-').map(Number);
        const newDate = new Date(value);

        newDate.setFullYear(year);
        newDate.setMonth(month - 1);
        newDate.setDate(day);

        setInputValue(e.target.value);
        changeCallback(newDate)
    }
    const getFormattedDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        setInputValue(getFormattedDate(value))
    }, [value]);

    return (
        <>
            {inputValue &&
                <input
                    className={classes.input}
                    type="date"
                    onChange={onChange}
                    value={inputValue}
                />

            }
        </>
    );
};

export default InputDate;