export function getUserGeolocation (): Promise<GeolocationPosition | GeolocationPositionError> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => resolve(position),
            (positionError: GeolocationPositionError) => reject(positionError)
        );
    });
}
