import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './Views/MainScreen';
import {Footer} from './Componnats/Footer';


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
  
  const [data, setData] = React.useState('');
  const childToParent = (childdata) => {
    setData(childdata);
  }

  console.log(data);
  return (
    
    <NavigationContainer>
      <View style={{
        height: '95%'
      }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Home2" component={HomeScreen2} />
      </Stack.Navigator>
      </View>
      <View style={{
        height: '5%'
      }}><Footer childToParent={childToParent}></Footer></View>
    </NavigationContainer>
    
  );
}

export default App;
