import React, {FC, ReactNode} from 'react';
import classes from "./Page.module.scss";
import FooterMobile from "../FooterMobile/FooterMobile";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import FilesSlider from "../FilesSlider/FilesSlider";
import {setFilesInSlider} from "../../store/reducers/UISlice";
import NotificationsWidget from "../NotificationsWidget/NotificationsWidget";

interface PageProps {
    children: ReactNode;
    [key: string]: any;
}

const Page: FC<PageProps> = ({children, ...pageProps}) => {
    const dispatch = useAppDispatch()
    const filesSlider = useAppSelector(state => state.UIReducer.filesSlider)
    const notifications = useAppSelector(state => state.UIReducer.notifications)

    const closeFilesSliderCallback = () => {
        dispatch(setFilesInSlider([]))
    }

    return (
        <div className={classes.page} {...pageProps}>

            {children}

            <FooterMobile/>

            <FilesSlider
                files={filesSlider.files}
                show={filesSlider.files.length !== 0}
                activeSlide={filesSlider.activeIndex}
                closeCallback={closeFilesSliderCallback}
            />

            <NotificationsWidget notifications={notifications}/>

        </div>
    );
};

export default Page;