import axios from "../../axios";
import { validatePhoneNumber } from "../../../utility/validate";
import { useUserContext } from "../../../hooks/userContext";
import { useSelector ,useDispatch } from "react-redux";
import { setToken, updateLoggedIn, setPhone } from "../../../redux/slices/user";
export const useLogin = () => {
    // const { setAuthState } = useUserContext()
    const dispatch = useDispatch();
    const loginApi = async (phoneNo) => {
        // check phone number is correct or not
        if (!validatePhoneNumber(phoneNo)) {
            throw new Error("Invalid phone number");
        }
        try {
            const response = await axios.post("/user/registerOrLogin/user", { phone: phoneNo });
            // console.log(typeof response.data)
            console.log(response.data, response.data.data)
            if (response.data.success) {
                console.log(response.data.data.login , "login" ,response.data.data.token )
                if (response.data.data.login === false) {
                    // setAuthState({
                    //     token: response.data.data.token,
                    //     user_verified: false,
                    //     phoneNo: phoneNo
                    // });
                    dispatch(setToken(response.data.data.token));
                    dispatch(setPhone(phoneNo));
                }
                else{
                    // setAuthState({
                    // token : null,
                    // user_verified: false,
                    // phoneNo: phoneNo
                    // });

                    dispatch(setPhone(phoneNo));
                }
            }
            else if (response.data?.error?.code === "OTP_NOT_VERIFIED") {
                setAuthState({
                    token: null,
                    user_verified: false,
                    phoneNo: phoneNo
                })
                dispatch(setPhone(phoneNo));
            } else {
                throw new Error("Unexpected error occured");
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }
    return loginApi;
}

export const useVerification = () => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.user.token);
    const phone = useSelector(state => state.user.phone);
    const verifyApi = async (otp) => {
        // const token = getAccessToken();
        console.log("Inside The Verification API")
        console.log(token, phone, otp);
        try {
            if (token) {
                const response = await axios.post("/user/verify-otp", { otp }, {
                    headers: {
                        token
                    }
                });
                console.log(response.data);
                if (response.data.success) {
                    // setAuthState({
                    //     token: token,
                    //     user_verified: true,
                    //     phoneNo: authState.phoneNo
                    // });
                    dispatch(updateLoggedIn(true));
                } else {
                    throw new Error(response.data.error.message);
                }
                return response.data;
            } else {
                console.log(phone, otp);
                const response = await axios.post("user/login", {phone: phone, otp});
                console.log(response.data);
                if(response.data.success){
                    // setAuthState({
                    //     token: response.data.data.token,
                    //     user_verified: true,
                    //     phoneNo: authState.phoneNo
                    // });
                    dispatch(setToken(response.data.data.token));
                    dispatch(updateLoggedIn(true));
                    return response.data;
                }
                else{
                    throw new Error(response.data.error.message);
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    };
    return verifyApi;
}

export const requestOtp = async (phoneNo) => {
    axios.post("/user/request-otp", { phone: phoneNo }).then((response) => {
        return response.data.success;
    }).catch((error) => {
        throw new Error("Internal server error");
    })
}

export const useSetUpPin = () => {
    const token = useSelector(state => state.user.token);
    const setUpPinApi = async (pin) => {
        console.log("User Pin", pin, token);
            if (token) {
                try{

                    const response = await axios.put("/user/set-pin", { pin }, {
                        headers: {
                            token
                        }
                    });
                    console.log(response.data);
                    return response.data;
                }catch(error){
                    console.log(error);
                    throw new Error("Internal server error");
                }
            } else {
                console.log("Token Not Found")
               throw new Error("Token not found");
            }
    };
    return setUpPinApi;
}