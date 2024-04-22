import {
    Avatar,
    Flex,
    Heading,
    IconButton,
    Skeleton,
    Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAccountById } from "@/api/account.ts";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "@/router.ts";

type AccountHeaderProps = {
    accountId: number;
};

export default function AccountHeader({ accountId }: AccountHeaderProps) {
    const { data, isLoading } = useQuery({
        queryKey: ["getAccountById"],
        queryFn: () => getAccountById(accountId),
    });

    const navigate = useNavigate();

    return (
        <Flex
            w={"100%"}
            alignItems={"center"}
            gap={3}
            borderRadius={"lg"}
            cursor={"pointer"}
            p={4}
            _hover={{
                bgColor: "gray.100",
            }}
        >
            <Avatar name={`${data?.firstname || ""} ${data?.lastname || ""}`} />
            <Flex flexDir={"column"} justifyContent={"center"} h={"100%"}>
                <Skeleton isLoaded={!isLoading}>
                    <Heading as={"h3"} size={"sm"}>
                        {data ? `${data?.firstname} ${data?.lastname}` : ""}
                    </Heading>
                </Skeleton>
                <Skeleton isLoaded={!isLoading} mt={isLoading ? "2" : ""}>
                    <Text>{data?.accountNumber}</Text>
                </Skeleton>
            </Flex>
            <IconButton
                aria-label={"edit account"}
                icon={<BiEdit />}
                onClick={() => {
                    navigate("/dashboard/:accountId/edit", {
                        params: {
                            accountId: accountId + "",
                        },
                    });
                }}
            />
        </Flex>
    );
}
