import axios from "../../axios"; 
import { useUserContext } from "../../../hooks/userContext";

export const useFetchFeedback = () => {
    const { getAccessToken } = useUserContext();
    const token = getAccessToken();

    const fetchFeedback = async (driverId) => {
        if (!token) {
            throw new Error("Token not found");
        }

        try {
            const response = await axios.get("/user/get-reviews", {
                headers: {
                    token: token,
                },
                params: {
                    driver: driverId,
                },
            });

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.error.message);
            }
        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch feedback");
        }
    };

    return fetchFeedback;
};
