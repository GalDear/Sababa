import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../design/MessagesStyles';
import { useEffect, useState } from "react";




const getData = async () => {
  try {
    
    const value = await AsyncStorage.getItem('user_id');
    if (value !== null) {
      // We have data!!
      //console.log(value);
      return value
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};




export function MessagesScreen({ navigation })  {
  const [msg, setMsg] = useState([]);

  async function get_chat_list() {
    console.log("CHAT!!!")
    user_id = await getData()
    console.log(user_id)
    fetch("http://192.168.1.5:8081/api/get_chat_list", {
        method: "POST",
        body: JSON.stringify({ user_id:user_id}),
      })
        .then((response) => response.json())
        .then((data) => {
          setMsg(data)
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      get_chat_list()
    }, 1000);
    return () => clearInterval(interval);
  });


  
    return (
      <Container>
        <FlatList 
          data={msg}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('ChatScreen',{userName: item.user_name})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.user_name}</UserName>
                    <PostTime>{item.starting_time}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.last_message}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

// export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});