import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getInterest } from "@/api/interest.ts";
import { getAccountById } from "@/api/account.ts";

export default function EditInterest({ accountId }: { accountId: number }) {
    const { data: account } = useQuery({
        queryKey: ["getAccountById"],
        queryFn: () => getAccountById(+accountId),
    });
    const { data } = useQuery({
        queryKey: ["getInterest"],
        queryFn: () => getInterest(accountId),
    });

    return account?.accountType === "DEBIT" ? (
        <Box w={"100%"}>
            <FormControl>
                <FormLabel>First interest</FormLabel>
                <Input placeholder={data?.firstInterest.toString()} />
            </FormControl>
            <FormControl>
                <FormLabel>Effective interest</FormLabel>
                <Input placeholder={data?.effectiveInterest.toString()} />
            </FormControl>
        </Box>
    ) : (
        <></>
    );
}
