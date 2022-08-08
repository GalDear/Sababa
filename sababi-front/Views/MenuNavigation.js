import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Settings } from './Settings';
import {Menu} from './Menu'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function MenuNavigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator>
              <Stack.Screen name="Menu" component={Menu} options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor:"white"
            }}/>
              <Stack.Screen name="Settings" component={Settings} options={{
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor:"white"
            }}/>
            </Stack.Navigator>
        </NavigationContainer>
      );
    }
    


