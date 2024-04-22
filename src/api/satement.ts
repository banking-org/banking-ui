import axiosClient from "@/api/client.ts";

type Statement = {
    date: Date;
    reference: string;
    label;
    string;
    credit: number;
    debit: number;
    balance: number;
};

type StatementDateRange = {
    start: Date | string;
    end: Date | string;
};

export function getStatement(
    accountId: string,
    range: StatementDateRange,
): Promise<Statement[]> {
    return axiosClient
        .get(`/statement/${accountId}`, {
            params: range,
        })
        .then((res) => JSON.parse(res.data));
}
