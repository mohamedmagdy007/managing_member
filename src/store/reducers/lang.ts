import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: { lang: string } = {
  lang: localStorage?.getItem("lang") || "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    langHandler: (state, { payload }: PayloadAction<string>) => {
      state.lang = payload;
    },
  },
});

export const { langHandler } = langSlice.actions;
export default langSlice.reducer;
