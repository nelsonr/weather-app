import { useEffect, useState } from 'react';
import { getUserGeolocation } from './utils';
import './App.css'

function App () {
    const [userLocation, setUserLocation] = useState<GeolocationPosition | GeolocationPositionError>()

    useEffect(() => {
        const tryToGetUserLocation = async () => {
            try {
                setUserLocation(await getUserGeolocation());
            } catch (error) {
                setUserLocation(error as GeolocationPositionError);
            }
        }

        if (!userLocation) {
            tryToGetUserLocation();
        }
    }, [userLocation, setUserLocation]);

    if (userLocation instanceof GeolocationPosition) {
        return (
            <div>
                <strong>Latitude:</strong> {userLocation.coords.latitude}&nbsp;
                <strong>Longitude:</strong> {userLocation.coords.longitude}
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
