import React, {CSSProperties, FC, useEffect, useState} from 'react';
import classes from "./Select.module.scss";
import classNames from "classnames";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    label?: string,
    className?: string;
    style?: CSSProperties;
    dropdownType?: "absolute" | "relative";
}

const Select: FC<SelectProps> = ({options, value, onChange, label, className, style = {}, dropdownType = "absolute"}) => {
    const [currentOption, setCurrent] = useState<SelectOption>({value: "", label: ""});
    const [active, setActive] = useState<boolean>(false);

    const handleChange = (value: string) => {
        setActive(false)
        onChange(value)
    }
    const showOptions = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(prevState => !prevState)
    }
    useEffect(() => {
        const findOption = options.find(option => option.value === value);
        findOption ? setCurrent(findOption) : setCurrent({value: "", label: ""})
    }, [value]);

    return (
        <div className={classNames(classes.container, className)} style={style} data-active={active} data-dropdown-type={dropdownType}>

            {label &&
                <span className={classes.label}>
                    {label}
                </span>
            }

            <div className={classes.current} onClick={showOptions}>

                <span className={classes.currentLabel}>{currentOption.label || "..."}</span>

                <svg className={classes.arrow} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.67847 2.40588L0.133133 6.95134C-0.0443826 7.12882 -0.0443826 7.41664 0.133163 7.59415C0.310678 7.77164 0.598466 7.77164 0.775981 7.59412L4.99992 3.37009L9.22407 7.59415C9.40159 7.77164 9.68937 7.77164 9.86689 7.59412C9.95565 7.5054 10 7.38906 10 7.27273C10 7.1564 9.95565 7.04006 9.86686 6.95131L5.32128 2.40588C5.23604 2.32061 5.12044 2.27273 4.99989 2.27273C4.87935 2.27273 4.76371 2.32061 4.67847 2.40588Z"
                        fill="var(--ColorSVG, #FDFDFD)"
                    />
                </svg>

            </div>

            <div className={classes.options}>

                <div className={classes.list}>
                    {options.map((item: SelectOption) => (
                        <div
                            key={item.value}
                            className={classes.option}
                            onClick={() => handleChange(item.value)}
                            data-current={item.value === currentOption.value}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Select;