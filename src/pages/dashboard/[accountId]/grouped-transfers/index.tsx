import {
    Flex,
    Heading,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllGroupedTransfer } from "@/api/groupedTransaction.ts";
import { useParams } from "@/router.ts";
import { format } from "date-fns";
import { IoMdAddCircleOutline } from "react-icons/io";
import GroupedTransferModal from "@/pages/dashboard/[accountId]/grouped-transfers/_components/groupedTransferModal.tsx";

export default function GroupedTransfers() {
    const { accountId } = useParams("/dashboard/:accountId/grouped-transfers");
    const { data, isLoading, error } = useQuery({
        queryKey: ["getGroupedTransfers"],
        queryFn: () => getAllGroupedTransfer(+accountId),
    });

    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Flex p={8} direction={"column"}>
            <Heading>Grouped transfers</Heading>
            <Flex>
                {data?.length === 0 ? (
                    <Flex
                        w={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Text>You have no grouped transfers yet</Text>
                    </Flex>
                ) : (
                    <TableContainer w={"100%"}>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Id</Th>
                                    <Th>Label</Th>
                                    <Th>Updated At</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.map((transfer, id) => (
                                    <Tr key={id}>
                                        <Td>{transfer.id}</Td>
                                        <Td>{transfer.label}</Td>
                                        <Td>
                                            {format(
                                                transfer.updatedAt,
                                                "yyyy-MM-dd",
                                            )}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </Flex>
            <Tooltip label={"New grouped transfer"} hasArrow>
                <IconButton
                    size={"lg"}
                    transform={"scale(2)"}
                    icon={<IoMdAddCircleOutline size={"32px"} />}
                    aria-label={"new transaction"}
                    isRound={true}
                    colorScheme={"blue"}
                    position={"fixed"}
                    borderRadius={"md"}
                    bottom={50}
                    right={50}
                    onClick={() => onOpen()}
                />
            </Tooltip>
            <GroupedTransferModal
                isOpen={isOpen}
                onClose={onClose}
                accountId={+accountId}
            />
        </Flex>
    );
}
