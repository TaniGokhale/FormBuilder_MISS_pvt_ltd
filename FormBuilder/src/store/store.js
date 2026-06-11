import { configureStore, createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    forms: [],
  },
  reducers: {
    setForms: (state, action) => {
      state.forms = action.payload;
    },
  },
});

export const { setForms } = formSlice.actions;

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});