import { StyleSheet, View } from "react-native";
import { Map } from "../components/Map";
import { useLocationStore } from "../stores/location/useLocationStore";
import { LoadingScreen } from "./LoadingScreen";
import { useEffect } from "react";


export const MapScreen = () => {

    const { lastKnownLocation, getLocation } = useLocationStore();

    useEffect(() => {
        if( lastKnownLocation === null ){
            getLocation();
        }
    }, []);
    

    if( lastKnownLocation == null ) return <>
        <LoadingScreen />
    </>

    return <>
        <View style={styles.container}>
            <Map
                initialLocation={ lastKnownLocation }
            />
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
