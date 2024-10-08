import React from "react";
import userIcon from "../assets/images/user.svg";
import infoIcon from "../assets/images/icons/info-icon.svg";
import calendarIcon from "../assets/images/icons/calendar-icon.svg";
import notesIcon from "../assets/images/icons/notes-icon.svg";
import picturesIcon from "../assets/images/icons/pictures-icon.svg";
import settingsIcon from "../assets/images/icons/settings-icon.svg";
import teamsIcon from "../assets/images/icons/teams-icon.svg";
import statisticsIcon from "../assets/images/icons/statistics-icon.svg";
import postsIcon from "../assets/images/icons/posts-icon.svg";
import paintIcon from "../assets/images/icons/paint-icon.svg";
import AuthPage from "../Pages/AuthPage/AuthPage";
import UserSettings from "../Pages/UserSettings/UserSettings";
import UserProjects from "../Pages/UserProjects/UserProjects";
import UserProfile from "../Pages/UserProfile/UserProfile";
import UserNotes from "../Pages/UserNotes/UserNotes";
import ProjectPosts from "../Pages/ProjectPosts/ProjectPosts";
import ProjectSettings from "../Pages/ProjectSettings/ProjectSettings";
import ProjectNotes from "../Pages/ProjectNotes/ProjectNotes";
import ProjectTeams from "../Pages/ProjectTeams/ProjectTeams";
import ProjectMedia from "../Pages/ProjectMedia/ProjectMedia";
import EditInstagramPublication from "../Pages/EditPostPages/EditInstagramPublication/EditInstagramPublication";
import EditInstagramStories from "../Pages/EditPostPages/EditInstagramStories/EditInstagramStories";
import EditInstagramReels from "../Pages/EditPostPages/EditInstagramReels/EditInstagramReels";
import ProjectCalendar from "../Pages/ProjectCalendar/ProjectCalendar";
import ProjectInformation from "../Pages/ProjectInformation/ProjectInformation";

export interface Route {
    key: string;
    name: string;
    path: string;
    icon: string;
    component: React.FC;
    redirectIfAuthenticated?: boolean;
    requiresAuth?: boolean;
    showInUserMenu?: boolean;
    showInProjectMenu?: boolean;
    showOnlyAdmin?: boolean;
    isProjectPath?: boolean;
}

export const routes: Route[] = [
    {
        key: "auth",
        name: "Авторизація",
        path: "/login",
        component: AuthPage,
        icon: "",
        redirectIfAuthenticated: true,
        showInUserMenu: false,
    },
    {
        key: "registration",
        name: "Реєстрація",
        path: "/registration",
        component: AuthPage,
        icon: "",
        redirectIfAuthenticated: true,
        showInUserMenu: false,
    },
    {
        key: "projects",
        name: "Пости",
        path: "/projects",
        component: UserProjects,
        icon: postsIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "profile",
        name: "Профіль",
        path: "/profile",
        component: UserProfile,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "settings",
        name: "Налаштування",
        path: "/settings",
        component: UserSettings,
        icon: settingsIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "notes",
        name: "Нотатки",
        path: "/notes",
        component: UserNotes,
        icon: notesIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "posts",
        name: "Пости",
        path: "/project/:id/posts",
        component: ProjectPosts,
        icon: postsIcon,
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true,
    },
    // {
    //     key: "visual_concepts",
    //     name: "Візуальні концепції",
    //     path: "/project/:id/visual_concepts",
    //     component: ProjectPosts,
    //     icon: paintIcon,
    //     requiresAuth: true,
    //     isProjectPath: true,
    //     redirectIfAuthenticated: false,
    //     showInProjectMenu: true,
    // },
    {
        key: "calendar",
        name: "Календар",
        path: "/project/:id/calendar",
        component: ProjectCalendar,
        icon: calendarIcon,
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true,
    },
    {
        key: "media_library",
        name: "Медіафайли",
        path: "/project/:id/media_library",
        component: ProjectMedia,
        icon: picturesIcon,
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true,
    },
    {
        key: "settings",
        name: "Налаштування",
        path: "/project/:id/settings",
        component: ProjectSettings,
        icon: settingsIcon,
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true,
        showOnlyAdmin: true
    },
    {
        key: "teams",
        name: "Команда",
        path: "/project/:id/teams",
        component: ProjectTeams,
        icon: teamsIcon,
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true
    },
    {
        key: "information",
        name: "Інформація",
        path: "/project/:id/information",
        component: ProjectInformation,
        icon: infoIcon,
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true,
    },
    // {
    //     key: "statistics",
    //     name: "Статистика",
    //     path: "/project/:id/statistics",
    //     component: ProjectPosts,
    //     icon: statisticsIcon,
    //     requiresAuth: true,
    //     isProjectPath: true,
    //     redirectIfAuthenticated: false,
    //     showInProjectMenu: true,
    // },
    {
        key: "notes",
        name: "Нотатки",
        path: "/project/:id/notes",
        component: ProjectNotes,
        icon: notesIcon,
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true,
    },
    {
        key: "edit_instagram_publication",
        name: "Редагування Instagram публікації",
        path: "/project/:id/edit-instagram-publication",
        component: EditInstagramPublication,
        icon: "",
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: false,
    },
    {
        key: "edit_instagram_stories",
        name: "Редагування Instagram Stories",
        path: "/project/:id/edit-instagram-stories",
        component: EditInstagramStories,
        icon: "",
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: false,
    },
    {
        key: "edit_instagram_reels",
        name: "Редагування Instagram Reels",
        path: "/project/:id/edit-instagram-reels",
        component: EditInstagramReels,
        icon: "",
        requiresAuth: true,
        isProjectPath: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: false,
    }
];