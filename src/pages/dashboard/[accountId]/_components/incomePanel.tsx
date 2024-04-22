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
import { deposit, Transaction } from "@/api/balance.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getCategoriesByType } from "@/api/categories.ts";

export default function IncomePanel({ onClose }: PanelTabProps) {
    const { accountId } = useParams("/dashboard/:accountId");
    const { register, formState, handleSubmit } = useForm<Transaction>();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast({
        duration: 3000,
        position: "bottom-right",
    });

    const { data, error } = useQuery({
        queryKey: ["getCategoriesCREDIT"],
        queryFn: () => getCategoriesByType("CREDIT"),
    });

    const mutation = useMutation({
        mutationFn: (value: Transaction) => deposit(+accountId, value),
        onSettled: () => {
            const queryKeys = [
                "getBalance",
                "getBalanceSide",
                "getTransaction",
            ];
            queryKeys.forEach((key) => {
                queryClient.invalidateQueries({
                    queryKey: [key],
                });
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Your transaction has been successful",
                status: "success",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Transaction has failed, please try again later",
            });
        },
    });

    const submitHandler = (value: Transaction) => {
        setIsLoading(true);
        mutation.mutate(value);
        onClose();
    };

    return (
        <Flex direction={"column"} gap={5}>
            <FormControl>
                <Input
                    type={"text"}
                    placeholder={"Income Name"}
                    {...register("label")}
                />
            </FormControl>
            <FormControl>
                <NumberInput>
                    <NumberInputField
                        placeholder={"Amount"}
                        {...register("amount", { valueAsNumber: true })}
                    />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                    type={"datetime-local"}
                    defaultValue={formatDateTime(new Date())}
                    {...register("effectDate")}
                />
            </FormControl>
            <Select
                placeholder={"Select category"}
                options={data?.map((category) => ({
                    label: category.name,
                    value: category.id,
                }))}
            />
            <Flex gap={2} justifyContent={"flex-end"}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    colorScheme={"blue"}
                    onClick={handleSubmit(submitHandler)}
                    isLoading={isLoading}
                >
                    Confirm
                </Button>
            </Flex>
        </Flex>
    );
}
