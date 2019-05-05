import { AsyncStorage } from 'react-native';

export async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to storeData:', error);
  }
}

export async function retrieveData(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to retrieveData:', error);
  }
}
