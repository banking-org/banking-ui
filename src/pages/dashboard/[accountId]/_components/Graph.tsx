import { CommonData, getSumDebitsAndCreditsData } from "@/api/dashboard.ts";
import { useQuery } from "@tanstack/react-query";
import AccountGraph from "./accountGraph";

interface Props {
    accountId: number;
}

export const Graph = ({ accountId }: Props) => {
    const { data } = useQuery({
        queryKey: ["graph-debits-and-credits"],
        queryFn: () => getSumDebitsAndCreditsData(accountId),
    });

    return (
        <>
            <AccountGraph
                data={data?.incomes || ({} as CommonData)}
                graphType={"income"}
            />
            <AccountGraph
                data={data?.outcomes || ({} as CommonData)}
                graphType={"income"}
            />
        </>
    );
};
