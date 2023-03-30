import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn(user, {payload: loggedInUser}) {
            return loggedInUser // cia pakeiciam state
        },
        userLoggedOut() {
            return initialState
        }
    }
})


export default userSlice.reducer
export const { userLoggedIn, userLoggedOut } = userSlice.actions