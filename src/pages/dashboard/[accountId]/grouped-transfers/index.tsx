import { Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllGroupedTransfer } from "@/api/groupedTransaction.ts";
import { useParams } from "@/router.ts";

export default function GroupedTransfers() {
    const {accountId} = useParams("/dashboard/:accountId/grouped-transfers");
    const {data, isLoading, error} = useQuery({
        queryKey: ["getGroupedTransfers"],
        queryFn: () => getAllGroupedTransfer(+accountId)
    });

    return <Flex p={8} direction={"column"}>
        <Heading>
            Grouped transfers
        </Heading>
        <Flex>
            {
                data?.length === 0 ? <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <Heading>
                        You have no grouped transfers yet
                    </Heading>
                </Flex> : <>Something</>
            }
        </Flex>
    </Flex>
}