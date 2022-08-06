import React from "react";
import { Image, Box, Center, HStack, AspectRatio, Text, Stack, Heading, NativeBaseProvider, Divider } from "native-base";

export function JobAdd({ data }) {

    return (<NativeBaseProvider alignItems="center">
        <Box alignItems="center">
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="white" borderWidth="1" _dark={{
                borderColor: "black",
                backgroundColor: "black"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "black"
            }}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{
                            uri:`data:image/jpeg;base64,${data.images.media}`
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="gray.500" _dark={{
                        bg: "violet.400"
                    }} _text={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        {data.name}
                    </Center>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        {/* ------------------------------------------------------ */}
                        <Text fontSize="2xs" color="white" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                            Job Title:
                        </Text>
                        {/* ------------------------------------------------------ */}
                        <Heading size="md" ml="2"c color="white">
                            {data.job}
                        </Heading>
                        {/* ------------------------------------------------------ */}
                        <Text fontSize="2xs" color="white" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                            Status:
                        </Text>
                        {/* ------------------------------------------------------ */}
                        <Text fontSize="xs" _light={{
                            color: "white"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="2" mt="-1">
                            {data.status}
                        </Text>
                        {/* ------------------------------------------------------ */}
                        <Text fontSize="2xs" color="white" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                            Estimated time:
                        </Text>
                        {/* ------------------------------------------------------ */}
                        <Text ml="2" color="white" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                            {data.estimated_time}
                        </Text>
                        {/* ------------------------------------------------------ */}
                        <Text fontSize="2xs" color="white" _dark={{
                            color: "warmGray.200"
                        }} >
                            Description:
                        </Text>
                    </Stack>
                    {/* ------------------------------------------------------ */}
                    <Text ml="2" color="white">
                        {data.description}
                    </Text>
                    {/* ------------------------------------------------------ */}
                    <Text fontSize="2xs" color="white" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="400">
                        Price:
                    </Text>
                    {/* ------------------------------------------------------ */}
                    <HStack alignItems="center" space={1} justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text ml="2" color="white" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                {data.price}
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    </NativeBaseProvider>);
};