import React, {FC} from 'react';
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import plusIcon from "../../assets/images/plus_icon.svg";
import Content from "../../Components/Content/Content";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import StatusTabs from "./Components/StatusTabs/StatusTabs";

const ProjectPosts:FC = () => {
    return (
        <Page>

            <SidebarProject/>

            <ContentPage>

                <HeaderPage>

                    <StatusTabs/>

                    <Button
                        text={"Додати"}
                        icon={plusIcon}
                        iconColor={"var(--Color-Green)"}
                        style={{marginLeft: "auto"}}
                        onClick={() => {}}
                    />

                </HeaderPage>

                <Content>
                    Пости
                </Content>

            </ContentPage>

        </Page>
    );
};

export default ProjectPosts;