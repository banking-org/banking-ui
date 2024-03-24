import {useParams} from "@/router.ts";
import {Button, Flex, FormControl, FormLabel, Input, NumberInput, NumberInputField, useToast} from "@chakra-ui/react";
import {CreatableSelect} from "chakra-react-select";
import {formatDateTime} from "@/pages/dashboard/[accountId]/_components/utils.ts";
import {PanelTabProps} from "@/pages/dashboard/[accountId]/_components/transactionModal.tsx";
import {useForm} from "react-hook-form";
import {deposit, Transaction} from "@/api/balance.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

export default function IncomePanel({onClose}: PanelTabProps) {
    const {accountId} = useParams("/dashboard/:accountId");
    const {register, formState, handleSubmit} = useForm<Transaction>();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast({
        duration: 3000,
        position: "bottom-right"
    });

    const submitHandler = (value: Transaction) => {
        setIsLoading(true);
        toast.promise(deposit(+accountId, value).then(() => {
            queryClient.refetchQueries({
                queryKey: ["getBalance", "getTransaction"]
            })
            onClose()
        }), {
            error: {
                title: "Transaction failed",
                description: "Please retry again",
                isClosable: true
            },
            loading: {
                title: "Transaction in progress",
                description: "Please wait",
                isClosable: true
            },
            success: {
                title: "Transaction success",
                description: "Your transaction was successfully done"
            }
        })
    }

    return <Flex direction={"column"} gap={5}>
        <FormControl>
            <Input type={"text"} placeholder={"Income Name"} {...register("label")}/>
        </FormControl>
        <FormControl>
            <NumberInput>
                <NumberInputField placeholder={"Amount"} {...register("amount", {valueAsNumber: true})}/>
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>
                Date
            </FormLabel>
            <Input type={"datetime-local"} defaultValue={formatDateTime(new Date())} {...register("effectDate")}/>
        </FormControl>
        <CreatableSelect placeholder={"Select category"}/>
        <Flex gap={2} justifyContent={"flex-end"}>
            <Button onClick={onClose}>
                Cancel
            </Button>
            <Button colorScheme={"blue"} onClick={handleSubmit(submitHandler)} isLoading={isLoading}>
                Confirm
            </Button>
        </Flex>
    </Flex>
}
