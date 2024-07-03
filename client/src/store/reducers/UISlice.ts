import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileType, PhotoType} from "../types/FileType";
import {NotificationType} from "../../Components/NotificationsWidget/types/NotificationType";

interface UIState {
    showMobileSidebar: boolean,
    filesSlider: {
        files: (FileType | PhotoType)[],
        activeIndex: number,
    },
    notifications: NotificationType[]
}

const initialState: UIState = {
    showMobileSidebar: false,
    filesSlider: {
        files: [],
        activeIndex: 0,
    },
    notifications: [],
}

const UISlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        showSidebar: (state, action: PayloadAction<boolean>) => {
            state.showMobileSidebar = action.payload;
        },
        setFilesInSlider: (state, action: PayloadAction<(FileType | PhotoType)[]>) => {
            state.filesSlider.files = action.payload;
        },
        setActiveIndexSlider: (state, action: PayloadAction<number>) => {
            state.filesSlider.activeIndex = action.payload;
        },
        setNotification: (state, action: PayloadAction<NotificationType>) => {
            state.notifications = [action.payload, ...state.notifications];
            localStorage.setItem("SPONotifications", JSON.stringify(state.notifications));
        },
        setNotifications: (state, action: PayloadAction<NotificationType[]>) => {
            state.notifications = action.payload
        },
        readNotification: (state, action: PayloadAction<string>) => {
            state.notifications = [...state.notifications].map(notification =>  notification.id === action.payload ? {...notification, isRead: true} : notification)
            localStorage.setItem("SPONotifications", JSON.stringify(state.notifications));
        },
    },
    extraReducers: {}
})

export default UISlice.reducer;
export const {showSidebar, setFilesInSlider, setActiveIndexSlider, setNotification, setNotifications, readNotification} = UISlice.actions;