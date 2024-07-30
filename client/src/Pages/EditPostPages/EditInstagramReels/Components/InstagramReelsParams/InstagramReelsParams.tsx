import React, {FC, useEffect, useState} from 'react';
import classes from "./InstagramReelsParams.module.scss";
import classNames from "classnames";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks/redux";
import Description from "../../../Components/Description/Description";
import Field from "../../../../../Elements/Field/Field";
import InputTime from "../../../../../Elements/InputTime/InputTime";
import InputDate from "../../../../../Elements/InputDate/InputDate";
import {setPost, setEdit, setSelectMedia} from "../../../../../store/reducers/InstagramReelsSlice";
import SetMedia from "../../../../../Components/SetMedia/SetMedia";
import ProjectMediaService from "../../../../../api/services/ProjectMediaService";
import {setError} from "../../../../../store/reducers/ProjectSlice";
import {FileType, PhotoType} from "../../../../../store/types/FileType";
import {QueryMediaRequestType} from "../../../../../api/types/ProjectMediaTypes";

interface InstagramReelsParamsProps {
    className?: string;
}

const InstagramReelsParams:FC<InstagramReelsParamsProps> = ({className}) => {
    const dispatch = useAppDispatch()

    const project = useAppSelector(state => state.ProjectReducer.project)
    const reels = useAppSelector(state => state.InstagramReelsSlice.reels)
    const selectMedia = useAppSelector(state => state.InstagramReelsSlice.selectMedia)

    const [mediaLibrary, setMediaLibrary] = useState<(PhotoType | FileType)[]>([])
    const [total, setTotal] = useState<number>(0)
    const [query, setQuery] = useState<QueryMediaRequestType>();
    const [loadMore, setLoadMore] = useState<boolean>(false);


    const changeDescriptionHandler = (value: string) => {
        if(reels) {
            dispatch(setPost({...reels, params: {...reels.params, description: value}}))
            dispatch(setEdit(true))
        }
    }
    const changeDateHandler = (date: Date): void => {
        if(reels) {
            dispatch(setPost({...reels, datePublish: date.toISOString()}))
            dispatch(setEdit(true))
        }
    }
    const loadMoreCallback = () => {
        if (!loadMore) setLoadMore(true)
    }
    const selectMediaHandler = (media: FileType): void => {
        dispatch(setSelectMedia(media))
        dispatch(setEdit(true))
    }
    const unselectMediaItemHandler = (removeId: string) => {
        dispatch(setSelectMedia(undefined))
        dispatch(setEdit(true))
    }
    const updateSelectMediaHandler = (updateMedia: FileType[]) => {
        dispatch(setSelectMedia(updateMedia[0]))
        dispatch(setEdit(true))
    }
    useEffect(() => {
        if(project) {
            setQuery({
                projectId: project.id,
                limit: 5,
                skip: 0,
                type: ['video']
            })
        }
    }, [project]);
    useEffect(() => {
        if (project && query && loadMore) {
            setQuery({
                projectId: project.id,
                limit: 5,
                skip: mediaLibrary.length,
                type: ['video']
            })
        }
    }, [loadMore]);
    useEffect(() => {
        if (query) {
            ProjectMediaService.getMedia(query)
                .then((mediaData) => {
                    if (mediaData) {
                        setMediaLibrary(prevState => [...prevState, ...mediaData.media]);
                        setTotal(mediaData.total)
                        setLoadMore(false);
                    }
                })
                .catch((error) => dispatch(setError(error)))
        }
    }, [query]);

    if(reels) {
        return (
            <div className={classNames(classes.container, className)}>

                <SetMedia
                    mediaLibrary={mediaLibrary}
                    total={total}
                    title={"Оберіть медіа"}
                    loadMoreCallback={loadMoreCallback}
                    maxSelectCount={1}
                    selectMedia={selectMedia ? [selectMedia] : []}
                    selectCallback={selectMediaHandler}
                    unselectCallback={unselectMediaItemHandler}
                    updateMediaCallback={updateSelectMediaHandler}
                />

                <Description
                    value={reels.params.description}
                    changeCallback={changeDescriptionHandler}
                    label={"Опис публікацї"}
                />

                <Field text={'Час публікації'}>
                    <InputTime changeCallback={changeDateHandler} value={new Date(reels.datePublish)}/>
                </Field>

                <Field text={'Дата публікації'}>
                    <InputDate changeCallback={changeDateHandler} value={new Date(reels.datePublish)}/>
                </Field>

            </div>
        );
    } else {
        return <></>
    }
};

export default InstagramReelsParams;