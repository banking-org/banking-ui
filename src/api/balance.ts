import axiosClient from "@/api/client.ts";
import {Account} from "@/api/account.ts";

export type Balance = {
    account: Account;
    currentBalance: number;
    withdraws: number;
    interests: number;
}
export function getBalanceByAccountId(accountId: number): Promise<Balance> {
    return axiosClient.get(`/balance/${accountId}`).then(res => JSON.parse(res.data));
}