import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField
} from "@chakra-ui/react";
import {CreatableSelect, Select} from "chakra-react-select";
import {formatDateTime} from "@/pages/dashboard/[accountId]/_components/utils.ts";
import {useQuery} from "@tanstack/react-query";
import {getAllAccounts} from "@/api/account.ts";
import {PanelTabProps} from "@/pages/dashboard/[accountId]/_components/transactionModal.tsx";

export default function TransferPanel({onClose}: PanelTabProps) {
    const {data, isLoading, error} = useQuery({
        queryKey: ["allAccounts"],
        queryFn: () => getAllAccounts()
    })
    return <Flex direction={"column"} gap={5}>
        <FormControl>
            <Input type={"text"} placeholder={"Transfer label"}/>
        </FormControl>
        <FormControl>
            <NumberInput>
                <NumberInputField placeholder={"Amount"}/>
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>
                Date
            </FormLabel>
            <Input type={"datetime-local"} defaultValue={formatDateTime(new Date())}/>
        </FormControl>
        <FormControl>
            <CreatableSelect placeholder={"Select category"}/>
        </FormControl>
        <FormControl>
            <Select
                placeholder={"Destination"}
                isDisabled={isLoading}
                options={data?.map(account => ({
                    label: account.firstname + " " + account.lastname,
                    value: account.id
                }))}
            />
            <FormHelperText>
                * Leave this field empty if from external bank
            </FormHelperText>
        </FormControl>
        <Flex gap={2} justifyContent={"flex-end"}>
            <Button onClick={onClose}>
                Cancel
            </Button>
            <Button colorScheme={"blue"}>
                Confirm
            </Button>
        </Flex>
    </Flex>
}