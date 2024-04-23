import { getSumByCategory } from "@/api/dashboard.ts";
import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Doughnut } from "react-chartjs-2";

interface Props {
    accountId: number;
}

export const PieChart = ({ accountId }: Props) => {
    const { data } = useQuery({
        queryKey: ["pie-chart-categories", accountId],
        queryFn: () => getSumByCategory(accountId)
    });

    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            w={"40%"}
        >
            <Doughnut
                options={{}}
                data={{
                    labels: data?.map(v => v.categoryName) || [],
                    datasets: [
                        {
                            label: "Category",
                            data: data?.map(v => v.totalAmount) || [],
                            backgroundColor: [
                                "rgb(255, 99, 132)",
                                "rgb(54, 162, 235)",
                                "rgb(255, 205, 86)",
                            ],
                            hoverOffset: 4,
                        },
                    ],
                }}
            />
        </Flex>
    );
}