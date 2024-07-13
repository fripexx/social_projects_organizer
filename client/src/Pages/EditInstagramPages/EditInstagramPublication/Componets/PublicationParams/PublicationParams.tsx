import React, {FC, useEffect, useState} from 'react';
import classes from "./PublicationParams.module.scss";
import classNames from "classnames";
import {useAppSelector} from "../../../../../store/hooks/redux";
import ProjectMediaService from "../../../../../api/services/ProjectMediaService";
import {FileType, PhotoType} from "../../../../../store/types/FileType";
import {QueryMediaRequestType} from "../../../../../api/types/ProjectMediaTypes";
import {AspectRatio} from "../../../../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";
import Description from "../../../Components/Description/Description";
import Field from "../../../../../Elements/Field/Field";
import InputTime from "../../../../../Elements/InputTime/InputTime";
import InputDate from "../../../../../Elements/InputDate/InputDate";
import SetMedia from "../../../../../Components/SetMedia/SetMedia";
import Select, {SelectOption} from "../../../../../Elements/Select/Select";

interface PublicationParamsProps {
    description: string;
    changeDescription: (value: string) => void;
    aspectRatio: AspectRatio;
    changeRatioCallback: (value: string) => void;
    date: Date;
    changeDateCallback: (date: Date) => void;
    className?: string;
    selectMedia: (PhotoType | FileType)[];
    selectMediaCallback: (selectMedia: PhotoType | FileType) => void;
    unselectMediaCallback: (removeId: string) => void;
    updateMediaCallback: (updateMedia: (PhotoType | FileType)[]) => void;
}

const PublicationParams: FC<PublicationParamsProps> = ({description, changeDescription, aspectRatio, changeRatioCallback, date, changeDateCallback, className, selectMedia, selectMediaCallback, unselectMediaCallback, updateMediaCallback}) => {
    const project = useAppSelector(state => state.ProjectReducer.project);
    const [mediaLibrary, setMediaLibrary] = useState<(PhotoType | FileType)[]>([])
    const [total, setTotal] = useState<number>(0)
    const [query, setQuery] = useState<QueryMediaRequestType>();
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const aspectRatioOptions: SelectOption[] = [
        {
            value: '1/1',
            label: '1/1'
        },
        {
            value: '1.91/1',
            label: '1.91/1'
        },
        {
            value: '4/5',
            label: '4/5'
        },
    ]

    const changeTimeHandler = (date: Date): void => {
        changeDateCallback(date)
    }
    const changeDateHandler = (date: Date): void => {
        changeDateCallback(date)
    }
    const loadMoreCallback = () => {
        if(!loadMore) setLoadMore(true)
    }
    const changeAspectRatioHandler = (value: string) => {
        changeRatioCallback(value)
    }

    useEffect(() => {
        if (project) {
            setQuery({
                projectId: project.id,
                limit: 5,
                skip: 0,
                type: ['image', 'video']
            })
        }
    }, [project]);
    useEffect(() => {
        if (project && query && loadMore) {
            setQuery({
                projectId: project.id,
                limit: 5,
                skip: mediaLibrary.length,
                type: ['image', 'video']
            })
        }
    }, [loadMore]);
    useEffect(() => {
        const fetchMedia = async () => {
            if (query) {
                const mediaData = await ProjectMediaService.getMedia(query)

                if (mediaData) {
                    setMediaLibrary(prevState => [...prevState, ...mediaData.media]);
                    setTotal(mediaData.total)
                    setLoadMore(false);
                }
            }

        };
        fetchMedia();
    }, [query]);

    return (
        <div className={classNames(classes.container, className)}>

            <SetMedia
                mediaLibrary={mediaLibrary}
                total={total}
                title={"Оберіть медіа"}
                loadMoreCallback={loadMoreCallback}
                maxSelectCount={10}
                selectMedia={selectMedia}
                selectCallback={selectMediaCallback}
                unselectCallback={unselectMediaCallback}
                updateMediaCallback={updateMediaCallback}
            />

            <Select
                className={classes.select}
                label={'Співвідношення'}
                value={aspectRatio}
                options={aspectRatioOptions}
                onChange={changeAspectRatioHandler}
                dropdownType={"relative"}
            />

            <Description
                value={description}
                changeCallback={changeDescription}
                label={"Опис публікацї"}
            />

            <Field text={'Час публікації'}>
                <InputTime changeCallback={changeTimeHandler} value={date}/>
            </Field>

            <Field text={'Дата публікації'}>
                <InputDate changeCallback={changeDateHandler} value={date}/>
            </Field>

        </div>
    );
};

export default PublicationParams;