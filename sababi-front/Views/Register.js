import React, {useState,setState,useMemo} from "react";
import { Keyboard, ScrollView, Switch, Box, Heading, Text, Center,  FormControl, Button, NativeBaseProvider, VStack, View, HStack } from "native-base";
import {StyleSheet, TextInput,Alert} from 'react-native';
import Media from '../Componnats/UploadMedia';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../Componnats/Input';




export function Register({useStateFigure}) {
    // const [selected, setSelected] = React.useState(0);


    {/* For the switcher that you choose if you are recruier or worker */}
    const [enabled, setEnabled] = React.useState(false)
    const toggleSwitch = () => {
        setEnabled(oldValue => !oldValue)
      }
      const thumbColorOn = Platform.OS === "android" ? "#0cd1e8" : "#f3f3f3"
      const thumbColorOff = Platform.OS === "android" ? "#f04141" : "#f3f3f3"
      const trackColorOn = Platform.OS === "android" ? "#98e7f0" : "#0cd1e8"
      const trackColorOff = Platform.OS === "android" ? "#f3adad" : "#f04141"



      


      const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
        confirm_password: '',
        Image: '',  // ?
        companyFounding: '', 
        country: '', 
        lineOfBusiness: '', 
        jobTitle: '', 
        skills: '', 
        gender: '', 
        age: '', 
        description: '',
        type: '',
      });
      const [errors, setErrors] = React.useState({});
      const [loading, setLoading] = React.useState(false);
      
    
      const validate = async() => {
        let isValid = true;
        
        if (!inputs.email) {
          handleError('Please input email', 'email');
          isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
          handleError('Please input a valid email', 'email');
          isValid = false;
        }
    
        if (!inputs.fullname) {
          handleError('Please input fullname', 'fullname');
          isValid = false;
        }
    
        if (!inputs.phone) {
          handleError('Please input phone number', 'phone');
          isValid = false;
        }
    
        if (!inputs.password) {
          handleError('Please input password', 'password');
          isValid = false;
        } else if (inputs.password.length < 5) {
          handleError('Min password length of 5', 'password');
          isValid = false;
        }

        if (!inputs.confirm_password) {
            handleError('Please input confirm password', 'confirm_password');
          isValid = false;
        } else if (inputs.password != inputs.confirm_password) {
          handleError('Incorrect confirm password', 'confirm_password');
          isValid = false;
        }
        if (enabled) {inputs.type= 1} else {inputs.type= 0}
       
        if (isValid) {
          useStateFigure(0);
          setSelected(0);
          await register();
        }
      };
    
      const register = async() => {
        try {
          // setLoading(false);
          // AsyncStorage.setItem('userData', JSON.stringify(inputs));
          console.log(inputs) // for test
          await fetch('http://192.168.1.6:8081/api/registration',
          {
            method: 'POST',
            body:JSON.stringify(inputs)
          })
          .then((response) => response.json())
          .then((data) => {
          console.log(data)});
        } catch (error) {
          console.log(error)
          Alert.alert('Error', 'Something went wrong');
        }

      };
    
      const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
      };
      const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };



    return (<NativeBaseProvider>
        <ScrollView>
        <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading size="lg" color="coolGray.800" textAlign={"center"} fontSize="40" _dark={{
          color: "warmGray.50" 
        }} fontWeight="bold">
            Welcome
          </Heading>
          <Heading mt="1" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }} fontWeight="medium" textAlign={"center"} size="xs">
            Sign up to continue!
          </Heading>
          
          
          <VStack space={3} mt="5">
          <Heading mt="1" color="#ff0000" _dark={{
        }} fontWeight="medium" size="xs">
            * Required labels 
          </Heading>
            <FormControl>       {/* Full Name */}
              <FormControl.Label>* Full name</FormControl.Label>
              <Input 
              onChangeText={text => handleOnchange(text, 'fullname')}
              onFocus={() => handleError(null, 'fullname')}
              iconName="account-outline"
              placeholder="Enter your full name"
              error={errors.fullname}
              />
            </FormControl>
            <FormControl>       {/* Email */}
              <FormControl.Label>* Email</FormControl.Label>
              {/* value={email} onChange = {(e) => handleInputChange(e)} placeholder="Eamil" */}
              <Input 
              id="email" 
              onChangeText={text => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              placeholder="Enter your email address"
              error={errors.email} />
              {/* <Input /> */}
            </FormControl>
            <FormControl>       {/* Password - should be equal or above 5 characters */}
              <FormControl.Label>* Password</FormControl.Label>
              <Input 
                  onChangeText={text => handleOnchange(text, 'password')}
                  onFocus={() => handleError(null, 'password')}
                  iconName="lock-outline"
                  placeholder="Enter your password"
                  error={errors.password}
                  password
               />
            </FormControl>
            <FormControl>       {/* Confirm Password */}
              <FormControl.Label>* Confirm Password</FormControl.Label>
              <Input 
                onChangeText={text => handleOnchange(text, 'confirm_password')}
                onFocus={() => handleError(null, 'confirm_password')}
                iconName="lock-outline"
                placeholder="Enter your password to confirm"
                error={errors.confirm_password}
                confirm_password
               />
            </FormControl>
            <FormControl>       {/* Phone Number */}
              <FormControl.Label>* Phone Number</FormControl.Label>
              <Input 
                keyboardType="numeric"
                onChangeText={text => handleOnchange(text, 'phone')}
                onFocus={() => handleError(null, 'phone')}
                label="Phone Number"
                placeholder="Enter your phone no"
                error={errors.phone}
              />
            </FormControl>
            <FormControl>       {/* Upload Image */}
              <FormControl.Label>Upload Profile Image </FormControl.Label>
              <View height={10}><Media></Media></View>
            </FormControl>




            <FormControl alignItems={"center"}>     {/* Switcher. Choosing if you are recruier or worker */}
            <HStack alignItems={"center"} space={4}>
                <Text>Recruiter</Text>
                      <Switch
                    onValueChange={toggleSwitch}
                    value={enabled}
                    thumbColor={enabled ? thumbColorOn : thumbColorOff}
                    trackColor={{ false: trackColorOff, true: trackColorOn }}
                    ios_backgroundColor={trackColorOff}
                    />
                <Text>Worker</Text>
            </HStack>
            </FormControl>
 
            {/* Will perfom */}
            {enabled ?                              
            <FormControl alignItems={"center"}>     {/* Worker */}   
            <FormControl>
                <FormControl.Label>Job Title</FormControl.Label>
                <Input 
                id="jobTitle"
                onChangeText={text => handleOnchange(text, 'jobTitle')}
                />
            </FormControl>
            <FormControl>
                <FormControl.Label>Skills</FormControl.Label>
                <Input 
                id="skills"
                onChangeText={text => handleOnchange(text, 'skills')}
                />
                </FormControl>
            <FormControl>
                <FormControl.Label>Gender</FormControl.Label>
                <Input 
                id="gender"
                onChangeText={text => handleOnchange(text, 'gender')}
                />
            </FormControl> 
            <FormControl>
                <FormControl.Label>Age</FormControl.Label>
                <Input 
                id="age"
                onChangeText={text => handleOnchange(text, 'age')}
                />
            </FormControl>    
            </FormControl>
            : 
            <FormControl alignItems={"center"}>     {/* Recruiter */} 
            <FormControl>
                <FormControl.Label>Company Founding</FormControl.Label>
                <Input 
                onChangeText={text => handleOnchange(text, 'companyFounding')}
                />
            </FormControl> 
            <FormControl>
                <FormControl.Label>Country</FormControl.Label>
                <Input 
                id="country"
                onChangeText={text => handleOnchange(text, 'country')}
                />
            </FormControl> 
            <FormControl>
                <FormControl.Label>Line Of Business </FormControl.Label>
                <Input 
                id="lineOfBusiness"
                onChangeText={text => handleOnchange(text, 'lineOfBusiness')}
                />
            </FormControl> 
            </FormControl>
             }{/* Finished with type of account */} 


            <FormControl>           {/* Description */} 
                <FormControl.Label >Description</FormControl.Label>
                <TextInput 
                id="description"
                style={styles.descriptionInput}
                multiline 
                numberOfLines={10} 
                maxLength={300}
                onChangeText={text => handleOnchange(text, 'description')}
                />

            </FormControl> 
            
            {/* Sign up button. On press will moved to login page*/}  
            <Button 
            mt="2" 
            colorScheme="indigo"
            onPress={validate}
            title="Register">
              Sign up
            </Button>

            <Text
            onPress={() => {useStateFigure(0),setSelected(0)}}
            style={{
              color: "#000000",
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Already have account? Click here
          </Text>

          </VStack>
        </Box>
      </Center>
      </ScrollView>
      </NativeBaseProvider>);
  };



  const styles=StyleSheet.create({
    descriptionInput:{
      textAlignVertical:"top",
      height:200,
      backgroundColor:"#F3F4FB"
    }
  })

