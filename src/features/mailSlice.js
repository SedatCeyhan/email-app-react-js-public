import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    selectedMail: null,
    sendMessageIsOpen: false,
    clickedMessages: []
  },
  reducers: {
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    addToClickedMessages: (state, action) => {
      state.clickedMessages = [...state.clickedMessages, action.payload.id];
    },
    removeFromClickedMessages: (state, action) => {
      const index = state.clickedMessages.findIndex(
        (emailId) => emailId === action.payload.id
      );
      let newClicked = [...state.clickedMessages];

      if (index >= 0) {
        newClicked.splice(index, 1);
      } else {
        console.warn(
          `Cant remove email (id: ${action.payload.id})!`
        );
      }

      state.clickedMessages = newClicked;
    }
  },
});

export const {
  selectMail,
  openSendMessage,
  closeSendMessage,
  addToClickedMessages,
  removeFromClickedMessages
} = mailSlice.actions;

export const selectOpenMail = (state) => state.mail.selectedMail;
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectClickedMessages = (state) => state.mail.clickedMessages;

export default mailSlice.reducer;
