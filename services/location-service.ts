import * as Location from "expo-location";

type Address = {
  street: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
};

type LocationResult =
  | { address: Address; denied: false }
  | { address?: undefined; denied: true }
  | { address?: undefined; denied: false };

async function getCurrentAddress(): Promise<LocationResult> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  console.log(status);
  if (status !== "granted") {
    return { denied: true };
  }

  const position = await Location.getCurrentPositionAsync();
  const [geo] = await Location.reverseGeocodeAsync({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });

  if (!geo) {
    return { denied: false };
  }

  return {
    denied: false,
    address: {
      street: geo.street || geo.name,
      neighborhood: geo.district || geo.subregion,
      city: geo.city || geo.subregion || geo.region,
      state: geo.region || geo.subregion,
      postalCode: geo.postalCode,
    },
  };
}

export const LocationService = {
  getCurrentAddress,
};
