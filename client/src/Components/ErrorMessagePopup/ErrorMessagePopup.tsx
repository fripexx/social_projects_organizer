import React, {FC, useEffect} from 'react';
import classes from "./ErrorMessagePopup.module.scss";
import {setError} from "../../store/reducers/ProjectSlice";
import {useAppDispatch} from "../../store/hooks/redux";

interface ErrorMessagePopupProps {
    message: string | null;
}

const ErrorMessagePopup:FC<ErrorMessagePopupProps> = ({message}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!!message) setTimeout(() => dispatch(setError(null)), 4000)
    }, [message]);

    return (
        <div className={classes.container} data-show={!!message}>
            {message}
        </div>
    );
};

export default ErrorMessagePopup;