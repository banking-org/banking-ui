import axiosClient from "./client";

export type Account = {
    name: string;
    email: string;
    id: number;
}

export function getAllAccounts(): Promise<Account[]> {
    return axiosClient.get("/users").then(res => JSON.parse(res.data));
}