// AppStore.js or store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import FeedReducer from "./FeedSlice";
import ConnectionsReducer from "./ConnectionSlice";

const AppStore = configureStore({
  reducer: {
    user: userReducer,
    Feed: FeedReducer,
    Connections: ConnectionsReducer,  
  },
});

export default AppStore;
