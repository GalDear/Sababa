import React from 'react';
import 'react-native-gesture-handler';

import Login from './pages/Login';
import Signup from './pages/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Drawer } from 'native-base';



const Stack = createStackNavigator();

// function App(){
//   return (
//     <SafeAreaProvider>
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Login" component={Login}/>
//       <Stack.Screen name="Signup" component={Signup}/>
//     </Stack.Navigator>
//     </SafeAreaProvider>
//   );
// }

const App = () => {
  <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <drawerContent {...props}/>}>
      <Drawer.Screen name="Login" component={Login}/>
    </Drawer.Navigator>
  </NavigationContainer>
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
