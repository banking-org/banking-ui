import { Avatar, Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getAccountById, NewAccount } from "@/api/account.ts";
import { useParams } from "@/router.ts";
import EditInterest from "@/pages/dashboard/[accountId]/edit/_components/EditInterest.tsx";
import { useForm } from "react-hook-form";

export default function EditAccount() {
    const { accountId } = useParams("/dashboard/:accountId/edit");
    const { data, isLoading, error } = useQuery({
        queryKey: ["getAccountById"],
        queryFn: () => getAccountById(+accountId),
    });

    const { register, handleSubmit, formState } = useForm<NewAccount>({
        defaultValues: data
    });

    const submitHandler = (data: NewAccount) => {
        console.log("clicked");
    }


    return <Flex p={8} direction={"column"} gap={8}>
        <Heading>
            Edit your account
        </Heading>
        <Flex gap={8}>
            <Box>
                <Avatar name={data && `${data?.firstname} ${data?.lastname}`} size={"2xl"} />
            </Box>
            <Box maxW={"500px"} minW={"250px"} w={"100%"}>
                <FormControl>
                    <FormLabel>Firstname</FormLabel>
                    <Input placeholder={data?.firstname} {...register("firstname", {required: true})}/>
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Lastname
                    </FormLabel>
                    <Input
                        placeholder={data?.lastname}
                        {...register("lastname", {required: true})}
                        isInvalid={!!formState.errors?.lastname}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Salary</FormLabel>
                    <Input
                        placeholder={data?.salary.toLocaleString()}
                        {...register("salary", {required: true})}
                        isInvalid={!!formState.errors?.salary}
                    />
                </FormControl>
                <EditInterest accountId={+accountId} />
                <Flex mt={5}>
                    <Button
                        isDisabled={formState.isDirty}
                        colorScheme={"blue"}
                        onClick={handleSubmit(submitHandler)}
                    >
                        Done
                    </Button>
                </Flex>
            </Box>
        </Flex>
    </Flex>;
}