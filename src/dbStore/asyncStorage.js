import { AsyncStorage } from 'react-native';

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return JSON.parse(value)
    } catch (error) {
        return null;
        // Error retrieving data
        console.log("ERROR: ", error);
    }
}

export const setData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return null;
        // Error saving data
        console.log("ERROR: ", error);
    }
}