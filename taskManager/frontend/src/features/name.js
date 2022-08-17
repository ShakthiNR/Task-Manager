import { createSlice } from "@reduxjs/toolkit"

const initialStateValue = ""

export const nameSlice = createSlice({
    name:"name",
    initialState:{value:initialStateValue},
    reducers:{
        updateName: (state,action)=>{
            state.value=action.payload
        }
    }
})

export default nameSlice.reducer 
export const {updateName} = nameSlice.actions 