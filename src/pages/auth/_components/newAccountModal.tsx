import {
    Button,
    Flex,
    FormControl,
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
    Switch,
    Text, useToast,
} from "@chakra-ui/react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {createAccount, NewAccount} from "@/api/account.ts";
import {useNavigate} from "@/router.ts";
import {SingleDatepicker} from "chakra-dayzed-datepicker";

type NewAccountModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewAccountModal({isOpen, onClose}: NewAccountModalProps) {
    const [netSalary, setNetSalary] = useState(0);
    const {register, formState, handleSubmit} = useForm<NewAccount>();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const toast = useToast()
    const [date, setDate] = useState<Date>();


    const submitHandler = (value: NewAccount) => {
        console.log(value);
        setLoading(true);
        createAccount(value).then(res => {
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            navigate("/dashboard/:accountId", {params: {accountId: "" + res.id}})
        }).catch(() => {
            toast({
                title: 'Account failed to create.',
                description: "Please retry later",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    return <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                Create a new account
            </ModalHeader>
            <ModalCloseButton/>
            <FormControl>
                <ModalBody>
                    <Flex gap={2}>
                        <Input
                            type={"text"}
                            placeholder={"Firstname"}
                            {...register("firstname", {
                                required: true,
                                minLength: 3
                            })}
                            isInvalid={!!formState.errors.firstname}
                        />
                        <Input
                            type={"text"}
                            placeholder={"Lastname"}
                            {...register("lastname", {
                                required: true,
                                minLength: 3
                            })}
                            isInvalid={!!formState.errors.lastname}
                        />
                    </Flex>
                    <Flex direction={"column"} my={2}>
                        <Text ml={2} color={"gray.400"}>Birthdate</Text>
                        <SingleDatepicker
                            onDateChange={(date) => {setDate(date)}}
                            date={date}
                            propsConfigs={{
                                inputProps: {
                                    placeholder: "Birthdate",
                                    ...register("birthdate", {required: true}),
                                    isInvalid: !!formState.errors.birthdate
                                }
                            }}
                        />
                    </Flex>
                    <Flex direction={"column"} my={2}>
                        <Text ml={2} color={"gray.400"}>Net Salary</Text>
                        <NumberInput
                            allowMouseWheel
                            onChange={(_, newSalary) => setNetSalary(newSalary)}
                            value={netSalary}
                            isInvalid={!!formState.errors.salary}
                        >
                            <NumberInputField {...register("salary", {
                                required: true, min: {
                                    value: 300,
                                    message: "Please quit it !"
                                }
                            })}/>
                        </NumberInput>
                    </Flex>
                    <Flex alignItems={"center"} justifyContent={"space-between"} w={"fit-content"} gap={2}>
                        <Text>Allow debit:</Text>
                        <Switch id='enable-funds' value={"DEBIT"} {...register("type")}/>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} colorScheme={"blue"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type={"submit"} onClick={handleSubmit(submitHandler)} isLoading={isLoading}>
                        Confirm
                    </Button>
                </ModalFooter>
            </FormControl>

        </ModalContent>
    </Modal>
}