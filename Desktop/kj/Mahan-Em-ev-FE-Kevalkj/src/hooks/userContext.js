import { createContext, useState, useContext } from "react";

const UserContext = createContext();
const useUserContext =()=>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error("UserContext must be used within a UserProvider");
    }
    return context;
}
const UserProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token : null,
        user_verified : false,
    });
    logOut = () => {
        setAuthState({
            token : null,
            user_verified : false,
        });
    }

    getAccessToken = () => {
        if(authState.token){
            return authState.token;
        }
        else null;
    }

    return (
        <UserContext.Provider value={{ authState, setAuthState, logOut, getAccessToken }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, useUserContext };