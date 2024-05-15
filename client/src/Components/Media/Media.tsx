import React, {FC, useState} from 'react';
import classes from "./Media.module.scss";
import {FileType, PhotoType} from "../../store/types/FileType";
import {UserType} from "../../store/types/UserType";
import {ProjectType} from "../../store/types/ProjectType";
import MediaItem from "../MediaItem/MediaItem";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import ModalConfirmAction from "../Modals/ModalConfirmAction/ModalConfirmAction";
import ModalMedia from "../Modals/ModalMedia/ModalMedia";

interface MediaProps {
    media: (FileType | PhotoType)[],
    user: UserType,
    project: ProjectType,
    deleteCallback: (id: string) => void
}

const Media:FC<MediaProps> = ({media, user, project, deleteCallback}) => {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [openMedia, setOpenMedia] = useState<FileType | PhotoType>();

    const showDeletePopup = (id: string) => {
        setDeleteId(id)
    }
    const hideDeletePopup = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setDeleteId(null);
    }
    const acceptDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(deleteId) {
            deleteCallback(deleteId)
            setDeleteId(null);
        }
    }
    const showMedia = (media: FileType | PhotoType) => {
        setOpenMedia(media)
    }
    const closeMedia = () => {
        setOpenMedia(undefined)
    }

    return (
        <div className={classes.container}>

            {media.map((file: FileType | PhotoType) => {
                return(
                    <MediaItem
                        key={file.id}
                        file={file}
                        userId={user.id}
                        administratorId={project.administrator}
                        deleteCallback={showDeletePopup}
                        clickCallback={showMedia}
                    />
                )
            })}

            <ModalBackdrop isOpen={!!deleteId}>
                <ModalConfirmAction
                    text={"Ви впевнені що хочете видалити медіафайл"}
                    onCancel={hideDeletePopup}
                    onConfirm={acceptDelete}
                />
            </ModalBackdrop>

            {openMedia &&
                <ModalBackdrop isOpen={true}>
                    <ModalMedia
                        media={openMedia}
                        closeCallback={closeMedia}
                    />
                </ModalBackdrop>
            }


        </div>
    );
};

export default Media;