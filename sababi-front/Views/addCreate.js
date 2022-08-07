import * as React from 'react';
import { View, Text, Button,ScrollView,NativeBaseProvider,FormControl,VStack,Box,Center,Input,TextInput,styles } from 'native-base';

export function AddCreate({navigation}) {
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" >
            <VStack >
            <FormControl>
                <FormControl.Label>Company Founding</FormControl.Label>
                <Input onChangeText={text => handleOnchange(text, 'companyFounding')}/>
            </FormControl> 
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}