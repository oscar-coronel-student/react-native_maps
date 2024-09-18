import { createStackNavigator } from "@react-navigation/stack"
import { MapScreen } from "../screens/MapScreen";
import { PermissionsScreen } from "../screens/PermissionsScreen";
import { LoadingScreen } from "../screens/LoadingScreen";


export type RootStackParams = {
    MapScreen: undefined
    PermissionsScreen: undefined
    LoadingScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return <>
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name='LoadingScreen' component={ LoadingScreen } />
            <Stack.Screen name='MapScreen' component={ MapScreen } />
            <Stack.Screen name='PermissionsScreen' component={ PermissionsScreen } />
        </Stack.Navigator>
    </>
}
