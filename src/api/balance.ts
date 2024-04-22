import axiosClient from "@/api/client.ts";
import { Account } from "@/api/account.ts";

export type Balance = {
    account: Account;
    currentBalance: number;
    withdraws: number;
    interests: number;
};

export type Transaction = {
    id: number;
    amount: number;
    label: string;
    effectDate: Date;
    type?: "DEBIT" | "CREDIT";
};

export type TransactionResponse = {
    account: Account;
    currentAmount: number;
};

export function getBalanceByAccountId(accountId: number): Promise<Balance> {
    return axiosClient
        .get(`/balance/${accountId}`)
        .then((res) => JSON.parse(res.data));
}

export function deposit(
    accountId: number,
    transaction: Omit<Transaction, "id">,
): Promise<TransactionResponse> {
    return axiosClient
        .put(
            "/transaction/deposit",
            JSON.stringify({
                accountId,
                ...transaction,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )
        .then((res) => JSON.parse(res.data));
}

export function getAllTransactions(accountId: number): Promise<Transaction[]> {
    return axiosClient
        .get(`/transaction/${accountId}`)
        .then((res) => JSON.parse(res.data));
}

export async function doWithdraw(
    accountId: number,
    amount: number,
): Promise<void> {
    const res = await axiosClient.put(
        "/transaction/withdraw",
        JSON.stringify({
            accountId,
            amount,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (res.status === 406) {
        throw new Error(
            "This account cannot make debts. Please contact our bank for more information",
        );
    }

    return JSON.parse(res.data);
}
