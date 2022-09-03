import { PersonAdd } from '../Componnats/PersonAdd';
import { JobAdd } from '../Componnats/JobAdd';
import { NativeBaseProvider, Center, Box, Container, HStack, Heading, NBBox, Flex, Divider, Button, useToast,Fab,Icon } from 'native-base';
import { StyleSheet, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

export function MainScreen({navigation}) {
  const [cards, setCards] = useState([]);
  const [add, setAds] = useState([]);
  const [last_ad, setLastAd] = useState(0);

  const getdata = async () => {
    console.log("Requesting");
    await fetch("http://192.168.1.198:8081/api/get_main_data", {
      method: "POST",
      body: JSON.stringify({ last_ad: last_ad }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLastAd(data["next_ad"]);
        setAds(add => [...add, ...data["ads"]]);

        
      })
      .catch((error) => {
        console.log("ERORRRRRR", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(add.length)
      if (add.length > 2) {
        console.log("Got data from server");
        setCards(add);
        console.log("Nothing changed");
      } else {
          console.log("AD ALMOST GONE -  REQUESTING FROM SERVER");
          Promise.all([getdata()]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [cards, last_ad, add,]);

  function handleYup(card) {
    console.log(`Yup for ${card.name}`);
    let toast = Toast.show("Yup", {
      backgroundColor: "green",
      duration: Toast.durations.SHORT,
    });
    add.shift();
    console.log(add.length);
    return true; // return false if you wish to cancel the action
  }

  function handleNope(card) {
    console.log(`Nope for ${card.name}`);
    let toast = Toast.show("Nope", {
      backgroundColor: "red",
      duration: Toast.durations.SHORT,
    });
    return true;
  }
  function handleMaybe(card) {
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
              renderNoMoreCards={() => <StatusCard text="No more cards..!." />}
              actions={{
                nope: { onAction: handleNope, show: false },
                yup: { onAction: handleYup, show: false },
                maybe: { onAction: handleMaybe, show: false },
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
