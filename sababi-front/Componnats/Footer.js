import React from "react";
import { NativeBaseProvider, Box,Center,HStack,Pressable,Icon,Text,MaterialCommunityIcons,MaterialIcons,Divider } from "native-base";
import { render } from "react-dom";


export function Footer({useStateFigure}) {
    const [selected, setSelected] = React.useState(0);
    
    return (<NativeBaseProvider>
        <Box flex={1} bg="black"  width="100%" safeAreaTop alignSelf={"center"} >
          <Center flex={1}></Center>
          <HStack bg="gray.300" alignItems="center" safeAreaBottom shadow={6}>
            <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="2" flex={1} onPress={() => [useStateFigure(1),setSelected(1)]}>
              <Center>
                {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="sm" /> */}
                <Text color="black" fontSize="12">
                  Home
                </Text>
              </Center>
            </Pressable>
            <Divider orientation="vertical" bg="black"/>
            <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => [useStateFigure(2),setSelected(2)]}>
              <Center>
                {/* <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" /> */}
                <Text color="black" fontSize="12">
                  Chat
                </Text>
              </Center>
            </Pressable>
            <Divider orientation="vertical" bg="black"/>
            <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => [useStateFigure(3),setSelected(3)]}>
              <Center>
                {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="sm" /> */}
                <Text color="black" fontSize="12">
                  Notification
                </Text>
              </Center>
            </Pressable>
            <Divider orientation="vertical" bg="black"/>
            <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => [useStateFigure(4),setSelected(4)]}>
              <Center>
                {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" /> */}
                <Text color="black" fontSize="12">
                  Menu
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>
      </NativeBaseProvider>);    
  }

  