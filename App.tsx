import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/presentation/navigation/StackNavigator";

import 'react-native-gesture-handler';
import { PermissionsChecker } from "./src/presentation/providers/PermissionsChecker";


export default function App() {

  return <NavigationContainer>
    <PermissionsChecker>
      <StackNavigator />
    </PermissionsChecker>
  </NavigationContainer>
}