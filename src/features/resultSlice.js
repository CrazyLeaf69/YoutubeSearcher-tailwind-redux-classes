import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
  name: "results",
  initialState: {
    result: null,
  },
  reducers: {
    setResults: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const selectResults = (state) => state.resultReducer.result;
// Action creators are generated for each case reducer function
export const { setResults } = resultSlice.actions;

export default resultSlice.reducer;
