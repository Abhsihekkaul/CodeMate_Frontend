import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState : null,
  reducers: {
    // Replaces the whole user list with a new one
    addUsers: (state, action) => {
      return action.payload;
    },

    // Clears the user list (sets state to empty array)
    removeUsers: () => {
      return [];
    }
  }
});

// Correct way to export actions
export const { addUsers, removeUsers } = UserSlice.actions;

// Export the reducer to be used in the store
export default UserSlice.reducer;
