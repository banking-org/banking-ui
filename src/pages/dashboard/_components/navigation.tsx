import {useNavigate, useParams} from "@/router"
import {Avatar, Button, Flex, Heading, Skeleton, Text} from "@chakra-ui/react";
import SideStat from "./sideStat";
import {useQuery} from "@tanstack/react-query";
import {getAccountById} from "@/api/account";
import NavigationLink from "./navigationLink";
import {useAtom} from "jotai";
import {navigationAtom} from "../_atoms/navigationAtoms";
import {navigations} from "@/pages/dashboard/_components/navigationIndexes.tsx";
import {MdOutlineExitToApp} from "react-icons/md";

export default function Navigation() {
    const [navigation, setNavigation] = useAtom(navigationAtom);
    const {accountId} = useParams("/dashboard/:accountId");
    const {data, isLoading, error} = useQuery({
        queryKey: ['getAccountById'],
        queryFn: () => getAccountById(+accountId)
    });
    const navigate = useNavigate();
    return <Flex direction={"column"} justifyContent={"space-between"} h={"100%"}>
        <Flex flexDir={"column"} alignItems={"center"} p={3} gap={4}>
            <Flex w={"100%"} alignItems={"center"} gap={3}>
                <Avatar name={`${data?.firstname || ""} ${data?.lastname || ""}`}/>
                <Flex flexDir={"column"} justifyContent={"center"} h={"100%"}>
                    <Skeleton isLoaded={!isLoading}>
                        <Heading as={"h3"} size={"sm"}>
                            {data ? `${data?.firstname} ${data?.lastname}` : ""}
                        </Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} mt={isLoading ? "2" : ""}>
                        <Text>{data?.accountNumber}</Text>
                    </Skeleton>
                </Flex>
            </Flex>

            <SideStat show={navigation !== 0} accountId={+accountId}/>

            <Flex w={"100%"} flexDir={"column"} gap={2}>
                {
                    navigations(accountId).map((nav, i) =>
                        // @ts-expect-error This type should not fail but typescript force me to do it
                        <NavigationLink
                            onClick={() => {
                                setNavigation(i)
                            }}
                            active={navigation === i}
                            key={i}
                            icon={nav.icon}
                            to={nav.path.url}
                            params={nav.path.params}
                        >
                            {nav.label}
                        </NavigationLink>
                    )
                }
            </Flex>
        </Flex>
        <Button
            colorScheme={"orange"}
            m={2}
            leftIcon={<MdOutlineExitToApp />}
            onClick={() => {
                navigate("/")
                setNavigation(0)
            }}
        >
            Leave
        </Button>
    </Flex>
}