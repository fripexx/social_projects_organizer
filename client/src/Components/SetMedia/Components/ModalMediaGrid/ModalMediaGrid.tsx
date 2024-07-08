import React, {FC} from 'react';
import classes from './ModalMediaGrid.module.scss';
import {FileType, PhotoType} from "../../../../store/types/FileType";
import MediaItem from "../../../../Components/MediaItem/MediaItem";

interface MediaGridProps {
    media: (PhotoType | FileType)[];
    selectMedia: (PhotoType | FileType)[];
    selectMediaItemHandler: (media: PhotoType | FileType) => void;
}

const ModalMediaGrid: FC<MediaGridProps> = ({media, selectMedia, selectMediaItemHandler}) => {
    return (
        <div className={classes.gridMedia}>
            {media.map((file: FileType | PhotoType) => (
                <MediaItem
                    key={file.id}
                    file={file}
                    clickCallback={selectMediaItemHandler}
                    select={selectMedia.some(item => item.id === file.id)}
                />
            ))}
        </div>
    );
};

export default ModalMediaGrid;
