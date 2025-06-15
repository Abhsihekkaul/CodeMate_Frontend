// AppStore.js or store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/UserSlice";

const AppStore = configureStore({
  reducer: {
    user: userReducer,  
  },
});

export default AppStore;
