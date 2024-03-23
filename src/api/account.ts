import axiosClient from "./client";

export type Account = {
    firstname: string;
    lastname:string;
    accountNumber: number;
    salary: number;
    type: "NORMAL" | "DEBIT";
    birthdate: string;
    id: number;
}

export type NewAccount = Partial<Account>

export function getAllAccounts(): Promise<Account[]> {
    return axiosClient.get("/account").then(res => JSON.parse(res.data));
}

export function getAccountById(accountId: number): Promise<Account> {
    return axiosClient.get(`/account/${accountId}`).then(res => JSON.parse(res.data));
}

export function createAccount(account: NewAccount): Promise<Account> {
    return axiosClient.post(`/account`, JSON.stringify(account), {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => JSON.parse(res.data));
}