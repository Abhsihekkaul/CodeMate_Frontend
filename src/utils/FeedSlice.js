import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name : 'Feed',
    initialState : [],
    reducers : {
        addFeed : (state, actions) => {
            return actions.payload;
        },

        removeFeed : (state, actions) => {
            return [];
        } 
    }
});


export const {addFeed, removeFeed} = FeedSlice.actions;
export default FeedSlice.reducer;