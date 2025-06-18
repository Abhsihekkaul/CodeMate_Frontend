import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "Connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return [];
    }
  }
});

export const { addConnections, removeConnections } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
