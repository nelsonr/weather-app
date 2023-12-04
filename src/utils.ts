import { fetchWeatherApi } from "openmeteo";

export function getUserGeolocation (): Promise<GeolocationPosition | GeolocationPositionError> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => resolve(position),
            (positionError: GeolocationPositionError) => reject(positionError)
        );
    });
}

export async function getLocalTemperature (location: GeolocationPosition) {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        current: "temperature_2m"
    };

    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: current.variables(0)!.value(),
        },

    };
    return weatherData.current.temperature;
}
