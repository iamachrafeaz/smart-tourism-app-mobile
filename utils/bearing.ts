// utils/bearing.ts
export function getBearing(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const toDeg = (v: number) => (v * 180) / Math.PI;

    const dLon = toRad(lon2 - lon1);

    const y = Math.sin(dLon) * Math.cos(toRad(lat2));
    const x =
        Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
        Math.sin(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.cos(dLon);

    return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
