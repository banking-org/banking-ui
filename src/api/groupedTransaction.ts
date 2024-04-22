import axiosClient from "@/api/client.ts";

export type GroupedTransfer = {
    id: number;
    label: string;
    accountId: number;
    updatedAt: Date;
};

export type NewGroupedTransfer = {
    label: string;
    accountId: number;
    targetsId: number[];
    amount: number;
    effectDate: Date;
};

export function getAllGroupedTransfer(
    accountId: number,
): Promise<GroupedTransfer[]> {
    return axiosClient
        .get(`/grouping/transaction/all/${accountId}`)
        .then((res) => JSON.parse(res.data));
}

export function doGroupTransfer(payload: NewGroupedTransfer): Promise<void> {
    return axiosClient.put("/transfer/grouped", JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
