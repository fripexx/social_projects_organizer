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
                            media={undefined}
                            width={300}
                        />

                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default EditInstagramStories;