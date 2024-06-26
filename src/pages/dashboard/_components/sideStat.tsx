import { Box, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getBalanceByAccountId } from "@/api/balance.ts";
import { useEffect } from "react";

type SideStatProps = {
    accountId: number;
    show: boolean;
}

export default function SideStat({ accountId, show }: SideStatProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["getBalanceSide"],
        queryFn: () => getBalanceByAccountId(accountId),
    });

    useEffect(() => {
        console.log(data);
    }, [data]);
    return <Box
        w={"100%"}
        bgColor={"gray.200"}
        borderRadius={"lg"}
        p={show ? 4 : 0}
        transition={"0.7s"}
        height={show ? "180px" : "0px"}
        overflow={"hidden"}
        opacity={show ? 1 : 0}
    >
        <Stat>
            <StatLabel>Total balance</StatLabel>
            <StatNumber>{data ? data?.currentBalance.toLocaleString() : "0"} $</StatNumber>
        </Stat>
        <StatGroup>
            <Stat>
                <StatLabel><StatArrow type="increase" transform={"rotate(180deg)"} />Income</StatLabel>
                <StatNumber noOfLines={1}>345,670 $</StatNumber>
                <StatHelpText>
                    This month
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel><StatArrow type="decrease" transform={"rotate(180deg)"} />Outcome</StatLabel>
                <StatNumber>45 $</StatNumber>
            </Stat>
        </StatGroup>
    </Box>;
}