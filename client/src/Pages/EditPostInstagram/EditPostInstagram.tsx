import React, {FC} from 'react';
import classes from "./EditPostInstagram.module.scss";
import dumpIcon from "../../assets/images/dump_icon.svg";
import saveIcon from "../../assets/images/save_icon.svg";
import downloadIcon from "../../assets/images/download-icon.svg";
import clockIcon from "../../assets/images/clock-icon.svg";
import Page from "../../Components/Page/Page";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Content from "../../Components/Content/Content";
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import EditPostButtons from "../../Components/EditPostComponents/EditPostButtons/EditPostButtons";
import Button from "../../Elements/Button/Button";
import StatusPostLabel from "../../Components/StatusPostLabel/StatusPostLabel";

const EditPostInstagram:FC = () => {
    const editButtons = [
        {
            key: "delete",
            text: "Видалити пост",
            icon: dumpIcon,
            iconColor: "var(--Color-Red)"
        },
        {
            key: "save",
            text: "Зберегти та вийти",
            icon: saveIcon,
            iconColor: "var(--Color-Green)"
        },
        {
            key: "download",
            text: "Завантажити",
            icon: downloadIcon,
            iconColor: "var(--Color-Blue)"
        },
        {
            key: "send-for-confirmation",
            text: "Відправити на підтвердження",
            icon: clockIcon,
            iconColor: "var(--Color-Yellow)"
        },
    ];
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

                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default EditPostInstagram;