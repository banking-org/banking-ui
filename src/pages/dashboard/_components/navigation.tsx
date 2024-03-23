import {useParams} from "@/router"
import {Avatar, Flex, Heading, Skeleton, Text} from "@chakra-ui/react";
import SideStat from "./sideStat";
import {useQuery} from "@tanstack/react-query";
import {getAccountById} from "@/api/account";
import NavigationLink from "./navigationLink";
import {useAtom} from "jotai";
import {navigationAtom} from "../_atoms/navigationAtoms";
import {navigations} from "@/pages/dashboard/_components/navigationIndexes.tsx";

export default function Navigation() {
    const [navigation, setNavigation] = useAtom(navigationAtom);
    const {accountId} = useParams("/dashboard/:accountId");
    const {data, isLoading, error} = useQuery({
        queryKey: ['getAccountById'],
        queryFn: () => getAccountById(+accountId)
    });
    return <Flex flexDir={"column"} alignItems={"center"} p={3} gap={4}>
        <Flex w={"100%"} alignItems={"center"} gap={3}>
            <Avatar name={`${data?.firstname} ${data?.lastname}`}/>
            <Flex flexDir={"column"} justifyContent={"center"} h={"100%"}>
                <Skeleton isLoaded={!isLoading}>
                    <Heading as={"h3"} size={"sm"}>
                        {`${data?.firstname} ${data?.lastname}`}
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
}