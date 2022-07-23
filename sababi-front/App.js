// import React from "react";
// import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

// export default function App() {

//   const handlePress = () => console.log("dick");

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text onPress={handlePress}> Open up App.js to start working on your app!</Text>
//     </SafeAreaView>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React from "react";
// import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// //import { createStackNavigator } from '@react-navigation/stack';
// // import { registerRootComponent } from 'expo';
// // import App from './App';

// const Stack = createNativeStackNavigator();


// function ScreenA(){
//   return(
//     <View>
//       <Text>
//         Screen A
//       </Text>
//     </View>
//   )
// }

// export default function App(){
//   return(
//     <NavigationContainer>
//       {<Stack.Navigator>
//         <Stack.Screen
//         name = "ScreenA"
//         componnet = {ScreenA}
//         />
//       </Stack.Navigator>
//     }

//     </NavigationContainer>
    
//   )
// }

// registerRootComponent(App);



import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './Views/MainScreen';

function HomeScreen2({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen2</Text>
      <Button title="home" onPress={() => navigation.navigate('Home')}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Home2" component={HomeScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;