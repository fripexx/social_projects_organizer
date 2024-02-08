import React, {FC} from 'react';
import Page from "../../Components/Page/Page";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import ContentPage from "../../Components/ContentPage/ContentPage";

const UserProjectsPage:FC = () => {
    return (
        <Page>
            <SidebarUser/>
            <ContentPage>
                UserProjects
            </ContentPage>
        </Page>
    );
};

export default UserProjectsPage;