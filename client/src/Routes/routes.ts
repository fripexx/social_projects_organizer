import React from "react";
import AuthPage from "../Pages/AuthPage/AuthPage";

interface Route {
    name: string;
    path: string;
    component: React.FC;
    redirectIfAuthenticated?: boolean;
    requiresAuth?: boolean;
}

export const routes: Route[] = [
    {
        name: "auth",
        path: "/login",
        component: AuthPage,
        redirectIfAuthenticated: true,
    },
    {
        name: "registration",
        path: "/registration",
        component: AuthPage,
        redirectIfAuthenticated: true
    },
];