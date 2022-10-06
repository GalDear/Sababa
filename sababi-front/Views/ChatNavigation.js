import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MessagesScreen } from './Messages';
import { ChatScreen } from './Chat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export function ChatNavigation () {
  return(
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Chats" component={MessagesScreen} />
    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params[0],
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
  </NavigationContainer>
);}