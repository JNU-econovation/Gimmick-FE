import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkUserType = async () => {
    try {
        const userType = await AsyncStorage.getItem('userType');
        return userType === null ? 'local' : userType;
    } catch (error) {
        console.error('AsyncStorage 에러:', error);
        return null;
    }
};

export const setUserType = async (userType) => {
    try {
        await AsyncStorage.setItem('userType', userType);
    } catch (error) {
        console.error('AsyncStorage 에러:', error);
    }
};

export const setLocalUser = async () => {
    await setUserType('local');
};

export const setGoogleUser = async () => {
    await setUserType('google');
};
