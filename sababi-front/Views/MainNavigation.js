import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { MainScreen } from './MainScreen';
import { AddCreate } from './addCreate';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function MainNavigation() {
  return (
    <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainScreen} options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor:"white"
        }}/>
          <Stack.Screen name="New Add" component={AddCreate} options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor:"white"
        }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}



