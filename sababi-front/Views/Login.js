
import React from "react";
import { Box, Heading, Text, Center, Input, FormControl, Link, Button, NativeBaseProvider,HStack, VStack } from "native-base";
import {Alert} from 'react-native'

export function Login({useStateFigure}) {
    const [selected, setSelected] = React.useState();
    const [inputs, setInputs] = React.useState({
      email: '',
      password: '',
    })
    const [errors, setErrors] = React.useState({});
    

    const validate = async() => {
      let isValid = true;
      
      if (!inputs.email) {
        handleError('Please input email', 'email');
        isValid = false;
      }
      if (!inputs.password) {
        handleError('Please input password', 'password');
        isValid = false;
      }
     
      if (isValid) {
        // useStateFigure(0);
        
        await login();
      }
    };
  
    const login = async() => {
      try {
        // setLoading(false);
        // AsyncStorage.setItem('userData', JSON.stringify(inputs));
        console.log(inputs) // for test
        await fetch('http://192.168.1.5:8081/api/login',
        {
          method: 'POST',
          body:JSON.stringify(inputs)
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            useStateFigure(1)
            setSelected(1);
          }
          else {
            Alert.alert('Error', data.error);
          }
        console.log(data)});
      } catch (error) {
        console.log(error)
        Alert.alert('Error', error);
      }

    };

    const handleOnchange = (text, input) => {
      setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
      setErrors(prevState => ({...prevState, [input]: error}));
    };

    return (<NativeBaseProvider>
        <Center w="100%" style={{height:'100%'}}>
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontSize="40" fontWeight="bold" textAlign={"center"} color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" textAlign={"center"} fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
  
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input 
              id="email"
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              placeholder="Enter Email"
              error={errors.email}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" 
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              placeholder="Enter password"
              error={errors.password}
              password/>
              <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={validate}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={() => [useStateFigure(5),setSelected(5)]}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
      </NativeBaseProvider>);
  };