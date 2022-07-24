import * as React from 'react';
import { View, Text, Button } from 'react-native';


export function Settings({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
        <Button title="Settings" onPress={() => navigation.navigate('ExtraSettings')}/>
      </View>
    );
  }