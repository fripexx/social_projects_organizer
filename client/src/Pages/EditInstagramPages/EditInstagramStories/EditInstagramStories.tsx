import React, {FC} from 'react';
import classes from "./EditInstagramStories.module.scss";
import {editButtons} from "../constants/editButtons";
import ProjectPage from "../../../HOC/ProjectPage/ProjectPage";
import Page from "../../../Components/Page/Page";
import SidebarProject from "../../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../../Components/ContentPage/ContentPage";
import HeaderPage from "../../../Components/HeaderPage/HeaderPage";
import Button from "../../../Elements/Button/Button";
import EditPostButtons from "../../../Components/EditPostComponents/EditPostButtons/EditPostButtons";
import StatusPostLabel from "../../../Components/StatusPostLabel/StatusPostLabel";
import Content from "../../../Components/Content/Content";
import InstagramStoriesPreview
    from "../../../Components/InstagramComponents/InstagramStoriesPreview/InstagramStoriesPreview";

const EditInstagramStories:FC = () => {
    const buttonsCallback = (key: string) => {}

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage className={classes.header}>

                        <Button text={"Назад"} onClick={() => {
                        }}/>

                        <EditPostButtons buttons={editButtons} callback={buttonsCallback}/>

                        <StatusPostLabel status={'edit'}/>

                    </HeaderPage>

                    <Content className={classes.columns}>

                        <InstagramStoriesPreview
                            profile={{
                                name: "",
                                picture: ""
                            }}
                            media={
                                {
                                    "id": "666f0093467b86022dfea878",
                                    "type": "image",
                                    "extension": "png",
                                    "mimetype": "image/png",
                                    "dateCreated": new Date(),
                                    "path": "http://localhost:5000/uploads/public/IMG_2851.mov",
                                    "author": "65d4efadc63707946f3ae65b",
                                    "name": "47afe88b-75d1-4821-a4ca-a1a52910cb8e.png",
                                    "cropped": {
                                        "300": "http://localhost:5000/uploads/private/media_library/660a8a7eb570836b2bffdc68/2024/6/47afe88b-75d1-4821-a4ca-a1a52910cb8e-300x300.png",
                                        "600": "http://localhost:5000/uploads/private/media_library/660a8a7eb570836b2bffdc68/2024/6/47afe88b-75d1-4821-a4ca-a1a52910cb8e-600x600.png",
                                        "1080": "http://localhost:5000/uploads/private/media_library/660a8a7eb570836b2bffdc68/2024/6/47afe88b-75d1-4821-a4ca-a1a52910cb8e-1080x1080.png"
                                    },
                                }
                            }
                            width={300}
                        />

                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default EditInstagramStories;