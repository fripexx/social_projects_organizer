import React, {FC} from 'react';
import Page from "../../Components/Page/Page";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import ContentPage from "../../Components/ContentPage/ContentPage";

const UserNotePage:FC = () => {
    return (
        <Page>
            <SidebarUser/>
            <ContentPage>
                UserNotePage
            </ContentPage>
        </Page>
    );
};

export default UserNotePage;