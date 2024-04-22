import axiosClient from "@/api/client.ts";

export interface AmountOnDate {
    iteration: string;
    amount: number;
}

export interface CommonData {
    current: number;
    insight: AmountOnDate[];
}

export interface SumDebitsAndCreditsData {
    incomes: CommonData;
    outcomes: CommonData;
}

export const getSumDebitsAndCreditsData = async (
    accountId: number,
    sort: "days" | "month" = "days",
): Promise<SumDebitsAndCreditsData> => {
    const { data } = await axiosClient.get(
        `/dash/sum_debits_and_credits/${accountId}?sort=${sort}`,
    );
    return JSON.parse(data);
};
