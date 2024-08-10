import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:0,
}

//  A function that accepts an initial state, an object full of reducer functions, and a "slice name", and
//  automatically generates action creators and action types that correspond to the reducers and state.
export const CounterSlice=createSlice({
    name:"counter",
    initialState,
    reducer:{
        increment:(state) => {
            state.value+=1;
        },
        decrement:(state) => {
            state.value-=1;
        }
    }
})

//fetching the functionality from action creator
export const {increment, decrement}=CounterSlice.actions;
export default CounterSlice.reducer;