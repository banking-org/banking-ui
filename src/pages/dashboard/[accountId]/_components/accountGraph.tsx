import {
    Box,
    Flex,
    Skeleton,
    SkeletonText,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber
} from "@chakra-ui/react";
import {Line} from "react-chartjs-2";

type AccountGraphProps = {
    accountId: number;
    graphType: "income" | "outcome";
}

export default function AccountGraph({accountId, graphType}: AccountGraphProps) {
    return <Flex
        backgroundColor={"gray.200"}
        shadow={"lg"}
        borderRadius={"lg"}
        w={"100%"}
        overflow={"hidden"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={"200px"}
    >
        <StatGroup p={5} w={"40%"} h={"100%"}>
            <Stat>
                <StatLabel>
                    {graphType === "income" ? "Income" : "Outcome"}
                </StatLabel>
                <SkeletonText noOfLines={1} skeletonHeight={"50px"} isLoaded>
                    <StatNumber fontSize={40} noOfLines={1}>
                        0$
                    </StatNumber>
                </SkeletonText>
                <StatHelpText>
                    This month
                </StatHelpText>
            </Stat>
        </StatGroup>

        <Box w={"60%"} h={"200px"}>
            <Line
                data={{
                    datasets: [
                        {
                            data: [65, 59, 80, 81, 56, 55],
                            label: "ur money",
                            borderColor: graphType === "income" ? "rgb(75, 192, 192)" : "red",
                            //tension: 0.5
                        },
                    ],
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    maintainAspectRatio: false,
                    elements: {
                        line: {tension: 0.3},
                        point: {radius: 0, hitRadius: 100},
                    },
                    scales: {
                        x: {
                            grid: {display: false},
                            display: false,
                        },
                        y: {
                            display: false,
                            title: {
                                text: "Amount",
                                display: false,
                            },
                            grid: {display: false},
                        },
                    },
                }}
            />
        </Box>
    </Flex>
}