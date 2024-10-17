export const validatePhoneNumber = (phoneNumber) => {
    // country code is optional
    const regEx = /^\+?[0-9]{10,14}$/;
    return regEx.test(phoneNumber);
}