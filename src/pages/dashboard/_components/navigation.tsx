import { useNavigate, useParams } from "@/router";
import { Avatar, Button, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import SideStat from "./sideStat";
import NavigationLink from "./navigationLink";
import { useAtom } from "jotai";
import { navigationAtom } from "../_atoms/navigationAtoms";
import { navigations } from "@/pages/dashboard/_components/navigationIndexes.tsx";
import { MdOutlineExitToApp } from "react-icons/md";
import AccountHeader from "@/pages/dashboard/_components/accountHeader.tsx";

export default function Navigation() {
    const { accountId } = useParams("/dashboard/:accountId");
    const [navigation, setNavigation] = useAtom(navigationAtom);
    const navigate = useNavigate();
    return <Flex direction={"column"} justifyContent={"space-between"} h={"100%"}>
        <Flex flexDir={"column"} alignItems={"center"} p={3} gap={4}>

            <AccountHeader accountId={+accountId} />

            <SideStat show={navigation !== 0} accountId={+accountId} />

            <Flex w={"100%"} flexDir={"column"} gap={2}>
                {
                    navigations(accountId).map((nav, i) =>
                        // @ts-expect-error This type should not fail but typescript force me to do it
                        <NavigationLink
                            onClick={() => {
                                setNavigation(i);
                            }}
                            active={navigation === i}
                            key={i}
                            icon={nav.icon}
                            to={nav.path.url}
                            params={nav.path.params}
                        >
                            {nav.label}
                        </NavigationLink>,
                    )
                }
            </Flex>
        </Flex>
        <Button
            colorScheme={"orange"}
            m={2}
            leftIcon={<MdOutlineExitToApp />}
            onClick={() => {
                navigate("/");
                setNavigation(0);
            }}
        >
            Leave
        </Button>
    </Flex>;
}