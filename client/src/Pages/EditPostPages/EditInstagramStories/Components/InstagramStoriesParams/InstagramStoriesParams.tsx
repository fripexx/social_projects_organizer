import React, {FC, useEffect, useState} from 'react';
import classes from "./InstagramStoriesParams.module.scss";
import classNames from "classnames";
import Field from "../../../../../Elements/Field/Field";
import InputTime from "../../../../../Elements/InputTime/InputTime";
import InputDate from "../../../../../Elements/InputDate/InputDate";
import SetMedia from "../../../../../Components/SetMedia/SetMedia";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks/redux";
import {setPost, setEdit, setSelectMedia} from "../../../../../store/reducers/InstagramStoriesSlice";
import {setError} from "../../../../../store/reducers/ProjectSlice";
import ProjectMediaService from "../../../../../api/services/ProjectMediaService";
import {FileType, PhotoType} from "../../../../../store/types/FileType";
import {QueryMediaRequestType} from "../../../../../api/types/ProjectMediaTypes";

interface InstagramStoriesParamsProps {
    className?: string;
    readonly: boolean;
}

const InstagramStoriesParams:FC<InstagramStoriesParamsProps> = ({className, readonly}) => {
    const dispatch = useAppDispatch()

    const project = useAppSelector(state => state.ProjectReducer.project)
    const stories = useAppSelector(state => state.InstagramStoriesSlice.stories)
    const selectMedia = useAppSelector(state => state.InstagramStoriesSlice.selectMedia)

    const [mediaLibrary, setMediaLibrary] = useState<(PhotoType | FileType)[]>([])
    const [total, setTotal] = useState<number>(0)
    const [query, setQuery] = useState<QueryMediaRequestType>();
    const [loadMore, setLoadMore] = useState<boolean>(false);


    const changeDateHandler = (date: Date): void => {
        if(stories) {
            dispatch(setPost({...stories, datePublish: date.toISOString()}))
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

    if(stories) {
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
                    readonly={readonly}
                />

                <Field text={'Час публікації'}>
                    <InputTime
                        changeCallback={changeDateHandler}
                        value={new Date(stories.datePublish)}
                        readonly={readonly}
                    />
                </Field>

                <Field text={'Дата публікації'}>
                    <InputDate
                        changeCallback={changeDateHandler}
                        value={new Date(stories.datePublish)}
                        readonly={readonly}
                    />
                </Field>

            </div>
        );
    } else {
        return <></>
    }
};

export default InstagramStoriesParams;