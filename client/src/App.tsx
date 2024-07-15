import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {routes} from "./Routes/routes";
import {useAppDispatch, useAppSelector} from "./store/hooks/redux";
import {checkAuth} from "./store/thunks/UserThunks";
import Loader from "./Elements/Loader/Loader";
import ProjectPage from "./HOC/ProjectPage/ProjectPage";
import {SocketProvider} from "./context/Socket-Context";
import NotificationWrapper from "./HOC/NotificationWrapper/NotificationWrapper";
import RoomsConnection from "./HOC/RoomsConnection/RoomsConnection";

const App = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.UserReducer.isAuth)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            if (localStorage.getItem('token')) {
                await dispatch(checkAuth());
            }
            setIsCheckingAuth(false);
        };

        checkAuthentication();
    }, [dispatch]);

    if (isCheckingAuth) {
        return <Loader/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => {
                    const RouteElement = (
                        route.requiresAuth && !isAuth ? (
                            <Navigate to="/login" />
                        ) : (
                            route.redirectIfAuthenticated && isAuth ? (
                                <Navigate to="/projects" />
                            ) : (
                                <route.component />
                            )
                        )
                    );

                    return (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={
                                route.requiresAuth && isAuth ? (
                                    <SocketProvider>
                                        <RoomsConnection>
                                            <NotificationWrapper>
                                                {route.isProjectPath ? (
                                                    <ProjectPage>
                                                        {RouteElement}
                                                    </ProjectPage>
                                                ) : (
                                                    RouteElement
                                                )}
                                            </NotificationWrapper>
                                        </RoomsConnection>
                                    </SocketProvider>
                                ) : (
                                    RouteElement
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default App;