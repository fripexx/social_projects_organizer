import React, {FC, useEffect, useState} from 'react';
import classes from "./PublicationParams.module.scss";
import Description from "../../../Components/Description/Description";
import Field from "../../../../../Elements/Field/Field";
import InputTime from "../../../../../Elements/InputTime/InputTime";
import InputDate from "../../../../../Elements/InputDate/InputDate";
import SetMedia from "../../../../../Components/SetMedia/SetMedia";
import {FileType, PhotoType} from "../../../../../store/types/FileType";
import {useAppSelector} from "../../../../../store/hooks/redux";
import {QueryMedia} from "../../../../../store/thunks/ProjectMediaThunks";
import instanceServer from "../../../../../api/instanceServer";
import {GetMediaResponseType} from "../../../../../store/types/GetMediaResponseType";

interface PublicationParamsProps {
    selectCallback: (selectMedia: (PhotoType | FileType)[]) => void;
}

const PublicationParams: FC<PublicationParamsProps> = ({selectCallback}) => {
    const project = useAppSelector(state => state.ProjectReducer.project);
    const [commentValue, setCommentValue] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [media, setMedia] = useState<(PhotoType | FileType)[]>([])
    const [total, setTotal] = useState<number>(0)
    const [query, setQuery] = useState<QueryMedia>();
    const [loadMore, setLoadMore] = useState<boolean>(false);

    const commentChangeHandler = (value: string): void => {
        setCommentValue(value);
    }
    const changeTimeHandler = (date: Date): void => {
        setDate(date)
    }
    const changeDateHandler = (date: Date): void => {
        setDate(date)
    }
    const getMediaRequest = async () => {
        if (query) {
            const response = await instanceServer.get<GetMediaResponseType>(
                `/get-media`,
                {params: query}
            );
            return response.data
        }
    }
    const loadMoreCallback = () => {
        if(!loadMore) setLoadMore(true)
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
                skip: media.length,
                type: ['image', 'video']
            })
        }
    }, [loadMore]);
    useEffect(() => {
        const fetchMedia = async () => {
            if (query) {
                const mediaData = await getMediaRequest();

                if (mediaData) {
                    setMedia(prevState => [...prevState, ...mediaData.media]);
                    setTotal(mediaData.total)
                    setLoadMore(false);
                }
            }

        };
        fetchMedia();
    }, [query]);

    return (
        <div className={classes.container}>

            <SetMedia
                media={media}
                total={total}
                title={"Оберіть медіа"}
                loadMoreCallback={loadMoreCallback}
                maxSelectCount={10}
                selectCallback={selectCallback}
            />

            <Description
                changeCallback={commentChangeHandler}
                value={commentValue}
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