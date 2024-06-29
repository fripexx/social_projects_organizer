import React, {FC} from 'react';
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
import InstagramPublicationPreview
    from "../../../Components/InstagramComponents/InstagramPublicationPreview/InstagramPublicationPreview";

const EditInstagramPublication: FC = () => {
    const buttonsCallback = (key: string) => {}

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage className={classes.header}>

                        <Button text={"Назад"} onClick={() => {}}/>

                        <EditPostButtons buttons={editButtons} callback={buttonsCallback}/>

                        <StatusPostLabel status={'edit'}/>

                    </HeaderPage>

                    <Content className={classes.columns}>

                        <InstagramPublicationPreview
                            media={[]}
                            profile={{
                                name: "",
                                picture: ""
                            }}
                            width={300}

                        />
                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default EditInstagramPublication;