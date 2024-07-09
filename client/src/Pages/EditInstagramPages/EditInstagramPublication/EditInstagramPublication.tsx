import React, {FC, useState} from 'react';
import classes from "./EditInstagramPublication.module.scss";
import {editButtons} from "../constants/editButtons";
import Page from "../../../Components/Page/Page";
import SidebarProject from "../../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../../Components/ContentPage/ContentPage";
import HeaderPage from "../../../Components/HeaderPage/HeaderPage";
import Content from "../../../Components/Content/Content";
import ProjectPage from "../../../HOC/ProjectPage/ProjectPage";
import EditPostButtons from "../../../Components/EditPostComponents/EditPostButtons/EditPostButtons";
import Button from "../../../Elements/Button/Button";
import StatusPostLabel from "../../../Components/StatusPostLabel/StatusPostLabel";
import InstagramPublicationPreview from "../../../Components/InstagramComponents/InstagramPublicationPreview/InstagramPublicationPreview";
import PublicationParams from "./Componets/PublicationParams/PublicationParams";
import {FileType, PhotoType} from "../../../store/types/FileType";
import {
    AspectRatio
} from "../../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";

const EditInstagramPublication: FC = () => {
    const [selectMedia, setSelectMedia] = useState<(FileType | PhotoType)[]>([])
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('4/5')
    const [description, setDescription] = useState<string>('');

    const buttonsHandler = (key: string) => {}
    const selectMediaHandler = (media: (PhotoType | FileType)[]): void => {
        setSelectMedia(media);
    }
    const changeRatioHandler = (value: string) => {
        setAspectRatio(value as AspectRatio);
    }
    const changeDescriptionHandler = (value: string) => {
        setDescription(value)
    }

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage className={classes.header}>

                        <Button text={"Назад"} onClick={() => {}}/>

                        <EditPostButtons buttons={editButtons} callback={buttonsHandler}/>

                        <StatusPostLabel status={'edit'}/>

                    </HeaderPage>

                    <Content className={classes.columns}>

                        <InstagramPublicationPreview
                            className={classes.preview}
                            media={selectMedia}
                            profile={{
                                name: "shirshonkova_a",
                                picture: ""
                            }}
                            aspectRatio={aspectRatio}
                            description={description}
                        />

                        <PublicationParams
                            description={description}
                            changeDescription={changeDescriptionHandler}
                            selectMedіaCallback={selectMediaHandler}
                            aspectRatio={aspectRatio}
                            changeRatioCallback={changeRatioHandler}

                        />

                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default EditInstagramPublication;