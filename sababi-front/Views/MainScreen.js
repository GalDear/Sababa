import { PersonAdd } from '../Componnats/PersonAdd';
import { JobAdd } from '../Componnats/JobAdd';
import { NativeBaseProvider, Center, Box, Container, HStack, Heading, NBBox, Flex, Divider, Button, useToast } from 'native-base';
import { AddClass } from '../Model/AddClass'
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeCards from "react-native-swipe-cards-deck";
import Toast from 'react-native-root-toast';

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

function addType(cardData) {
  
  if (cardData.type === "0") {
    return <PersonAdd data={cardData} />
  } else {
    return <JobAdd data={cardData} />
  }
}

  



export function MainScreen() {
  const [cards, setCards] = useState([]);
  const [add, setAds] = useState([]);
  const [last_ad, setLastAd] = useState(0);
  const [requesting, setRequest] = useState(false)

  const getdata =  (async()=>{
    console.log("Requesting")
    await fetch('http://192.168.1.6:8081/api/get_main_data',
    {
      method: 'POST',
      body:JSON.stringify({'last_ad':last_ad})
    })
    .then((response) => response.json())
    .then((data) => {
      setLastAd(data['next_ad'])
      setAds(data['ads'])
    })
    .catch((error)=>{
      console.log("ERORRRRRR",error)
    });
  })


  useEffect(() => {
    if (add.length > 0) {
        const timeout= setTimeout(() => {
          setRequest(false)
          console.log("Got data from server")
          setCards(add)
          console.log("Nothing changed")
        }, 6000);
        return () => clearTimeout(timeout);
      }
      else{
        const interval= setInterval(() => {
        
        if (!requesting) {
          console.log("NO DATA REQUESTING FROM SERVER")
          Promise.all([getdata()])
          setRequest(true)
        }
        
      }, 10000);
      return () => clearInterval(interval);
      }
    
  }, [cards,last_ad,add,requesting]);

  function handleYup(card) {
    console.log(`Yup for ${card.name}`);
    let toast = Toast.show("Yup", { backgroundColor: "green", duration: Toast.durations.SHORT });
    return true; // return false if you wish to cancel the action
  }


  function handleNope(card) {
    console.log(`Nope for ${card.name}`);
    let toast = Toast.show("Nope", { backgroundColor: "red", duration: Toast.durations.SHORT });
    return true;
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.name}`);
    return false;
  }


  return (
    <NativeBaseProvider>

      <Center marginTop="10%">
        <Heading>Sababi</Heading>
      </Center>
      <Flex direction="column" mb="2.5" mt="1.5" alignItems="center" marginTop="5%">
        <Center>
          {cards ? (
            <SwipeCards cards={cards}
              renderCard={(cardData) => addType(cardData)}
              keyExtractor={(cardData) => String(cardData.text)}
              renderNoMoreCards={() => <StatusCard text="No more cards..." />}
              actions={{
                nope: { onAction: handleNope, show: false },
                yup: { onAction: handleYup, show: false },
                maybe: { onAction: handleMaybe, show: false },

              }}
              hasMaybeAction={true}
              loop={true}
            />
          ) : (
            <StatusCard text="Loading..." />
          )}
        </Center>
      </Flex>

    </NativeBaseProvider>

  );
};

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

