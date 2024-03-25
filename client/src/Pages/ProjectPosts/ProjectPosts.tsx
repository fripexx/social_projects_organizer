import React, {FC} from 'react';
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import plusIcon from "../../assets/images/plus_icon.svg";
import Content from "../../Components/Content/Content";
import Sidebar from "../../Components/Sidebar/Sidebar";

const ProjectPosts:FC = () => {
    return (
        <Page>

            <Sidebar/>

            <ContentPage>

                <HeaderPage>

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