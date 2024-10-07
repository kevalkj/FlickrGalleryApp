import { createSlice } from "@reduxjs/toolkit";

export const rideSlice = createSlice({
    name: "ride",
    initialState: {
        pickupLocation : null,
        dropoffLocation : null,
        vehicle : null,
        stops : [],
        scheduleTime : null,
    },
    reducers: {
        setPickupLocation: (state, action) => {
            state.pickupLocation = action.payload;
        },
        setDropoffLocation: (state, action) => {
            state.dropoffLocation = action.payload;
        },
        setVehicle: (state, action) => {
            state.vehicle = action.payload;
        },
        setStops: (state, action) => {
            state.stops = action.payload;
        },
        setScheduleTime: (state, action) => {
            state.scheduleTime = action.payload;
        },
    },
    
});

export const { setPickupLocation, setDropoffLocation, setVehicle, setStops, setScheduleTime } = rideSlice.actions;

export default rideSlice.reducer;