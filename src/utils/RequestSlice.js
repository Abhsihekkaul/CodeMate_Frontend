// src/utils/RequestSlice.js
import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "Request",
  initialState: {
    received: [],
    sent: [],
  },
  reducers: {
    setReceivedRequests: (state, action) => {
      state.received = action.payload;
    },
    setSentRequests: (state, action) => {
      state.sent = action.payload;
    },
    clearRequests: (state) => {
      state.received = [];
      state.sent = [];
    }
  }
});

export const {
  setReceivedRequests,
  setSentRequests,
  clearRequests
} = RequestSlice.actions;

export default RequestSlice.reducer;
