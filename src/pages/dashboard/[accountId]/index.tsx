import { useParams } from "@/router";
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Stat,
    StatLabel,
    StatNumber,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import "chart.js/auto";
import { getBalanceByAccountId } from "@/api/balance.ts";
import { IoMdAddCircleOutline } from "react-icons/io";
import TransactionModal from "./_components/transactionModal.tsx";
import TransactionTable from "./_components/transactionTable.tsx";
import { PieChart } from "./_components/pieChart.tsx";
import { Graph } from "./_components/Graph";

export function Catch() {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"100%"}
        >
            <Heading textAlign={"center"}>
                An error occurred :( <br /> Try to reload the page
            </Heading>
            ;
        </Flex>
    );
}

export default function Dashboard() {
    const { accountId } = useParams("/dashboard/:accountId");
    const { data } = useQuery({
        queryKey: ["getBalance"],
        queryFn: () => getBalanceByAccountId(+accountId),
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            position={"relative"}
            direction={"column"}
            w={"100%"}
            p={8}
            h={"100vh"}
        >
            <Stat>
                <StatLabel as={Heading} fontWeight={"bold"}>
                    Actual balance
                </StatLabel>
                <StatNumber fontSize={"70px"}>
                    {data?.currentBalance.toLocaleString() || "0"} $
                </StatNumber>
            </Stat>
            <Flex
                gap={5}
                w={"100%"}
                my={25}
                direction={{
                    base: "row",
                    md: "column",
                    lg: "row",
                }}
            >
                <Graph accountId={+accountId} />
            </Flex>
            <Box w={"100%"}>
                <Heading>Transaction summary</Heading>
                <Flex w={"100%"} h={"100%"} justifyContent={"space-between"}>
                    <Box w="60%" overflow={"auto"}>
                        <Tabs variant={"soft-rounded"}>
                            <TabList>
                                <Tab>This month</Tab>
                                <Tab>This week</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <TransactionTable accountId={+accountId} />
                                </TabPanel>
                                <TabPanel>
                                    <TransactionTable accountId={+accountId} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                    <PieChart accountId={+accountId} />
                </Flex>
            </Box>
            <Tooltip label={"New transaction"} hasArrow>
                <IconButton
                    size={"lg"}
                    transform={"scale(2)"}
                    icon={<IoMdAddCircleOutline size={"32px"} />}
                    aria-label={"new transaction"}
                    isRound={true}
                    colorScheme={"blue"}
                    position={"fixed"}
                    bottom={50}
                    right={50}
                    onClick={() => onOpen()}
                />
            </Tooltip>
            <TransactionModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}
