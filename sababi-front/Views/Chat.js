// import * as React from 'react';
// import { View, Text, Button } from 'react-native';

// export function Chat() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Chat</Text>
//       </View>
//     );
//   }


import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


async function getUserDetails(chat_id,user) {
  console.log(chat_id,user)
  await fetch("http://192.168.1.5:8081/api/chat_user_details", {
      method: "POST",
      body: JSON.stringify({ chatId: chat_id, userId:user}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Chat was found, data: " + JSON.stringify(data))
        return JSON.stringify(data)
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
}

export  function ChatScreen({route,navigation}) {
  const [messages, setMessages] = useState([]);
  const params = route.params;
  console.log("CHAT: ",params)
  const userDetails =  getUserDetails(params[0],params[1])
  console.log(userDetails)
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'USER-ID: '+ userDetails['user_id'] + ', UserName: ' + userDetails['user_name'],
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);


  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      // onSend={(messages) => onSend(messages)}
      // user={{
      //   _id: 1,
      // }}
      // renderBubble={renderBubble}
      // alwaysShowSend
      // renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

// export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
