import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { MainScreen } from './Views/MainScreen';
import { Chat } from './Views/Chat';
import { Footer } from './Componnats/Footer';
import { Menu } from './Views/Menu';
import { Notification } from './Views/Notification';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {

  const [data, setData] = React.useState('');
  const useStateFigure = (useStateData) => {
    setData(useStateData);
  }

  return (
    <SafeAreaView style={{backgroundColor:"black"}}>
      <View style={{ height: '91%' }}>{
        screenManager(data)
      }
      </View>
      <View style={{
        height: '9%'
      }}><Footer useStateFigure={useStateFigure}></Footer></View>
    </SafeAreaView>
  );
}

export default App;


function screenManager(data) {

  if (data == 0) {
    return <MainScreen></MainScreen>
  }
  if (data == 1) {
    return <Chat></Chat>
  }
  if (data == 2) {
    return <Notification></Notification>
  }
  if (data == 3) {
    return <Menu></Menu>
  }
  else {
    return null
  }
}