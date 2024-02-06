import React from "react";
import AuthPage from "../Pages/AuthPage/AuthPage";
import AccountPage from "../Pages/AccountPage/AccountPage";
import userIcon from "../assets/images/user.svg"

export interface Route {
    key: string;
    name: string;
    path: string;
    icon: string;
    component: React.FC;
    redirectIfAuthenticated?: boolean;
    requiresAuth?: boolean;
    showInUserMenu: boolean;
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
        key: "profile",
        name: "Профіль",
        path: "/profile",
        component: AccountPage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "projects",
        name: "Проєкти",
        path: "/projects",
        component: AccountPage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "settings",
        name: "Налаштування",
        path: "/settings",
        component: AccountPage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
    {
        key: "notes",
        name: "Нотатки",
        path: "/notes",
        component: AccountPage,
        icon: userIcon,
        requiresAuth: true,
        redirectIfAuthenticated: false,
        showInUserMenu: true,
    },
];