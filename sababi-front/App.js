import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { MainScreen } from './Views/MainScreen';
import { Chat } from './Views/Chat';
import {Footer} from './Componnats/Footer';
import { Menu } from './Views/Menu';
import { Notification } from './Views/Notification';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  
  const [data, setData] = React.useState('');
  const childToParent = (childdata) => {
    setData(childdata);
  }

  return (    
    <SafeAreaView>
      <View style={{height:'95%'}}>{
        temp(data)
      }
      </View>
      <View style={{
        height: '5%'
      }}><Footer childToParent={childToParent}></Footer></View>
    </SafeAreaView>
  );
}

export default App;


function temp(data){

    if(data == 0){
      return <MainScreen></MainScreen>
    }
    if(data == 1){
      return <Chat></Chat>
    }
    if(data == 2){
      return <Notification></Notification>
    }
    if(data == 3){
      return <Menu></Menu>
    }
    else{
      return null
    }
}