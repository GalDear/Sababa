import * as React from 'react';
import { Add } from '../Componnats/Add';
import { View,Text,NativeBaseProvider,Center, Box, Container,HStack, Heading,NBBox,Flex,Divider,Button} from 'native-base';
import {AddClass} from '../Model/AddClass'

export function MainScreen() {
  
  let myAddClass = new AddClass("Daniel George","Android Developer");

    return (
    
      <NativeBaseProvider>

            <Center marginTop="10%">
              <Heading>Sababi</Heading>
            </Center>

        <Flex direction="column" mb="2.5" mt="1.5" alignItems="center" marginTop="5%">
            <Center>
              
              <Add name = {myAddClass.name} job = {myAddClass.job}></Add>
            </Center>
          </Flex>

      </NativeBaseProvider>
      
  );    
};

