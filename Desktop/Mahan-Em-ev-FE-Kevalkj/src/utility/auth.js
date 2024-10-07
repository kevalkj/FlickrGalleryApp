import { useUserContext } from "../hooks/userContext";

export const getToken = () => {
    const { getAccessToken } = useUserContext();
    return getAccessToken();
};
