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

getdata = async()=>{
  fetch('http://192.168.1.6:8081/api/get_main_data',
  {body:{'last_ad':1}})
.then((response) => response.json())
.then((data) => {
  if (data.type == 'jpeg') {
    this.setState((state, props) => {
      return {
        img_base64:data.media
      };
    });
  }
});
}
export function MainScreen() {
  const [cards, setCards] = useState();
  let add = [{
    name: "Shahar Baba",
    job: "Shahar Baba",
    age: "25",
    description: "Shahar Baba Shahar Baba Shahar Baba Shahar Baba Shahar ",
    Rating: "9.9",
    type: "0"
  },
  {
    companyName: "HIT",
    jobTitle: "Developer",
    jobType: "Full-Time",
    experience: "3",
    Requirements: "Developer Developer Developer Developer Developer Developer Developer",
    Rating: "9.9",
    type: "1"
  },
  {
    name: "Gal Bachar",
    job: "Gal Bachar",
    age: "25",
    description: "Gal Bachar Gal Bachar Gal Bachar Gal Bachar Gal Bachar",
    Rating: "9.9",
    type: "0"
  },
  {
    companyName: "HIT",
    jobTitle: "Developer",
    jobType: "Full-Time",
    experience: "3",
    Requirements: "Developer Developer Developer Developer Developer Developer Developer",
    Rating: "9.9",
    type: "1"
  },
  {
    name: "Eden Meshulam",
    job: "Eden Meshulam",
    age: "25",
    description: "Eden Meshulam Eden Meshulam Eden Meshulam Eden Meshulam Eden Meshulam",
    Rating: "9.9",
    type: "0"
  },
  {
    companyName: "HIT",
    jobTitle: "Developer",
    jobType: "Full-Time",
    experience: "3",
    Requirements: "Developer Developer Developer Developer Developer Developer Developer",
    Rating: "9.9",
    type: "1"
  },
  {
    name: "Daniel George",
    job: "Daniel George",
    age: "26",
    description: "Daniel George Daniel George Daniel George Daniel George Daniel George",
    Rating: "7.8",
    type: "0"
  }];

  useEffect(() => {
    setTimeout(() => {
      setCards(
        [
          {
            name: add[0].name, job: add[0].job, age: add[0].age, description: add[0].description, Rating: add[0].Rating, type: add[0].type
          },
          {
            companyName: add[1].companyName, jobTitle: add[1].jobTitle, jobType: add[1].jobType, experience: add[1].experience, Requirements: add[1].Requirements, Rating: add[1].Rating, type: add[1].type
          },
          {
            name: add[2].name, job: add[2].job, age: add[2].age, description: add[2].description, Rating: add[2].Rating, type: add[2].type
          },
          {
            companyName: add[3].companyName, jobTitle: add[3].jobTitle, jobType: add[3].jobType, experience: add[3].experience, Requirements: add[3].Requirements, Rating: add[3].Rating, type: add[3].type
          },
          {
            name: add[4].name, job: add[4].job, age: add[4].age, description: add[4].description, Rating: add[5].Rating, type: add[4].type
          },
          {
            companyName: add[3].companyName, jobTitle: add[3].jobTitle, jobType: add[3].jobType, experience: add[3].experience, Requirements: add[3].Requirements, Rating: add[3].Rating, type: add[5].type
          },
          {
            name: add[6].name, job: add[6].job, age: add[6].age, description: add[6].description, Rating: add[6].Rating, type: add[6].type
          }
        ]
      );
    }, 3000);
  }, []);

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

function addType(cardData) {
  console.log(cardData)
  if (cardData.type === "0") {
    return <PersonAdd data={cardData} />
  } else {
    return <JobAdd data={cardData} />
  }
}