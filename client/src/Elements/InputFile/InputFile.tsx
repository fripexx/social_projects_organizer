import React, {forwardRef} from 'react';
import classes from "./InputFile.module.scss";
import RoundIcon from "../../Components/RoundIcon/RoundIcon";
import plusIcon from "../../assets/images/icons/plus-icon.svg";

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(({label = 'Завантажити', ...props}, ref) => {
    const handleFileInputClick = () => {
        if (ref && typeof ref === 'object' && ref.current) ref.current.click();
    };

    return (
        <div className={classes.inputFileContainer}>

            <button type="button" className={classes.inputFileButton} onClick={handleFileInputClick}>

                <RoundIcon icon={plusIcon} color={"var(--Color-Blue)"}/>

                <span>{label}</span>

            </button>

            <input
                {...props}
                type="file"
                ref={ref}
                className={classes.inputFileHidden}
            />

        </div>
    );
});

export default InputFile;
