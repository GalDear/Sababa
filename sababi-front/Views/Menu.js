import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { Settings } from './Settings';
import { ExtraSettings } from './ExtraSettings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function Menu() {
    return (
        <NavigationContainer>
        <View style={{
          height: '95%'
        }}>
        <Stack.Navigator style={{height:"95%"}}>
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ExtraSettings" component={ExtraSettings} />
        </Stack.Navigator>
        </View>
      </NavigationContainer>
    );
  }


  