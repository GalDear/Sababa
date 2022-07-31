import React, {useState,setState,useMemo} from "react";
import { ScrollView, Switch, Box, Heading, Text, Center, Input, FormControl, Button, NativeBaseProvider, VStack, View, HStack } from "native-base";
import Media from '../Componnats/UploadMedia';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";





export function Register({useStateFigure}) {
    const [selected, setSelected] = React.useState(0);
    const [email, setEmail] = useState("");

    {/* For the switcher that you choose if you are recruier or worker */}
    const [enabled, setEnabled] = React.useState(false)
    const toggleSwitch = () => {
        setEnabled(oldValue => !oldValue)
      }
      const thumbColorOn = Platform.OS === "android" ? "#0cd1e8" : "#f3f3f3"
      const thumbColorOff = Platform.OS === "android" ? "#f04141" : "#f3f3f3"
      const trackColorOn = Platform.OS === "android" ? "#98e7f0" : "#0cd1e8"
      const trackColorOff = Platform.OS === "android" ? "#f3adad" : "#f04141"



      const handleInputChange = (e) => {
              
          const {id , value} = e;
            console.log(id,value);
          if(id === "fulltName"){
              setFirstName(value);
          }
          if(id === "email"){
            console.log(value);
              setEmail(value);
          }
          if(id === "password"){
              setPassword(value);
          }
          if(id === "confirmPassword"){
              setConfirmPassword(value);
          }
          if(id === "phoneNumber"){
              setPhoneNumber(value);
          }
          if(id === "userType"){
              setUserType(value);
          }
          if(id === "description"){
              setDescription(value);
          }
      
      }


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
            <FormControl>       {/* Full Name */}
              <FormControl.Label>Full name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>       {/* Email */}
              <FormControl.Label>Email</FormControl.Label>
              <Input id="email" value={email} onPress = {(e) => handleInputChange(e)} placeholder="Eamil"/>
              {/* <Input /> */}
            </FormControl>
            <FormControl>       {/* Password */}
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>       {/* Confirm Password */}
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>       {/* Phone Number */}
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input />
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
                <Input />
            </FormControl>
            <FormControl>
                <FormControl.Label>Skills</FormControl.Label>
                <Input />
                </FormControl>
            <FormControl>
                <FormControl.Label>Gender</FormControl.Label>
                <Input />
            </FormControl> 
            <FormControl>
                <FormControl.Label>Birthday</FormControl.Label>
                <Input />
            </FormControl>    
            </FormControl>
            : 
            <FormControl alignItems={"center"}>     {/* Recruiter */} 
            <FormControl>
                <FormControl.Label>Company Founding</FormControl.Label>
                <Input />
            </FormControl> 
            <FormControl>
                <FormControl.Label>Country</FormControl.Label>
                <Input />
            </FormControl> 
            <FormControl>
                <FormControl.Label>Line Of Business </FormControl.Label>
                <Input />
            </FormControl> 
            </FormControl>
             }{/* Finished with type of account */} 


            <FormControl>           {/* Description */} 
                <FormControl.Label>Description</FormControl.Label>
                <Input
                multiline={true}
                numberOfLines={10}
                style={{ height:200, textAlignVertical: 'top',}}/>
            </FormControl> 
            
            {/* On press will moved to login page*/}  
            <Button mt="2" colorScheme="indigo" onPress={() => [useStateFigure(0),setSelected(0)]}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
      </ScrollView>
      </NativeBaseProvider>);
  };