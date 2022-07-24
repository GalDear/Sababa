import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { Image, Box,HStack,AspectRatio,Center,Text,Stack,Heading } from "native-base";

export function ExtraSettings({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ExtraSettings</Text>
        <Button title="ExtraSettings" onPress={() => navigation.navigate('Settings')}/>
      </View>
    );
  }