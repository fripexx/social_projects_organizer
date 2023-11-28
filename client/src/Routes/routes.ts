import React from "react";
import AuthPage from "../Pages/AuthPage/AuthPage";

interface Route {
    name: string;
    path: string;
    component: React.FC;
    hideAuth?: boolean;
    privat?: boolean;
}

export const routes: Route[] = [
    {
        name: "auth",
        path: "/login",
        component: AuthPage,
    },
    {
        name: "registration",
        path: "/registration",
        component: AuthPage,
    },
];