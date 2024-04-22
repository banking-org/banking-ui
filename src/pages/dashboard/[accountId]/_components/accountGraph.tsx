import { CommonData } from "@/api/dashboard.ts";
import {
    Box,
    Flex,
    Skeleton,
    SkeletonText,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";

type AccountGraphProps = {
    data: CommonData;
    graphType: "income" | "outcome";
};

export default function AccountGraph({ data, graphType }: AccountGraphProps) {
    return (
        <Flex
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
                    <SkeletonText
                        noOfLines={1}
                        skeletonHeight={"50px"}
                        isLoaded
                    >
                        <StatNumber fontSize={40} noOfLines={1}>
                            {data?.current || 0}$
                        </StatNumber>
                    </SkeletonText>
                    <StatHelpText>This month</StatHelpText>
                </Stat>
            </StatGroup>

            <Box w={"60%"} h={"200px"}>
                <Line
                    data={{
                        datasets: [
                            {
                                data: data?.insight?.map((v) => v.amount),
                                label: "ur money",
                                borderColor:
                                    graphType === "income"
                                        ? "rgb(75, 192, 192)"
                                        : "red",
                                //tension: 0.5
                            },
                        ],
                        labels: data?.insight?.map((v) => v.iteration),
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        maintainAspectRatio: false,
                        elements: {
                            line: { tension: 0.3 },
                            point: { radius: 0, hitRadius: 100 },
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                                display: false,
                            },
                            y: {
                                display: false,
                                title: {
                                    text: "Amount",
                                    display: false,
                                },
                                grid: { display: false },
                            },
                        },
                    }}
                />
            </Box>
        </Flex>
    );
}
