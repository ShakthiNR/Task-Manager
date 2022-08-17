import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = false

export const reloadSlice = createSlice({
    name:"reload",
    initialState:{value:initialStateValue},
    reducers:{
        makeReload: (state,action)=>{
            state.value=action.payload
        }
    }
})

export default reloadSlice.reducer 
export const {makeReload} = reloadSlice.actions 