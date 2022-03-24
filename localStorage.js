import AsyncStorage from '@react-native-async-storage/async-storage';


export const getData = async (key) => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const setData = async (key, value) => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.setItem(key, value);
      console.log(data);
      if (data !== null) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };