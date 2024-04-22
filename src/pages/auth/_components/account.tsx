import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "@/router";

export type AccountProps = {
    fullName?: string;
    profilePic?: string;
    number?: number;
    id: number;
};

export default function Account({
    fullName,
    profilePic,
    number,
    id,
}: AccountProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/dashboard/:accountId", {
            params: { accountId: id.toString() },
        });
    };

    return (
        <Flex
            flexDir={"row"}
            alignItems={"center"}
            borderRadius={"lg"}
            h={"70px"}
            p={"8px"}
            w={"100%"}
            gap={3}
            transition={".7s"}
            cursor={"pointer"}
            _hover={{
                bgColor: "gray.300",
            }}
            onClick={handleClick}
        >
            <Avatar name={fullName} src={profilePic} />
            <Flex flexDir={"column"} justifyContent={"center"}>
                <Text>{fullName}</Text>
                <Text fontSize={"xs"}>{number}</Text>
            </Flex>
        </Flex>
    );
}
