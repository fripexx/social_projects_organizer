import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthPage from "./Pages/AuthPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<AuthPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;