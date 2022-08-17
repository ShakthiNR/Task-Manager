import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = false

export const opendivSlice = createSlice({
    name:"opendiv",
    initialState:{value:initialStateValue},
    reducers:{
        activateDiv: (state,action)=>{
            state.value=action.payload
        }
    }
})

export default opendivSlice.reducer 
export const {activateDiv} = opendivSlice.actions 