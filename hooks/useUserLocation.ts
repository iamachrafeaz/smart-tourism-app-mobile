import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useUserLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, []);

    return location;
}
