import { useParams } from "@/router.ts";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { formatDateTime } from "@/pages/dashboard/[accountId]/_components/utils.ts";
import { PanelTabProps } from "@/pages/dashboard/[accountId]/_components/transactionModal.tsx";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getCategoriesByType } from "@/api/categories.ts";
import { withdraw, Withdrawal } from "@/api/mutations.ts";

export default function ExpensePanel({ onClose }: PanelTabProps) {
    const { accountId } = useParams("/dashboard/:accountId");

    const { register, handleSubmit } = useForm<{ amount: number }>();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast({
        duration: 3000,
        position: "bottom-right",
    });

    const { data } = useQuery({
        queryKey: ["getCategoriesDEBIT"],
        queryFn: () => getCategoriesByType("DEBIT"),
    });

    const withdrawMutation = useMutation({
        mutationFn: (variables: Withdrawal) => {
            return withdraw(variables);
        },
        onSuccess: () => {
            toast({
                title: "Request sent",
                description: "Your transaction has been successful",
                status: "success",
            });
        },
        onSettled: () => {
            const queryKeys = ["getBalance", "getBalanceSide", "getTransaction"];
            queryKeys.forEach(key => queryClient.invalidateQueries({
                queryKey: [key],
            }));
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        },
    });


    const submitHandler = (value: { amount: number }) => {
        setIsLoading(true);
        withdrawMutation.mutate({
            accountId: +accountId,
            amount: value.amount,
        });
        onClose();
    };

    return <Flex direction={"column"} gap={5}>
        <FormControl>
            <Input type={"text"} placeholder={"Expense Name"} />
        </FormControl>
        <FormControl>
            <NumberInput>
                <NumberInputField placeholder={"Amount"} {...register("amount")} />
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>
                Date
            </FormLabel>
            <Input type={"datetime-local"} defaultValue={formatDateTime(new Date())} />
        </FormControl>
        <Select placeholder={"Select category"}
                options={data?.map(category => ({
                    label: category.name,
                    value: category.id,
                }))}
        />
        <Flex gap={2} justifyContent={"flex-end"}>
            <Button onClick={onClose}>
                Cancel
            </Button>
            <Button colorScheme={"blue"} onClick={handleSubmit(submitHandler)}>
                Confirm
            </Button>
        </Flex>
    </Flex>;
}