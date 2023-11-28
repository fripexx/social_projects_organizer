import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from "./Routes/routes";

const App = () => {
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