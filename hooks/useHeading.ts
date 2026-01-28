// hooks/useHeading.ts
import { Magnetometer } from "expo-sensors";
import { useEffect, useState } from "react";

export function useHeading() {
    const [heading, setHeading] = useState(0);

    useEffect(() => {
        const sub = Magnetometer.addListener(data => {
            let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
            angle = angle >= 0 ? angle : angle + 360;
            setHeading(angle);
        });

        Magnetometer.setUpdateInterval(500);
        return () => sub.remove();
    }, []);

    return heading; // 0–360°
}
