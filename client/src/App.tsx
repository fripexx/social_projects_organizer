import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from "./Routes/routes";
import {useAppDispatch} from "./store/hooks/redux";
import {checkAuth} from "./store/thunks/UserThunks";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => {
                    return (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={<route.component/>}
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default App;