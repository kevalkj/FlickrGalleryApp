import axios from "./axios";
import { getToken } from "./auth";
import { validatePhoneNumber } from "./validate";


export const loginUser = async (phone, otp) => {
    try {
        
        if (!validatePhoneNumber(phone)) {
            throw new Error("Invalid phone number format.");
        }

        const response = await axios.post('/user/login', {
            phone: phone,
            otp: otp
        });

        const { token, userId } = response.data;
        return { token, userId };
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
};


export const connectToCustomerService = async (userId) => {
    try {
        const token = getToken();
        if (!token) throw new Error("User is not authenticated");

        await axios.post(`/user/${userId}/connect-to-customer-service`, null, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log("Connected to customer service successfully!");
    } catch (error) {
        console.error("Error connecting to customer service:", error.message);
        throw error; 
    }
};


export const notifyKin = async (userId, rideId) => {
    try {
        const token = getToken();
        if (!token) throw new Error("User is not authenticated");

        await axios.post(`/user/${userId}/emergency-alert`, {
            rideId: rideId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log("Emergency alert sent to kin successfully!");
    } catch (error) {
        console.error("Error sending emergency alert:", error.message);
        throw error; 
    }
};


export const deleteContact = async (userId, contactId) => {
    try {
        const token = getToken();
        if (!token) throw new Error("User is not authenticated");

        await axios.delete(`/user/${userId}/emergency-contacts/${contactId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        console.log("Emergency contact deleted successfully!");
    } catch (error) {
        console.error("Error deleting emergency contact:", error.message);
        throw error; 
    }
};


export const getAllContacts = async (userId) => {
    try {
        const token = getToken();
        if (!token) throw new Error("User is not authenticated");

        const response = await axios.get(`/user/${userId}/emergency-contacts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Fetched all emergency contacts successfully!", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error fetching emergency contacts:", error.message);
        throw error; 
    }
};


export const handleSOS = async (rideId) => {
    try {
        const { authState } = useUserContext(); 

        if (!authState || !authState.token || !rideId) {
            throw new Error("Invalid user context or ride ID");
        }

        await connectToCustomerService(authState.userId);

        
        await notifyKin(authState.userId, rideId);

        console.log("SOS alert handled successfully!");
    } catch (error) {
        console.error("Error handling SOS alert:", error.message);
        
    }
};
