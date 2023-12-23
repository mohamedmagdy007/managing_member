import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allMembersType, membersType } from "./type";
import { logoutHandler } from "./login";
const initialState: allMembersType = {
  members: [],
};
const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    createMemberHandle: (state, { payload }: PayloadAction<membersType>) => {
      state.members.push(payload);
    },
    updateMemberHandle: (state, { payload }: PayloadAction<membersType>) => {
      state.members = state.members.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    deleteHandler: (state, { payload }: PayloadAction<number>) => {
      state.members = state.members.filter((item) => item.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutHandler, (state) => {
      state.members = [];
    });
  },
});

export const { createMemberHandle, updateMemberHandle, deleteHandler } =
  memberSlice.actions;
export default memberSlice.reducer;
