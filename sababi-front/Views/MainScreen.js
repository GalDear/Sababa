import { Add } from '../Componnats/Add';
import { NativeBaseProvider,Center, Box, Container,HStack, Heading,NBBox,Flex,Divider,Button} from 'native-base';
import {AddClass} from '../Model/AddClass'
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeCards from "react-native-swipe-cards-deck";

function StatusCard({ text }) {
 return (
   <View>
     <Text style={styles.cardsText}>{text}</Text>
   </View>
 );
}

export function MainScreen() {

 const [cards, setCards] = useState();
 let add = [{
   name:"Shahar Baba",
   job:"Shahar Baba",
   age:"25",
   description:"Shahar Baba Shahar Baba Shahar Baba Shahar Baba Shahar ",
   Rating:"9.9"
   },
   {
     name:"Gal Bachar",
     job:"Gal Bachar",
     age:"25",
     description:"Gal Bachar Gal Bachar Gal Bachar Gal Bachar Gal Bachar",
     Rating:"9.9"
     },
   {
    name:"Eden Meshulam",
    job:"Eden Meshulam",
    age:"25",
    description:"Eden Meshulam Eden Meshulam Eden Meshulam Eden Meshulam Eden Meshulam",
    Rating:"9.9"
    },
     {
       name:"Daniel George",
       job:"Daniel George",
       age:"26",
       description:"Daniel George Daniel George Daniel George Daniel George Daniel George",
       Rating:"7.8"
     }];

 useEffect(() => {
   setTimeout(() => {
     setCards(
       [
        {
           name: add[0].name , job:add[0].job , age:add[0].age , description:add[0].description, Rating:add[0].Rating
        },
        {
        name: add[1].name , job:add[1].job , age:add[1].age , description:add[1].description, Rating:add[1].Rating
        },
        {
        name: add[2].name , job:add[2].job , age:add[2].age , description:add[2].description, Rating:add[2].Rating
        },
        {
        name: add[3].name , job:add[3].job , age:add[3].age , description:add[3].description, Rating:add[3].Rating
        }
      ]
     );
   }, 3000);
 }, []);

 function handleYup(card) {
   console.log(`Yup for ${card.name}`);
   return true; // return false if you wish to cancel the action
 }
 function handleNope(card) {
   console.log(`Nope for ${card.name}`);
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
                         renderCard={(cardData) => <Add data={cardData} />}
                         renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                         actions={{
                             nope: { onAction: handleNope },
                             yup: { onAction: handleYup },
                             maybe: { onAction: handleMaybe },
                         }}
                         hasMaybeAction={true}
                         loop={true}
                         actions={actions}
                         />
            ):(
              <StatusCard text="Loading..."/>
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

const actions = {
  maybe: { show: false }, 
}