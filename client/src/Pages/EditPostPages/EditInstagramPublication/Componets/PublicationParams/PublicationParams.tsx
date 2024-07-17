import React, {Dispatch, FC, useEffect, useState} from 'react';
import classes from "./PublicationParams.module.scss";
import classNames from "classnames";
import {FileType, PhotoType} from "../../../../../store/types/FileType";
import {QueryMediaRequestType} from "../../../../../api/types/ProjectMediaTypes";
import {AspectRatio} from "../../../../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";
import {InstagramPublicationType} from "../../../../../store/types/PostType";
import {ProjectType} from "../../../../../store/types/ProjectType";
import Description from "../../../Components/Description/Description";
import Field from "../../../../../Elements/Field/Field";
import InputTime from "../../../../../Elements/InputTime/InputTime";
import InputDate from "../../../../../Elements/InputDate/InputDate";
import SetMedia from "../../../../../Components/SetMedia/SetMedia";
import Select, {SelectOption} from "../../../../../Elements/Select/Select";
import ProjectMediaService from "../../../../../api/services/ProjectMediaService";

interface PublicationParamsProps {
    className?: string;
    project: ProjectType;
    publication: InstagramPublicationType;
    changePublicationCallback: Dispatch<React.SetStateAction<InstagramPublicationType | undefined>>;
    selectMedia: (PhotoType | FileType)[];
    selectMediaCallback: (selectMedia: PhotoType | FileType) => void;
    unselectMediaCallback: (removeId: string) => void;
    updateMediaCallback: (updateMedia: (PhotoType | FileType)[]) => void;
}

const PublicationParams: FC<PublicationParamsProps> = ({className, project, publication, changePublicationCallback, selectMedia, selectMediaCallback, unselectMediaCallback, updateMediaCallback}) => {
    const {datePublish, params} = publication;
    const {description, aspectRatio} = params;

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

    const changeAspectRatioHandler = (value: string) => {
        changePublicationCallback(prevState => {
            if (prevState !== undefined) return {...prevState, params: {...prevState.params, aspectRatio: value as AspectRatio}};
            return prevState;
        })
    }
    const changeDescriptionHandler = (value: string) => {
        changePublicationCallback(prevState => {
            if (prevState !== undefined) return {...prevState, params: {...prevState.params, description: value}};
            return prevState;
        })
    }
    const changeDateHandler = (date: Date): void => {
        changePublicationCallback(prevState => {
            if (prevState !== undefined) return {...prevState, datePublish: date};
            return prevState;
        })
    }
    const loadMoreCallback = () => {
        if (!loadMore) setLoadMore(true)
    }

    useEffect(() => {
        setQuery({
            projectId: project.id,
            limit: 5,
            skip: 0,
            type: ['image', 'video']
        })
    }, [project]);
    useEffect(() => {
        if (query && loadMore) {
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
                changeCallback={changeDescriptionHandler}
                label={"Опис публікацї"}
            />

            <Field text={'Час публікації'}>
                <InputTime changeCallback={changeDateHandler} value={datePublish}/>
            </Field>

            <Field text={'Дата публікації'}>
                <InputDate changeCallback={changeDateHandler} value={datePublish}/>
            </Field>

        </div>
    );
};

export default PublicationParams;