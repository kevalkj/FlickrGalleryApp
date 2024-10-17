import axios from "../../axios";
import { getToken } from "../utility/auth";

export const getWalletDetails = async () => {
    try {
        const response = await axios.get("/transac/my-wallet", {
            headers: {
                token: getToken(),
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching wallet details:", error);
        throw new Error("Failed to fetch wallet details.");
    }
};

export const topUpWalletS1 = async (amount) => {
    try {
        const response = await axios.post("/transac/wallet-top-up-s1", { amount }, {
            headers: {
                token: getToken(),
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error topping up wallet S1:", error);
        throw new Error("Failed to top up wallet.");
    }
};

export const topUpWalletS2 = async (amount, orderId) => {
    try {
        const response = await axios.post("/transac/wallet-top-up-s2", { amount, orderId }, {
            headers: {
                token: getToken(),
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error topping up wallet S2:", error);
        throw new Error("Failed to top up wallet.");
    }
};
