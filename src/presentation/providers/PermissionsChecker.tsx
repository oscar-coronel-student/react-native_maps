import { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { userPermissionStore } from "../stores/permission/usePermissionStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../navigation/StackNavigator";



export const PermissionsChecker = ({
    children
}: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = userPermissionStore();

    const navigation: NavigationProp<RootStackParams> = useNavigation();

    useEffect(() => {
        if( locationStatus === 'granted' ){
            navigation.reset({
                index: 0,
                routes: [{ name: 'MapScreen' }]
            });
        } else if ( locationStatus !== 'undetermined' ){
            navigation.reset({
                index: 0,
                routes: [{ name: 'PermissionsScreen' }]
            });
        }
    }, [locationStatus]);


    useEffect(() => {
        checkLocationPermission();
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if( nextAppState === 'active' ){
                checkLocationPermission();
            }
        });
        return () => {
            subscription.remove();
        }
    }, [])


    return <>
        { children } 
    </>
}