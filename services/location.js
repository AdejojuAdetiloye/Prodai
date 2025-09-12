import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }
  const location = await Location.getCurrentPositionAsync({});
  return location;
};

export const getCurrencyFromLocation = (latitude, longitude) => {
  // Simple logic: if in Nigeria (approx), use NGN, else USD
  if (latitude >= 4 && latitude <= 14 && longitude >= 3 && longitude <= 15) {
    return 'NGN';
  }
  return 'USD';
};