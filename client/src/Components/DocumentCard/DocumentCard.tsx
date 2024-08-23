import React, {FC} from 'react';
import classes from "./DocumentCard.module.scss";
import {ProjectDocument} from "../../store/types/ProjectDocument";
import {FileType} from "../../store/types/FileType";
import Button from "../../Elements/Button/Button";
import dumpIcon from "../../assets/images/icons/dump-icon.svg";

interface DocumentCardProps {
    document: ProjectDocument,
    deleteCallback: (id: string) => void,
    isAdmin?: boolean;
}

const DocumentCard:FC<DocumentCardProps> = ({document, deleteCallback, isAdmin}) => {
    const {id, name, file, dateUpload} = document;

    const isFileType = (file: string | FileType | null): file is FileType => {
        return typeof file !== 'string' && file !== null && 'id' in file && 'type' in file;
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
    const openFile = (path: string) => {
        window.open(`${process.env.REACT_APP_API_URL}/${path}`, '_blank');
    }
    const deleteHandler = () => {
        if(isAdmin) deleteCallback(id);
    }

    return (
        <div className={classes.container}>

            <div className={classes.field}>
                <span className={classes.label}>Назва:</span> {name}
            </div>

            {isFileType(file) &&
                <div className={classes.field}>
                    <span className={classes.label}>Файл:</span> {file.name}
                </div>
            }

            <div className={classes.field}>
                <span className={classes.label}>Дата:</span> {formatDate(dateUpload)}
            </div>

            <div className={classes.footer}>

                {isFileType(file) &&
                    <Button
                        className={classes.button}
                        onClick={() => openFile(file.path)}
                        text={"Переглянути"}
                    />
                }

                {isAdmin &&
                    <div className={classes.delete} onClick={deleteHandler}>
                        <img src={dumpIcon} alt=""/>
                    </div>
                }

            </div>

        </div>
    );
};

export default DocumentCard;