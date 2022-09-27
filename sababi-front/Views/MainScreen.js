import { PersonAdd } from '../Componnats/PersonAdd';
import { JobAdd } from '../Componnats/JobAdd';
import { NativeBaseProvider, Center, Box, Container, HStack, Heading, NBBox, Flex, Divider, Button, useToast,Fab,Icon } from 'native-base';
import { StyleSheet, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import SwipeCards from "react-native-swipe-cards-deck";
import Toast from "react-native-root-toast";

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

function addType(cardData) {
  if (cardData.type === "0") {
    return <PersonAdd data={cardData} />;
  } else {
    return <JobAdd data={cardData} />;
  }
}

const getData = async () => {
  try {
    
    const value = await AsyncStorage.getItem('user_id');
    if (value !== null) {
      // We have data!!
      console.log(value);
      return value
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};



export function MainScreen({navigation}) {
  const [cards, setCards] = useState([]);
  const [add, setAds] = useState([]);
  const [last_ad, setLastAd] = useState(0);

  const getdata = async () => {
    console.log("Requesting");
    const userId = await getData()
    await fetch("http://192.168.1.5:8081/api/get_main_data", {
      method: "POST",
      body: JSON.stringify({ last_ad: last_ad , user_id: userId}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data['ads'].length > 0){
          setLastAd(data["next_ad"]);
          setAds(add => [...add, ...data["ads"]]);
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(add.length)
      if (add.length > 2) {
        console.log("Got data from server");
        console.log("Nothing changed");
      } else {
          console.log("AD ALMOST GONE -  REQUESTING FROM SERVER");
          Promise.all([getdata()]);
      }
      setCards(add);
    }, 10000);
    return () => clearInterval(interval);
  }, [cards, last_ad, add,]);

  async function handleYup(card) {
    console.log(`Yup for ${card.name}`);
    const user_id = await getData()
    await fetch("http://192.168.1.5:8081/api/approve_ad", {
      method: "POST",
      body: JSON.stringify({ ad_id: card.id.toString(), user_id: user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data['is_match'] === 'True'){
          let toast = Toast.show("MATCH! - Creating new chat", {
            backgroundColor: "green",
            duration: Toast.durations.SHORT,
          });
          const chat_id = data['chat_id']
          console.log("Match: "+ chat_id)
          navigation.navigate('Chat',[user_id, chat_id])
        }
        
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
    add.shift();
    console.log(add.length);
    return true; // return false if you wish to cancel the action
  }

  async function handleNope(card) {
    console.log(`Nope for ${card.name}`);
    let toast = Toast.show("Nope", {
      backgroundColor: "red",
      duration: Toast.durations.SHORT,
    });
    add.shift();
    return true;
  }
  async function handleMaybe(card) {
    console.log(`Maybe for ${card.name}`);
    return false;
  }

  return (
    <NativeBaseProvider >
      <Flex direction="column" mb="2.5" alignItems="center" backgroundColor="black">
        <Center marginTop="10%">
          {cards ? (
            <SwipeCards
              cards={cards}
              renderCard={(cardData) => addType(cardData)}
              keyExtractor={(cardData) => String(cardData.text)}
              renderNoMoreCards={() => <StatusCard text="No more Ads - Come back later.." />}
              actions={{
                nope: { onAction:  handleNope, show: false },
                yup: { onAction:  handleYup, show: false },
                maybe: { onAction:  handleMaybe, show: false },
              }}
              hasMaybeAction={true}
              loop={false}
              
            />
          ) : (
            <StatusCard text="Loading..." />
          )}
        </Center>
        <Box position="relative" h={100} w="100%" >
          <Fab position="absolute" size="sm" backgroundColor="white" icon={<Icon color="black" as={<AntDesign name="plus" />} size="sm" onPress={() => navigation.navigate('New Add')}/>}>
          </Fab>
        </Box>
      </Flex>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
  cardsText: {
    fontSize: 22,
  },
});
