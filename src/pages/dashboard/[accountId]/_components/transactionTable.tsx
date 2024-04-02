import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {getAllTransactions} from "@/api/balance.ts";

type TransactionTableProps = {
    accountId: number;
}
export default function TransactionTable({accountId}: TransactionTableProps) {
    const transactions = useQuery({
        queryKey: ["getTransaction"],
        queryFn: () => getAllTransactions(accountId)
    });
    return <TableContainer w={"100%"}>
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>Ref</Th>
                    <Th isNumeric>Amount</Th>
                    <Th>Type</Th>
                    <Th>Date</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    transactions.data ?
                        transactions.data.map(
                            (transaction, i) => <Tr key={i}>
                                <Td>
                                    {transaction.id}
                                </Td>
                                <Td isNumeric>
                                    {transaction.amount}
                                </Td>
                                <Td>
                                    {transaction?.type}
                                </Td>
                                <Td>
                                    {transaction.effectDate.toString()}
                                </Td>
                            </Tr>
                        ) : <>None</>
                }
            </Tbody>
        </Table>
    </TableContainer>
}