import axiosInstance from "./axios";
import { getToken } from "./auth";

export const createRide = async (rideData) => {
    try {
        const token = getToken();
        const response = await axiosInstance.post('/user/rides', rideData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating ride:', error);
        throw error;
    }
};


export const getAllRides = async () => {
    try {
        const token = getToken();
        const response = await axiosInstance.get('/user/rides', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all rides:', error);
        throw error;
    }
};


export const getRideById = async (rideId) => {
    try {
        const token = getToken();
        const response = await axiosInstance.get(`/user/rides/${rideId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching ride with ID ${rideId}:`, error);
        throw error;
    }
};


export const addStopsToRide = async (rideId, stops) => {
    try {
        const token = getToken();
        const response = await axiosInstance.patch(`/user/rides/${rideId}/add-stops`, { stops }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding stops to ride with ID ${rideId}:`, error);
        throw error;
    }
};
