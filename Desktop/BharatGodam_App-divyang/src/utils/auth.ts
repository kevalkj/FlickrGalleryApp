import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('userName');
  } catch (error) {
    console.error(error);
  }
};

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error(error);
  }
};

export const storeRole = async (role: string) => {
  try {
    await AsyncStorage.setItem('userRole', role);
  } catch (error) {
    console.error(error);
  }
};
export const storeName = async (name: string) => {
  try {
    await AsyncStorage.setItem('userName', name);
  } catch (error) {
    console.error(error);
  }
};
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const getRole = async () => {
  try {
    const role = await AsyncStorage.getItem('userRole');
    return role;
  } catch (error) {
    console.error(error);
  }
};
export const getName = async () => {
  try {
    const role = await AsyncStorage.getItem('userName');
    return role;
  } catch (error) {
    console.error(error);
  }
};

export const set = async (key: string, value: any) => {
  try {
    const role = await AsyncStorage.setItem(key, value);
    return role;
  } catch (error) {
    console.error(error);
  }
};

export const get = async (key: string) => {
  try {
    const role = await AsyncStorage.getItem(key);
    return role;
  } catch (error) {
    console.error(error);
  }
};
