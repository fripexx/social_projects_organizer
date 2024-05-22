import {combineReducers, configureStore} from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserSlice";
import ProjectReducer from "./reducers/ProjectSlice";
import ProjectMediaReducer from "./reducers/ProjectMediaSlice";
import UIReducer from "./reducers/UISlice";

const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    ProjectMediaReducer,
    UIReducer
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']