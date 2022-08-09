import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { MainScreen } from './Views/MainScreen';
import { ChatScreen } from './Views/Chat';
import { MessagesScreen } from './Views/Messages';
import {Footer} from './Componnats/Footer';
import { Menu } from './Views/Menu';
import { Login } from './Views/Login';
import { Register } from './Views/Register';
import { Notification } from './Views/Notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatNavigation } from './Views/ChatNavigation'

function App() {
  
  const [data, setData] = React.useState('');
  const useStateFigure = (useStateData) => {
    setData(useStateData);
  }
// return(
//   <Login></Login>
// );
if(data == 0)
{
  return (    
    <SafeAreaView>
      <View style={{height:'100%'}}>{
        
        <Login useStateFigure={useStateFigure}></Login>
      }
      </View>
    </SafeAreaView>
  );
}
if(data == 5){
  return (    
    <SafeAreaView>
      <View style={{height:'100%'}}>{
        
        <Register useStateFigure={useStateFigure}></Register>
      }
      </View>
    </SafeAreaView>
  );
}
else{
  return (    
    <SafeAreaView>
      <View style={{height:'95%'}}>{
        
        screenManager(data)
      }
      </View>
      <View style={{
        height: '5%'
      }}><Footer useStateFigure={useStateFigure}></Footer></View>
    </SafeAreaView>
  );
}
}

export default App;


function screenManager(data){
    // if(data == 0){
    //   return <Login></Login>
    // }
    if(data == 1){
      return <MainScreen></MainScreen>
    }
    if(data == 2){
       return <ChatNavigation></ChatNavigation>
    }
    if(data == 3){
      return <Notification></Notification>
    }
    if(data == 4){
      return <Menu></Menu>
    }
    else{
      return null
    }
}