import React, {FC, useEffect, useState} from 'react';
import classes from "./PostItem.module.scss";
import {PostType} from "../../store/types/PostType";
import {FileType, PhotoCroppedType, PhotoType} from "../../store/types/FileType";
import ProjectMediaService from "../../api/services/ProjectMediaService";
import {NavLink} from "react-router-dom";
import ImageServer from "../../Elements/ImageServer/ImageServer";
import TypeMedia from "../TypeMedia/TypeMedia";
import SocialLogo from "./Components/SocialLogo/SocialLogo";
import StatusPost from "./Components/StatusPost/StatusPost";
import checkedIcon from "../../assets/images/check-icon.svg";
import {ReactSVG} from "react-svg";
import VideoServer from "../../Elements/VideoServer/VideoServer";

interface PostCardProps {
    post: PostType;
    checked?: boolean;
}

const PostItem: FC<PostCardProps> = ({post, checked= false}) => {
    const {id, project, author, status, social, typePost, datePublish, dateCreated, params} = post;
    const [preview, setPreview] = useState<PhotoType | FileType>();
    const [cropped, setCropped] = useState<PhotoCroppedType>();

    useEffect(() => {
        async function fetchMedia() {
            if (params?.media) {
                try {
                    if (Array.isArray(params.media)) {
                        const response = await ProjectMediaService.getMediaOne({
                            projectId: project,
                            mediaId: params.media[0]
                        })
                        if (response && response.id) {
                            setPreview(response)
                            if(response.type === "image" && "cropped" in response) setCropped(response.cropped)
                        }
                    } else {
                        const response = await ProjectMediaService.getMediaOne({
                            projectId: project,
                            mediaId: params.media
                        })
                        if (response && response.id) {
                            setPreview(response)
                            if(response.type === "image" && "cropped" in response) setCropped(response.cropped)
                        }
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        }

        fetchMedia()

    }, [params]);

    return (
        <NavLink
            to={`/project/${project}/edit-${social}-${typePost}?id=${id}`}
            className={classes.container}
            title={`${social} ${typePost} ${id}`}
        >

            {preview && preview.type === "image" &&
                <ImageServer
                    className={classes.image}
                    path={cropped ? cropped["300"] : preview.path}
                    loading={"lazy"}
                    width={"300px"}
                    height={"300px"}
                    decoding={"async"}
                />
            }

            {preview && preview.type === "video" &&
                <VideoServer
                    className={classes.image}
                    path={cropped ? cropped["300"] : preview.path}
                    width={"300px"}
                    height={"300px"}
                />
            }

            <SocialLogo
                className={classes.social}
                social={social}
            />

            <StatusPost className={classes.status} status={status}/>

            {preview &&
                <TypeMedia className={classes.type} type={preview.type}/>
            }

            {checked &&
                <div className={classes.checked}>
                    <ReactSVG src={checkedIcon}/>
                </div>
            }

        </NavLink>
    );
};

export default PostItem;