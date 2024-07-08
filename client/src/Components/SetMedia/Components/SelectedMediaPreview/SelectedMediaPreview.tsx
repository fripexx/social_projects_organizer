import React, { FC, useState, DragEvent, SetStateAction, Dispatch} from 'react';
import classes from './SelectedMediaPreview.module.scss';
import { FileType, PhotoType } from '../../../../store/types/FileType';
import PreviewMedia from '../../../../Components/PreviewMedia/PreviewMedia';

interface SelectedMediaPreviewProps {
    selectMedia: (PhotoType | FileType)[];
    unselectMediaItemHandler: (removeId: string) => void;
    setSelectMedia: Dispatch<SetStateAction<(PhotoType | FileType)[]>>;
}

const SelectedMediaPreview: FC<SelectedMediaPreviewProps> = ({ selectMedia, unselectMediaItemHandler, setSelectMedia }) => {
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

    const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData('index', index.toString());
        setDraggingIndex(index);
    };

    const handleDragEnd = () => {
        setDraggingIndex(null);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, currentIndex: number) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData('index'));
        const updatedMedia = [...selectMedia];
        const draggedMedia = updatedMedia[draggedIndex];

        updatedMedia.splice(draggedIndex, 1);
        updatedMedia.splice(currentIndex, 0, draggedMedia);

        setSelectMedia(updatedMedia);
        setDraggingIndex(null);
    };

    return (
        <div className={classes.preview}>
            {selectMedia.map((file: FileType | PhotoType, index: number) => (
                <div
                    key={file.id}
                    className={`${classes.dragItem} ${draggingIndex === index ? classes.dragging : ''}`}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                >
                    <PreviewMedia file={file} removeCallback={unselectMediaItemHandler} />
                </div>
            ))}
        </div>
    );
};

export default SelectedMediaPreview;
