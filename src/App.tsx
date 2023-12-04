import { useEffect, useState } from 'react';
import { getLocalTemperature, getUserGeolocation } from './utils';
import './App.css'

function App () {
    const [userLocation, setUserLocation] = useState<GeolocationPosition | GeolocationPositionError>()
    const [currentTemperature, setCurrentTemperature] = useState<number>();

    useEffect(() => {
        const tryToGetUserLocation = async () => {
            try {
                const location = await getUserGeolocation();
                setUserLocation(location);

                return Promise.resolve(location as GeolocationPosition);
            } catch (error) {
                setUserLocation(error as GeolocationPositionError);

                return Promise.reject(error);
            }
        }

        const tryToGetLocalTemperature = async (location: GeolocationPosition) => {
            try {
                const temperature = await getLocalTemperature(location);

                setCurrentTemperature(Math.round(temperature));
            } catch (error) {
                console.error(error);
            }
        }

        if (!userLocation) {
            tryToGetUserLocation()
                .then((location: GeolocationPosition) => tryToGetLocalTemperature(location))
                .catch((reason) => console.error(reason));
        }
    }, [userLocation, setUserLocation]);

    if (userLocation instanceof GeolocationPosition) {
        return (
            <div>
                <strong>Latitude:</strong> {userLocation.coords.latitude}&nbsp;
                <strong>Longitude:</strong> {userLocation.coords.longitude}
                <p>Current temperature ouside is {currentTemperature}ºC</p>
            </div>
        );
    } else if (userLocation instanceof GeolocationPositionError) {
        return (
            <div>For the best experience, please enable Location on your device.</div>
        );
    }

    return (
        <div>Trying to find your location...</div>
    );
}

export default App
