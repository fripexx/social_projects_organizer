import React from "react";
import AuthPage from "../Pages/AuthPage/AuthPage";
import AccountSettingsPage from "../Pages/AccountSettingsPage/AccountSettingsPage";
import userIcon from "../assets/images/user.svg"
import UserProjectsPage from "../Pages/UserProjectsPage/UserProjectsPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import UserNotePage from "../Pages/UserNotePage/UserNotePage";
import ProjectPosts from "../Pages/ProjectPosts/ProjectPosts";

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
        name: "Проєкти",
        path: "/projects",
        component: UserProjectsPage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "profile",
        name: "Профіль",
        path: "/profile",
        component: ProfilePage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "settings",
        name: "Налаштування",
        path: "/settings",
        component: AccountSettingsPage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "notes",
        name: "Нотатки",
        path: "/notes",
        component: UserNotePage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "project",
        name: "Проєкт",
        path: "/project/:id/posts",
        component: ProjectPosts,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInProjectMenu: true,
    },
];