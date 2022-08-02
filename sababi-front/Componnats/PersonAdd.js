import React from "react";
import { Image, Box, Center, HStack, AspectRatio, Text, Stack, Heading, NativeBaseProvider, Divider } from "native-base";

export function PersonAdd({ data }) {

  return (<NativeBaseProvider alignItems="center">
    <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.300"
      }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
              uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
            }} alt="image" />
          </AspectRatio>
          <Center bg="violet.500" _dark={{
            bg: "violet.400"
          }} _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs"
          }} position="absolute" bottom="0" px="3" py="1.5">
            {data.job}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            {/* ------------------------------------------------------ */}
            <Text fontSize="2xs" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              Name:
            </Text>
            {/* ------------------------------------------------------ */}
            <Heading size="md" ml="2">
              {data.name}
            </Heading>
            {/* ------------------------------------------------------ */}
            <Text fontSize="2xs" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              Profession:
            </Text>
            {/* ------------------------------------------------------ */}
            <Text fontSize="xs" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="2" mt="-1">
              {data.job}
            </Text>
            {/* ------------------------------------------------------ */}
            <Text fontSize="2xs" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              Age:
            </Text>
            {/* ------------------------------------------------------ */}
            <Text ml="2" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              {data.age}
            </Text>
            {/* ------------------------------------------------------ */}
            <Text fontSize="2xs" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} >
              Description:
            </Text>
          </Stack>
          {/* ------------------------------------------------------ */}
          <Text ml="2">
            {data.description}
          </Text>
          {/* ------------------------------------------------------ */}
          <Text fontSize="2xs" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }} fontWeight="400">
            Rating:
          </Text>
          {/* ------------------------------------------------------ */}
          <HStack alignItems="center" space={1} justifyContent="space-between">
            <HStack alignItems="center">
              <Text ml="2" color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                {data.Rating}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  </NativeBaseProvider>);
};