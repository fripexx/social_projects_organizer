import React, {FC, useState} from 'react';
import classes from "./Media.module.scss";
import {FileType, PhotoType} from "../../store/types/FileType";
import {UserType} from "../../store/types/UserType";
import {ProjectType} from "../../store/types/ProjectType";
import MediaItem from "../MediaItem/MediaItem";
import Backdrop from "../Backdrop/Backdrop";
import ModalConfirmAction from "../Modals/ModalConfirmAction/ModalConfirmAction";

interface MediaProps {
    media: (FileType | PhotoType)[],
    user: UserType,
    project: ProjectType,
    deleteCallback: (id: string) => void,
    openCallback: (id: string) => void,
}

const Media:FC<MediaProps> = ({media, user, project, deleteCallback, openCallback}) => {
    const [deleteId, setDeleteId] = useState<string | null>(null);

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
        openCallback(media.id);
    }

    return (
        <div className={classes.container}>

            {media.map((file: FileType | PhotoType) => {
                return(
                    <MediaItem
                        key={file.id}
                        file={file}
                        deleteCallback={file.author === user.id || user.id === project.administrator ? showDeletePopup : undefined}
                        clickCallback={showMedia}
                    />
                )
            })}

            <Backdrop isOpen={!!deleteId}>
                <ModalConfirmAction
                    text={"Ви впевнені що хочете видалити медіафайл"}
                    onCancel={hideDeletePopup}
                    onConfirm={acceptDelete}
                />
            </Backdrop>

        </div>
    );
};

export default Media;