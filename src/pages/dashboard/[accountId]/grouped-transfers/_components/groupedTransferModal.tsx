import {
    Avatar,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    Tag,
    TagLabel,
    useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAccounts } from "@/api/account.ts";
import {
    doGroupTransfer,
    NewGroupedTransfer,
} from "@/api/groupedTransaction.ts";
import { Controller, useForm } from "react-hook-form";

type GroupedTransferModalProps = {
    isOpen: boolean;
    onClose: () => void;
    accountId: number;
};

export default function GroupedTransferModal(props: GroupedTransferModalProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["allAccounts"],
        queryFn: () => getAllAccounts(),
    });

    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationKey: ["groupedTransfer"],
        mutationFn: (payload: NewGroupedTransfer) => doGroupTransfer(payload),
        onSettled: () => {
            const invalidKeys = ["getBalanceSide", "getGroupedTransfers"];
            invalidKeys.forEach((key) =>
                queryClient.invalidateQueries({
                    queryKey: [key],
                }),
            );
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Your grouped transfer was done successfully",
                status: "success",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description:
                    "There was an error while processing your request." +
                    " Please try again later",
            });
        },
    });

    const { register, handleSubmit, formState, control } =
        useForm<NewGroupedTransfer>();
    const submitHandler = (value: NewGroupedTransfer) => {
        mutation.mutate({
            ...value,
            targetsId: value.targetsId.map((val) => val.value),
            accountId: props.accountId,
        });
        props.onClose();
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New transaction group</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={"column"}>
                        <FormControl>
                            <FormLabel>Label</FormLabel>
                            <Input
                                placeholder={"Eg: Salary, Tickets ,..."}
                                {...register("label", { required: true })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <NumberInput allowMouseWheel>
                                <NumberInputField
                                    defaultValue={0}
                                    min={0}
                                    placeholder={"25.0"}
                                    {...register("amount", { required: true })}
                                />
                            </NumberInput>
                        </FormControl>
                        <FormControl w={"100%"}>
                            <FormLabel>Recipients</FormLabel>
                            <Flex>
                                <Controller
                                    render={({
                                        field: {
                                            onChange,
                                            onBlur,
                                            name,
                                            value,
                                            ref,
                                            disabled,
                                        },
                                    }) => (
                                        <Select
                                            isMulti
                                            onBlur={onBlur}
                                            name={name}
                                            value={value}
                                            ref={ref}
                                            isDisabled={isLoading || disabled}
                                            placeholder={"Recipients"}
                                            options={data
                                                ?.map((res) => ({
                                                    label: `${res.firstname} ${res.lastname}`,
                                                    value: res.id,
                                                }))
                                                .filter(
                                                    (data) =>
                                                        data.value !==
                                                        props.accountId,
                                                )}
                                            onChange={onChange}
                                        />
                                    )}
                                    name={"targetsId"}
                                    control={control}
                                />
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <Input
                                type={"date"}
                                {...register("effectDate", { required: true })}
                            />
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter gap={2}>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button
                        colorScheme={"blue"}
                        onClick={handleSubmit(submitHandler)}
                    >
                        Done
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
