import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import Account from "./_components/account";
import { useQuery } from "@tanstack/react-query";
import { getAllAccounts } from "@/api/account";
import NewAccountModal from "@/pages/auth/_components/newAccountModal.tsx";

export const Catch = () => (
    <Flex w={"100%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Heading textAlign={"center"}>
            Something went wrong :( <br /> Try reload your page
        </Heading>
    </Flex>
);

export default function Auth() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["allAccounts"],
        queryFn: getAllAccounts,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            w={"100vw"}
            h={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
        >
            <Flex
                bgColor={"gray.100"}
                h={"60%"}
                w={"60%"}
                minW={"1000px"}
                borderRadius={"lg"}
                borderColor={"gray.400"}
                borderWidth={"1.5px"}
                padding={"50px"}
                alignItems={"center"}
            >
                <Box w={"50%"} h={"100%"}>
                    <Image
                        src="/bank.png"
                        height={"80px"}
                        w={"auto"}
                        mb={"30px"}
                    />
                    <Heading>Welcome to your Banky! ✨</Heading>
                    <Text>Please select your account to continue</Text>
                </Box>
                <Flex
                    flexDir={"column"}
                    w={"50%"}
                    h={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Flex
                        minH={"80px"}
                        w={"100%"}
                        flexDir={"column"}
                        maxH={"100%"}
                        overflowX={"scroll"}
                        borderRadius={"lg"}
                        bgColor={"gray.200"}
                        alignItems={"center"}
                        p={"5px"}
                    >
                        {isLoading ? (
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                            />
                        ) : error ? (
                            error.toString()
                        ) : (
                            data?.map((account) => (
                                <Account
                                    number={account.accountNumber}
                                    fullName={`${account.firstname} ${account.lastname}`}
                                    key={account.id}
                                    id={account.id}
                                />
                            )) || ":("
                        )}
                    </Flex>
                    <Flex
                        pt={"20px"}
                        w={"100%"}
                        px={"20px"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Text>Don't have an account yet?</Text>
                        <Button colorScheme="blue" onClick={onOpen}>
                            Create an account
                        </Button>
                        <NewAccountModal isOpen={isOpen} onClose={onClose} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"60%"} px={"20px"} py={"10px"}>
                <Text>Banky ©️ 2024 Tout droits réservés</Text>
            </Flex>
        </Flex>
    );
}
