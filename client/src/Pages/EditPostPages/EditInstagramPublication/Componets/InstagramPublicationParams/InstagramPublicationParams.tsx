import React, {FC, useEffect, useState} from 'react';
import classes from "./InstagramPublicationParams.module.scss";
import classNames from "classnames";
import {FileType, PhotoType} from "../../../../../store/types/FileType";
import {QueryMediaRequestType} from "../../../../../api/types/ProjectMediaTypes";
import {AspectRatio} from "../../../../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";
import Description from "../../../Components/Description/Description";
import Field from "../../../../../Elements/Field/Field";
import InputTime from "../../../../../Elements/InputTime/InputTime";
import InputDate from "../../../../../Elements/InputDate/InputDate";
import SetMedia from "../../../../../Components/SetMedia/SetMedia";
import Select, {SelectOption} from "../../../../../Elements/Select/Select";
import ProjectMediaService from "../../../../../api/services/ProjectMediaService";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks/redux";
import {setEdit, setPublication, setSelectMedia} from "../../../../../store/reducers/InstagramPublicationSlice";

interface PublicationParamsProps {
    className?: string;
}

const InstagramPublicationParams: FC<PublicationParamsProps> = ({className}) => {
    const dispatch = useAppDispatch()

    const project = useAppSelector(state => state.ProjectReducer.project)
    const publication = useAppSelector(state => state.InstagramPublicationSlice.publication)
    const selectMedia = useAppSelector(state => state.InstagramPublicationSlice.selectMedia)

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
        if(publication) {
            dispatch(setPublication({...publication, params: {...publication.params, aspectRatio: value as AspectRatio}}))
            dispatch(setEdit(true))
        }
    }
    const changeDescriptionHandler = (value: string) => {
        if(publication) {
            dispatch(setPublication({...publication, params: {...publication.params, description: value}}))
            dispatch(setEdit(true))
        }
    }
    const changeDateHandler = (date: Date): void => {
        if(publication) {
            dispatch(setPublication({...publication, datePublish: date.toISOString()}))
            dispatch(setEdit(true))
        }
    }
    const loadMoreCallback = () => {
        if (!loadMore) setLoadMore(true)
    }
    const selectMediaHandler = (media: PhotoType | FileType): void => {
        const updateSelectMedia = () => {
            if (selectMedia.some(item => item.id === media.id)) {
                return selectMedia.filter(item => item.id !== media.id);
            } else if (selectMedia.length < 10) {
                return [...selectMedia, media];
            }
            return selectMedia;
        }
        dispatch(setSelectMedia(updateSelectMedia()))
        dispatch(setEdit(true))
    }
    const unselectMediaItemHandler = (removeId: string) => {
        const updateSelectMedia = () => {
            if (selectMedia.some(item => item.id === removeId)) return selectMedia.filter(item => item.id !== removeId);
            return selectMedia;
        }
        dispatch(setSelectMedia(updateSelectMedia()));
        dispatch(setEdit(true))
    }
    const updateSelectMediaHandler = (updateMedia: (PhotoType | FileType)[]) => {
        dispatch(setSelectMedia(updateMedia))
        dispatch(setEdit(true))
    }

    useEffect(() => {
        if(project) {
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


    if(publication) {
        return (
            <div className={classNames(classes.container, className)}>

                <SetMedia
                    mediaLibrary={mediaLibrary}
                    total={total}
                    title={"Оберіть медіа"}
                    loadMoreCallback={loadMoreCallback}
                    maxSelectCount={10}
                    selectMedia={selectMedia}
                    selectCallback={selectMediaHandler}
                    unselectCallback={unselectMediaItemHandler}
                    updateMediaCallback={updateSelectMediaHandler}
                />

                <Select
                    className={classes.select}
                    label={'Співвідношення'}
                    value={publication.params.aspectRatio}
                    options={aspectRatioOptions}
                    onChange={changeAspectRatioHandler}
                    dropdownType={"relative"}
                />

                <Description
                    value={publication.params.description}
                    changeCallback={changeDescriptionHandler}
                    label={"Опис публікацї"}
                />

                <Field text={'Час публікації'}>
                    <InputTime changeCallback={changeDateHandler} value={new Date(publication.datePublish)}/>
                </Field>

                <Field text={'Дата публікації'}>
                    <InputDate changeCallback={changeDateHandler} value={new Date(publication.datePublish)}/>
                </Field>

            </div>
        );

    } else {
        return <></>
    }
};

export default InstagramPublicationParams;