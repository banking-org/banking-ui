import {getAccountById} from "@/api/account";
import {useParams} from "@/router";
import {Box, Flex, Heading, Stat, StatLabel, StatNumber} from "@chakra-ui/react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Line} from "react-chartjs-2";
import "chart.js/auto";
import AccountGraph from "@/pages/dashboard/[accountId]/_components/accountGraph.tsx";
import {getBalanceByAccountId} from "@/api/balance.ts";

export function Catch() {
    return <Heading>An error occured :(</Heading>;
}

export default function Dashboard() {
    const {accountId} = useParams("/dashboard/:accountId");
    const {data, isLoading, error} = useQuery({
        queryKey: ["getBalance"],
        queryFn: () => getBalanceByAccountId(+accountId),
    });

    return (
        <Flex w={"100%"} p={8}>
            <Flex direction={"column"} width={"100%"}>
                <Stat>
                    <StatLabel as={Heading}>
                        Actual balance
                    </StatLabel>
                    <StatNumber fontSize={"70px"}>
                        {data?.currentBalance || "0"} $
                    </StatNumber>
                </Stat>
                <Flex gap={5} w={"100%"} my={25}>
                    <AccountGraph accountId={+accountId} graphType={"income"}/>
                    <AccountGraph accountId={+accountId} graphType={"outcome"}/>
                </Flex>

            </Flex>
            <Flex></Flex>
        </Flex>
    );
}
