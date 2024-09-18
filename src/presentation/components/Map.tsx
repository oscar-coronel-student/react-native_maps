import { Platform } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Location } from "../../infrastructure/interfaces/location";
import { FAB } from "./FAB";
import { useEffect, useRef, useState } from "react";
import { useLocationStore } from "../stores/location/useLocationStore";


interface Props {
    showsUserLocation?: boolean
    initialLocation: Location
}

export const Map = ({
    showsUserLocation = true,
    initialLocation
}: Props) => {
    const locationRef = useRef<Location>(initialLocation);
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [showPolylines, setShowPolylines] = useState(true);

    const mapRef = useRef<MapView|null>(null);
    const { getLocation, watchLocation, clearWatchLocation, lastKnownLocation, userLocations } = useLocationStore();

    const moveCameraToLocation = (location: Location) => {
        if( !mapRef.current ) return;
        mapRef.current.animateCamera({
            center: location,
            // zoom: 15,
        });
    }

    const moveToCurrentLocation = async () => {
        const location = await getLocation();
        !!location && moveCameraToLocation(location);
    }


    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        }
    }, []);


    useEffect(() => {
        if( !!lastKnownLocation && isFollowingUser ){
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser])


    return <>
        <MapView
            ref={ mapRef }
            showsUserLocation={ showsUserLocation }
            provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            onTouchStart={ () => setIsFollowingUser( false ) }
            region={{
                latitude: locationRef.current.latitude,
                longitude: locationRef.current.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >
            {
                showPolylines && <>
                    <Polyline
                        coordinates={ userLocations }
                        strokeColor="red"
                        strokeWidth={5}
                    />
                </>
            }

            {/* <Marker
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324
                }}
                title="Test"
                description="Test Description 2"
                image={require('../../assets/custom-marker.png')}
            /> */}
        </MapView>

        <FAB
            iconName={ showPolylines ? 'eye' : 'eye-slash' }
            onPress={ () => setShowPolylines( !showPolylines ) }
            style={{
                bottom: 140,
                right: 20
             }}
        />
        <FAB
            iconName={ isFollowingUser ? 'walking' : 'universal-access' }
            onPress={ () => setIsFollowingUser( !isFollowingUser ) }
            style={{
                bottom: 80,
                right: 20
             }}
        />
        <FAB
            iconName="compass"
            onPress={ moveToCurrentLocation }
            style={{
                bottom: 20,
                right: 20
             }}
        />
    </>
}