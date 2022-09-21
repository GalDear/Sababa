import * as React from 'react';
import { View, Text, Button,Keyboard } from 'react-native';
import { MainScreen } from './Views/MainScreen';
import { ChatScreen } from './Views/Chat';
import { Footer } from './Componnats/Footer';
import { Menu } from './Views/Menu';
import { Login } from './Views/Login';
import { Register } from './Views/Register';
import { Notification } from './Views/Notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainNavigation } from './Views/MainNavigation';
import { MenuNavigation } from './Views/MenuNavigation';
import { ChatNavigation } from './Views/ChatNavigation'

function App() {

  const [data, setData] = React.useState('');
  const [isKeyboardOpen,setIsKeyboardOpen]=React.useState(false)
  const useStateFigure = (useStateData) => {
    setData(useStateData);
  }


  const handleKeyboardShow = ()=>{
  setIsKeyboardOpen(true)
  }

  
  const handleKeyboardHide = ()=>{
 setIsKeyboardOpen(false)
  }


  React.useEffect(()=>{
    Keyboard.addListener('keyboardDidShow',handleKeyboardShow);
    Keyboard.addListener('keyboardDidHide',handleKeyboardHide);

    
  },[])

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
    <SafeAreaView style={{backgroundColor:"black"}}>
      <View style={{ height: isKeyboardOpen ? '100%' : '91%' }}>{
        screenManager(data)
      }
      </View>
      <View style={{height:  '9%', display: isKeyboardOpen ? 'none' : undefined}}>
        <Footer useStateFigure={useStateFigure}></Footer>
      </View>
    </SafeAreaView>
  );
}
}

export default App;


function screenManager(data) {

  if (data == 1) {
    return <MainNavigation></MainNavigation>
  }
  if (data == 2) {
    return <ChatNavigation></ChatNavigation>
  }
  if (data == 3) {
    return <Notification></Notification>
  }
  if (data == 4) {
    return <MenuNavigation></MenuNavigation>
  }
  else {
    return null
  }
}