import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import classes from "./SetMedia.module.scss";
import addIcon from "../../assets/images/plus_icon.svg";
import {FileType, PhotoType} from "../../store/types/FileType";
import Button from "../../Elements/Button/Button";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modals/Modal/Modal";
import ModalHeader from "./Components/ModalHeader/ModalHeader";
import ModalMediaGrid from "./Components/ModalMediaGrid/ModalMediaGrid";
import ModalFooter from "./Components/ModalFooter/ModalFooter";
import SelectedMediaPreview from "./Components/SelectedMediaPreview/SelectedMediaPreview";

interface MediaProps {
    media: (PhotoType | FileType)[];
    total: number;
    title?: string;
    textButton?: string;
    loadMoreCallback?: () => void;
    maxSelectCount?: number;
    selectCallback: (selectMedia: (PhotoType | FileType)[]) => void;
}

const SetMedia:FC<MediaProps> = ({media, total, title, textButton, loadMoreCallback, maxSelectCount = 0, selectCallback}) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectMedia, setSelectMedia] = useState<(PhotoType | FileType)[]>([])
    const mainRef = useRef<HTMLDivElement>(null);

    const closeButtonHandler = (): void => {
        setShowModal(false)
    }
    const addButtonHandler = (): void => {
        setShowModal(false)
    }
    const showModalHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setShowModal(true)
    }
    const selectMediaItemHandler = (media: PhotoType | FileType) => {
        setSelectMedia(prevState => {
            if (prevState.some(item => item.id === media.id)) {
                return prevState.filter(item => item.id !== media.id);
            } else if (prevState.length < maxSelectCount) {
                return [...prevState, media];
            }
            return prevState;
        });
    }
    const unselectMediaItemHandler = (removeId: string) => {
        setSelectMedia(prevState => {
            if (prevState.some(item => item.id === removeId)) {
                return prevState.filter(item => item.id !== removeId);
            }
            return prevState;
        });
    }

    const scrollMainHandler = useCallback(() => {
        if (mainRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = mainRef.current;

            if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && loadMoreCallback) {
                loadMoreCallback();
            }
        }
    }, [loadMoreCallback]);

    useEffect(() => {
        if (mainRef.current && loadMoreCallback && total !== 0 && total > media.length) {
            const {scrollHeight, clientHeight} = mainRef.current;
            if (scrollHeight === clientHeight) loadMoreCallback();
        }
    }, [media]);
    useEffect(() => {
        const ref = mainRef.current;
        if (ref) {
            ref.addEventListener('scroll', scrollMainHandler);
            return () => {
                ref.removeEventListener('scroll', scrollMainHandler);
            };
        }
    }, [scrollMainHandler]);
    useEffect(() => {
        selectCallback(selectMedia)
    }, [selectMedia])
    return (
        <div className={classes.container}>

            <Button
                className={classes.addButton}
                text={textButton || "Додати медіа"}
                onClick={showModalHandler}
                icon={addIcon}
                iconColor={'var(--Color-Green)'}
            />

            <SelectedMediaPreview
                selectMedia={selectMedia}
                setSelectMedia={setSelectMedia}
                unselectMediaItemHandler={unselectMediaItemHandler}
            />

            <Backdrop isOpen={showModal} className={classes.backdropContainer}>

                <Modal className={classes.modal}>

                    <ModalHeader title={title}/>

                    <main className={classes.main} ref={mainRef}>

                        <ModalMediaGrid
                            media={media}
                            selectMedia={selectMedia}
                            selectMediaItemHandler={selectMediaItemHandler}
                        />

                    </main>

                    <ModalFooter
                        selectMediaLength={selectMedia.length}
                        closeButtonCallback={closeButtonHandler}
                        addButtonCallback={addButtonHandler}
                    />

                </Modal>

            </Backdrop>

        </div>
    );
};

export default SetMedia;