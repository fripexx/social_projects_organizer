import React from "react";
import AuthPage from "../Pages/AuthPage/AuthPage";
import AccountPage from "../Pages/AccountPage/AccountPage";

interface Route {
    key: string;
    name: string;
    path: string;
    icon: string;
    component: React.FC;
    redirectIfAuthenticated?: boolean;
    requiresAuth?: boolean;
}

export const routes: Route[] = [
    {
        key: "auth",
        name: "Авторизація",
        path: "/login",
        component: AuthPage,
        icon: "",
        redirectIfAuthenticated: true,
    },
    {
        key: "registration",
        name: "Реєстрація",
        path: "/registration",
        component: AuthPage,
        icon: "",
        redirectIfAuthenticated: true
    },
    {
        key: "projects",
        name: "Проєкти",
        path: "/projects",
        component: AccountPage,
        icon: "",
        redirectIfAuthenticated: false
    },
];