import { createSlice } from '@reduxjs/toolkit';

// Records each REAL network request. If a request does NOT appear here when you
// expect data, that data came from the RTK Query cache.
const requestLogSlice = createSlice({
  name: 'requestLog',
  initialState: { total: 0, entries: [] },
  reducers: {
    requestLogged(state, action) {
      state.total += 1;
      state.entries.unshift(action.payload);
      if (state.entries.length > 15) state.entries.pop();
    },
    logCleared(state) {
      state.total = 0;
      state.entries = [];
    },
  },
});

export const { requestLogged, logCleared } = requestLogSlice.actions;
export default requestLogSlice.reducer;
