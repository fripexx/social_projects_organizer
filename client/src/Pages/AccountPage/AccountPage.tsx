import React, {FC} from 'react';
import Page from "../../Components/Page/Page";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import ContentPage from "../../Components/ContentPage/ContentPage";

const AccountPage: FC = () => {
    return (
        <Page>
            <SidebarUser/>
            <ContentPage>
                wefwefewf
            </ContentPage>
        </Page>
    );
};

export default AccountPage;