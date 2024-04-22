import axiosClient from "@/api/client.ts";

export type Interest = {
    id: number;
    firstInterest: number;
    effectiveInterest: number;
    maxDaysPayment: number;
};

export function getInterest(accountId: number): Promise<Interest> {
    return axiosClient
        .get(`/interest/${accountId}`)
        .then((res) => JSON.parse(res.data));
}
