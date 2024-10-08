import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import classes from "./SetMedia.module.scss";
import addIcon from "../../assets/images/icons/plus-icon.svg";
import {FileType, PhotoType} from "../../store/types/FileType";
import Button from "../../Elements/Button/Button";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modals/Modal/Modal";
import ModalHeader from "./Components/ModalHeader/ModalHeader";
import ModalMediaGrid from "./Components/ModalMediaGrid/ModalMediaGrid";
import ModalFooter from "./Components/ModalFooter/ModalFooter";
import SelectedMediaPreview from "./Components/SelectedMediaPreview/SelectedMediaPreview";

interface MediaProps {
    mediaLibrary: (PhotoType | FileType)[];
    total: number;
    title?: string;
    textButton?: string;
    loadMoreCallback?: () => void;
    maxSelectCount?: number;
    selectMedia: (PhotoType | FileType)[];
    selectCallback: (selectMedia: PhotoType | FileType) => void;
    unselectCallback: (removeId: string) => void;
    updateMediaCallback: (updateMedia: (PhotoType | FileType)[]) => void;
    readonly?: boolean;
}

const SetMedia:FC<MediaProps> = ({mediaLibrary, total, title, textButton, loadMoreCallback, maxSelectCount = 0, selectMedia, selectCallback, unselectCallback, updateMediaCallback, readonly = false}) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const mainRef = useRef<HTMLDivElement>(null);

    const closeButtonHandler = (): void => {
        if(!readonly) setShowModal(false)
    }
    const addButtonHandler = (): void => {
        if(!readonly) setShowModal(false)
    }
    const showModalHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if(!readonly) setShowModal(true)
    }
    const selectMediaItemHandler = (media: PhotoType | FileType) => {
        if(!readonly) selectCallback(media)
    }
    const unselectMediaItemHandler = (removeId: string) => {
        if(!readonly) unselectCallback(removeId)
    }

    const scrollMainHandler = useCallback(() => {
        if (mainRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = mainRef.current;

            if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && loadMoreCallback) loadMoreCallback();
        }
    }, [loadMoreCallback]);

    useEffect(() => {
        if (mainRef.current && loadMoreCallback && total !== 0 && total > mediaLibrary.length) {
            const {scrollHeight, clientHeight} = mainRef.current;
            if (scrollHeight === clientHeight) loadMoreCallback();
        }
    }, [mediaLibrary]);
    useEffect(() => {
        const ref = mainRef.current;
        if (ref) {
            ref.addEventListener('scroll', scrollMainHandler);
            return () => {
                ref.removeEventListener('scroll', scrollMainHandler);
            };
        }
    }, [scrollMainHandler]);

    return (
        <div className={classes.container}>

            {!readonly &&
                <>
                    <Button
                        className={classes.addButton}
                        text={textButton || "Додати медіа"}
                        onClick={showModalHandler}
                        icon={addIcon}
                        iconColor={'var(--Color-Green)'}
                        disabled={readonly}
                    />
                </>
            }

            <SelectedMediaPreview
                selectMedia={selectMedia}
                updateMediaCallback={updateMediaCallback}
                unselectMediaItemHandler={unselectMediaItemHandler}
                readonly={readonly}
            />

            {!readonly &&
                <Backdrop isOpen={showModal} className={classes.backdropContainer}>

                    <Modal className={classes.modal}>

                        <ModalHeader title={title}/>

                        <main className={classes.main} ref={mainRef}>

                            <ModalMediaGrid
                                media={mediaLibrary}
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
            }

        </div>
    );
};

export default SetMedia;