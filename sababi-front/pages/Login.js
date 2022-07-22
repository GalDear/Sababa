import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';


function Login(){
    const navigation = useNavigation();
    {/* Sign up */}
    {/* Email - username*/}
    {/* Password*/}
    {/* Button */}
    {/* Line */}
    {/* Box */}

    return(
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Login</Text>
            </View>
            <View style={styles.text2}>         
                <Text>Sign up here</Text>
                <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
                    <Text style={styles.Signup}>Sign up</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonStyle}>
                <View style={styles.emailInput}>
                    <Input InputLeftElement={
                        <Icon 
                            as={<FontAwesome5 name="user-secret"/>}
                            size="sm"
                            m={2}
                            _light={{
                                color: 'black',
                            }}
                            _dark={{
                                color: 'gray',
                            }}
                        />
                    }
                    varient="outline"
                    placeholder="Email"
                    _light={{
                        placeholderTextColor: "blueGray"
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray"
                    }}
                    />    
                </View>
            </View>


                <View style={styles.buttonStyle}>
                    <View style={styles.emailInput}>
                        <Input
                            InputLeftElement={
                                <Icon 
                                    as={<FontAwesome5 name="key"/>}
                                    size="sm"
                                    m={2}
                                _light={{
                                    color: 'black',
                                }}
                                _dark={{
                                    color: 'gray',
                                }}
                                />
                            }
                    varient="outline"
                    placeholder="Password"
                    secureTextEntry={true}
                    _light={{
                        placeholderTextColor: "blueGray"
                    }}
                    _dark={{
                        placeholderTextColor: "blueGray"
                    }}
                    /> 
                    </View>
                </View>


                <View style={styles.buttonStyle}>   
                    <Button style={styles.buttonDesign}>
                        Login
                    </Button>
                </View>   


                <View style={styles.lineStyle}>   
                    <View style={{flex:1,height:1,backgroundColor:'black'}}/>
                    <View>
                        <Text style={{width:50,textAlign:'center'}}>Or</Text> 
                    </View>
                    <View style={{flex:1,height:1,backgroundColor:'black'}}/>
                </View>



                    <View style={styles.lineStyle}>
                        <Box
                        onPress={()=> navigation.navigate('#')}
                        style={{height:80,width:80}}
                        SHADOW={3}
                        _light={{
                            placeholderTextColor: "gray"
                        }}
                        _dark={{
                            placeholderTextColor: "gray"
                        }}
                        >
                            <AspectRatio ratio={1/1}>
                                <Image
                                    roundedTop='lg'
                                    source={{ uri:"https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"}}
                                    alt="image"
                                />
                            </AspectRatio>


                        </Box>

                    </View>

        </View>
    )
}



export default ()=> {
    return (
        <NativeBaseProvider>
            <Login/>
        </NativeBaseProvider>
    )
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
    },
    LoginText:{
        marginTop:100,
        fontSize:30,
        fontWeight:"bold",
    },
    Middle:{
        alignItems:"center",
        justifyContent:"center",
    },
    text2:{
        flexDirection:"row",
        justifyContent:"center",
        paddingTop:5
    },
    Signup:{
        fontWeight:"bold",
    },
    emailInput:{
        marginTop:100,
        marginRight:5
    },
    buttonStyle:{
        marginTop:30,
        marginRight:5,
        marginLeft:15
    },
    buttonStyleX:{
        marginTop:12,
        marginRight:5,
        marginLeft:15
    },
    buttonDesign:{
        backgroundColor:"#026efd"
    },
    lineStyle:{
        flexDirection:"row",
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        alignItems:"center"
    },
    boxStyle:{
        flexDirection:"row",
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        alignItems:"space-around"
    }

})

