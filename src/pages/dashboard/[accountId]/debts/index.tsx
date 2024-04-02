import { Flex, Heading, Text } from "@chakra-ui/react";
import { useParams } from "@/router.ts";
import { useQuery } from "@tanstack/react-query";
import { getAccountById } from "@/api/account.ts";

export default function Debts() {
    const { accountId } = useParams("/dashboard/:accountId/debts");
    const { data: account } = useQuery({
        queryKey: ["getAccountById"],
        queryFn: () => getAccountById(+accountId),
    });

    const {data, isLoading, error} = useQuery({
        queryKey: ["getAllDebts"]
    })

    return <Flex p={8} direction={"column"}>
        <Heading>
            Debts
        </Heading>
        {
            account?.accountType !== "DEBIT" ? <Flex justifyContent={"center"} alignItems={"center"}>
                <Text>
                    This account is not allowed to make debts
                </Text>
            </Flex> : <Flex>
            </Flex>
        }
    </Flex>;
}
