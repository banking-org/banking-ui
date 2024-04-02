import { doWithdraw } from "@/api/balance.ts";
import { NewAccount, editAccount as editAcc } from "@/api/account.ts";

export type Withdrawal = {
    accountId: number,
    amount: number
}

export type AccountEditPayload = {
    accountId: number,
    data: NewAccount
}
export function withdraw(data: Withdrawal) {
    return doWithdraw(data.accountId, data.amount);
}

export function editAccount(data: AccountEditPayload) {
    return editAcc(data.data, data.accountId);
}