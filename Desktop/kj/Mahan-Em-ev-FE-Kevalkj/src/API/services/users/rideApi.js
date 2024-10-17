import axios from "../../axios";
import { useSelector } from "react-redux";

export const useRide = () => {
    const token = useSelector(state => state.user.token);
    const pickUpLocation = useSelector(state => state.ride.pickupLocation) ;
    const dropLocation = useSelector(state => state.ride.dropoffLocation);
    const vehicle = useSelector(state => state.ride.vehicle);
    const stops = useSelector(state => state.ride.stops);
    const scheduleTime = useSelector(state => state.ride.scheduleTime);
    async function bookRide() {
        const data = scheduleTime ? {
            pickupLocation: {type : "Point" , coordinates : pickUpLocation.coordinate},
            dropoffLocation: {type : "Point" , coordinates : dropLocation.coordinate},
            vehicle,
            stops: stops.map(stop => ({type : "Point" , coordinates : stop.coordinate})),
            "startTime_orScheduleTo": scheduleTime,
        } : {
            pickupLocation: {type : "Point" , coordinates : pickUpLocation.coordinate},
            dropoffLocation: {type : "Point" , coordinates : dropLocation.coordinate},
            vehicle,
            stops: stops.map(stop => ({type : "Point" , coordinates : stop.coordinate}))
        }
        console.log("bookRide", JSON.stringify(data), "\ntoken", token) ;
        let response;
        try{
            console.log("Requesting ride");
            response = await axios.post("/user/rides", data, {
                headers: {
                    token
                }
            })
            console.log("Response", response.data);
        }catch(error){
            console.log(error);
            throw new Error("Internal server error");
        }
        if(response.data.success){
            console.log("Ride booked successfully");
        return response.data;
        }
        else{
            throw new Error(response.data.error.code);
        }
    }
    return bookRide;
}

export const getAllRides = async (token) => {
    let response;
    try{
        response = await axios.get("/user/rides", {
            headers: {
                token
            }
        })
    }catch(error){
        console.log(error);
        throw new Error("Internal server error");
    }
    if(response.data.success){
        console.log("Rides fetched successfully");
        return response.data;
    }
    else{
        throw new Error(response.data.error.code);
    }
}