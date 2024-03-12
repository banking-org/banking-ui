import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export type AccountProps = {
    fullName?: string;
    profilePic?: string;
    email?: string;
};

export default function Account({ fullName, profilePic, email }: AccountProps) {
    return (
        <Flex
            flexDir={'row'}
            alignItems={'center'}
            borderRadius={'lg'}
            h={'70px'}
            p={'8px'}
            w={"100%"}
            gap={3}
            transition={".7s"}
            cursor={"pointer"}
            _hover={{
                bgColor: "gray.300"
            }}
        >
            <Avatar name={fullName} src={profilePic} />
            <Flex flexDir={"column"} justifyContent={"center"}>
                <Text>{fullName}</Text>
                <Text fontSize={"xs"}>{email}</Text>
            </Flex>
        </Flex>
    );
}
