import axiosClient from "@/api/client.ts";

type Category = {
    id: number;
    name: string;
    comments: string;
    onlyOn: "DEBIT" | "CREDIT";
};

export function getCategoriesByType(
    transactionType: "DEBIT" | "CREDIT",
): Promise<Category[]> {
    return axiosClient
        .get("/categories", {
            params: {
                type: transactionType,
            },
        })
        .then((res) => JSON.parse(res.data));
}
