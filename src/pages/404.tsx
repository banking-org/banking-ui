import { Flex, Heading } from "@chakra-ui/react";

export default function NotFound() {
    return (
        <Flex
            w={"100%"}
            h={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Heading>404 | Page not found</Heading>
        </Flex>
    );
}
