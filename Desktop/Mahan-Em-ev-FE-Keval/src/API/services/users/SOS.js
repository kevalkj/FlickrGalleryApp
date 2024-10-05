import axios from "./axios"; 
import { getToken } from "./auth"; 

const connectToCustomerService = async (userId) => {
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

const notifyKin = async (userId, rideId) => {
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

const deleteContact = async (userId, contactId) => {
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

const getAllContacts = async (userId) => {
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

const handleSOS = async (userId, rideId) => {
    try {
        const token = getToken();
        if (!token) throw new Error("User is not authenticated");

        await connectToCustomerService(userId);
        await notifyKin(userId, rideId);

        console.log("SOS alert handled successfully!");
    } catch (error) {
        console.error("Error handling SOS alert:", error.message);
    }
};

const exampleUserId = "dynamicUserId"; 
const exampleRideId = "dynamicRideId";
const exampleContactId = "dynamicContactId";


handleSOS(exampleUserId, exampleRideId);
deleteContact(exampleUserId, exampleContactId);
getAllContacts(exampleUserId);
