import axiosClient from "@/api/client.ts";

export type GroupedTransfer = {
    id: number;
    label: string;
    accountId: number;
    updatedAt: Date;
}

export function getAllGroupedTransfer(accountId: number): Promise<GroupedTransfer[]> {
    return axiosClient.get(`/grouping/transaction/all/${accountId}`)
        .then(res => JSON.parse(res.data));
}