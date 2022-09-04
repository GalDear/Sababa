import * as React from 'react';
import { View, Text, Button,Heading,ScrollView,NativeBaseProvider,FormControl,VStack,Box,Center,Input } from 'native-base';
import {StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native'



export function AddCreate({navigation}) {
const getData = async () => {
    try {
      
      const value = await AsyncStorage.getItem('user_id');
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const [inputs, setInputs] = React.useState({
    JobTitle: '',
    Status: '',
    EstimatedTime: '',
    Image: '',  // ?
    Price: '', 
    Description: '', 
  });

  const validate = async () => {
    let isValid = true;
    
    if (!inputs.JobTitle) {
      handleError('Please input Job Title', 'JobTitle');
      isValid = false;
    } 

    if (!inputs.Status) {
      handleError('Please input Status', 'Status');
      isValid = false;
    }

    if (!inputs.EstimatedTime) {
      handleError('Please input phone Estimated time', 'EstimatedTime');
      isValid = false;
    }

    if (isValid) {
      console.log("Valid = true")
      await Publish();
      navigation.navigate('Home')

    }
    
    console.log("Valid = false after try to end")

  };

  const Publish = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const userId = await getData()
        console.log("try to handle")
        setLoading(false);
        // AsyncStorage.setItem('userData', JSON.stringify(inputs));
        console.log(inputs) // for test
        await fetch('http://192.168.1.5:8081/api/create_new_ad',{
          method: "POST",
          body: JSON.stringify([inputs,userId]),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(data)});
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <NativeBaseProvider>
      <ScrollView backgroundColor="blueGray.800">
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" >
            <VStack space={3} mt="5">
            {/* <FormControl>  
              <FormControl.Label>Upload Profile Image </FormControl.Label>
              <View height={10}><Media></Media></View>
            </FormControl> */}
            <FormControl>
                <FormControl.Label style={{color:"white"}}>* Job Title</FormControl.Label>
                <Input
                style={styles.InputStyle}
                onChangeText={text => handleOnchange(text, 'JobTitle')}
                />
            </FormControl>
            <FormControl>
                <FormControl.Label>* Status</FormControl.Label>
                <Input
                style={styles.InputStyle}
                onChangeText={text => handleOnchange(text, 'Status')}/>
            </FormControl> 
            <FormControl>
                <FormControl.Label>* Estimated time</FormControl.Label>
                <Input 
                style={styles.InputStyle}
                onChangeText={text => handleOnchange(text, 'EstimatedTime')}/>
            </FormControl> 
            <FormControl>
                <FormControl.Label >* Description</FormControl.Label>
                <Input                 
                style={styles.descriptionInput}
                multiline 
                numberOfLines={10} 
                maxLength={300}
                onChangeText={text => handleOnchange(text, 'Description')}/>
            </FormControl>
            <FormControl>
                <FormControl.Label>Price</FormControl.Label>
                <Input 
                style={styles.InputStyle}
                onChangeText={text => handleOnchange(text, 'Price')}/>
            </FormControl> 
            <Heading mt="1" color="#ff0000" _dark={{
        }} fontWeight="medium" size="xs">
            * Required labels 
          </Heading>
          <Button 
            mt="2" 
            colorScheme="indigo"
            title="Publish"
            onPress={validate}>
              Publish
            </Button>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles=StyleSheet.create({
  descriptionInput:{
    textAlignVertical:"top",
    height:200,
    backgroundColor:"#1e293b",
    color:"white"
  },
  InputStyle:{
    backgroundColor:"#1e293b",
    color:"white"
  }
})