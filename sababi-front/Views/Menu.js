import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Center, VStack, NativeBaseProvider, ScrollView,Button } from 'native-base';
import { PersonAdd } from '../Componnats/PersonAdd';
import { AddClass } from '../Model/AddClass';

const Stack = createNativeStackNavigator();

export function Menu({navigation}) {

  let addClass = new AddClass;
  addClass.age = 26;
  addClass.description = "temp temp temp temp tmep ";
  addClass.job = "temp";
  addClass.name = "temp temp";
  addClass.rating = "22"

  const validate = () => {
    console.log("CLIKED!!")
  };

  return (
    <NativeBaseProvider alignItems="center">
      <ScrollView backgroundColor="black">
        <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290">
          <VStack space={3} mt="5">
              <PersonAdd data={addClass}>
              </PersonAdd>
              <Button
                mt="2" 
                colorScheme="indigo"
                title="Edit information"
                onPress={validate}>
                Edit information
              </Button>
              <Button
                mt="2" 
                colorScheme="indigo"
                title="Settings">
                Settings
              </Button>
              <Button
                mt="2" 
                colorScheme="red"
                title="Log Out">
                Log out
              </Button>
          </VStack>
          </Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}