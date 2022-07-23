import * as React from 'react';
import { View, Text, Button } from 'react-native';

export function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        
        <Button title="home2" onPress={() => navigation.navigate('Home2')}/>
      </View>
    );
  }