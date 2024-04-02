import {
    Box,
    Flex,
    Heading,
    InputGroup,
    InputLeftElement,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatement } from "@/api/satement.ts";
import { useParams } from "@/router.ts";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { format, subDays } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { useState } from "react";

export function Catch() {
    return (
        <Flex
            w={"100%"}
            h={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Heading textAlign={"center"}>
                An error occurred :( <br /> Try to reload the page
            </Heading>
        </Flex>
    );
}

export default function Statement() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { accountId } = useParams("/dashboard/:accountId/statement");
    const [dates, setDates] = useState<Date[]>([
        subDays(new Date(), 7),
        new Date(),
    ]);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["getStatement"],
        queryFn: () =>
            getStatement(accountId, {
                start: format(dates[0], "yyyy-MM-dd"),
                end: format(dates[1], "yyyy-MM-dd"),
            }),
    });

    const mutation = useMutation({
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["getStatement"],
            });
        },
    });

    return (
        <Flex p={8} direction={"column"}>
            <Flex gap={2} justifyContent={"space-between"}>
                <Heading>Statements</Heading>
                <Box>
                    <InputGroup>
                        <InputLeftElement>
                            <BiCalendar />
                        </InputLeftElement>
                        <RangeDatepicker
                            propsConfigs={{
                                inputProps: {
                                    paddingStart: 8,
                                },
                            }}
                            selectedDates={[dates[0], dates[1]]}
                            onDateChange={(date) => {
                                if (dates.length > 1) {
                                    setDates(date);
                                } else {
                                    setDates(prev => [...prev, ...date]);
                                    mutation.mutate();
                                }
                            }}
                        />
                    </InputGroup>
                </Box>
            </Flex>
            {
                data?.length === 0 ? <Flex
                        w={"100%"}
                        h={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Heading>
                            No data available
                        </Heading>
                    </Flex> :
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Date</Th>
                                    <Th>Reference</Th>
                                    <Th>Label</Th>
                                    <Th>Credit</Th>
                                    <Th>Debit</Th>
                                    <Th>Balance</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data ? (
                                    data?.map((e, i) => (
                                        <Tr>
                                            <Td>{e.date.toString()}</Td>
                                            <Td>{e.reference}</Td>
                                            <Td>{e.label}</Td>
                                            <Td>{e.credit}</Td>
                                            <Td>{e.debit}</Td>
                                            <Td>{e.balance}</Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
            }
        </Flex>
    );
}
