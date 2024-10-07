import GeoLocation from "@react-native-community/geolocation";

export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        GeoLocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                if(error.code === 1){
                    
                    reject('Permission Denied');
                }
                else if(error.code === 2){
                    reject('Position Unavailable');
                }
                else if(error.code === 3){
                    reject('Timeout');
                }
                else{
                    reject(error.message);
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });
}