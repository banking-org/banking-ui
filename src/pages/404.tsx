import { Flex, Text } from "@chakra-ui/react";

export default function NotFound() {
    return <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={"x-large"}>404 | Page not found</Text>
    </Flex>
}