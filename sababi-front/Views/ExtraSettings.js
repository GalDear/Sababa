import * as React from 'react';
import { View, Text, Button } from 'react-native';


export function ExtraSettings({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ExtraSettings</Text>
        <Button title="ExtraSettings" onPress={() => navigation.navigate('Settings')}/>
      </View>
    );
  }