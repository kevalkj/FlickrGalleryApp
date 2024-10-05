import axios from "axios";
import Config from "react-native-config";
const defaultURL = Config.REACT_APP_API_BASE_URL;

export default axios.create({
    baseURL: defaultURL,
});