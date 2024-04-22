import { Link } from "@/router";
import { Box, Flex, PropsOf, Text } from "@chakra-ui/react";
import { PropsWithChildren, ReactNode } from "react";

export type NavigationLinkProps = PropsOf<typeof Link> &
    PropsWithChildren<{
        icon: ReactNode;
        active?: boolean;
        onClick: () => void;
    }>;

export default function NavigationLink(props: NavigationLinkProps) {
    return (
        <Flex
            _hover={{
                bgColor: props.active ? "blue.200" : "gray.100",
            }}
            bgColor={props.active ? "blue.100" : ""}
            borderRadius={"lg"}
            transition={"0.7s"}
            cursor={"pointer"}
            alignItems={"center"}
            w={"100%"}
            p={4}
            gap={3}
            as={Link}
            to={props.to}
            params={props.params}
            onClick={props.onClick}
        >
            <Box>{props.icon}</Box>
            <Text>{props.children}</Text>
        </Flex>
    );
}
