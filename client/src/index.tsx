import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
console.log(process.env.REACT_APP_API_URL)
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

reportWebVitals();
