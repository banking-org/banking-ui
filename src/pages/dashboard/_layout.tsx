import { Grid, GridItem, useToast } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navigation from "./_components/navigation";
import { useNavigate } from "@/router.ts";
import { useEffect } from "react";

export function Catch() {
    const toast = useToast();
    const navigate = useNavigate();
    toast({
        title: "Error",
        description:
            "An error occurred, please login later. We are working on it",
    });
    useEffect(() => {
        navigate("/");
    }, []);
}

export default function DashboardLayout() {
    return (
        <Grid
            templateAreas={`"nav main"
                        "nav main"`}
            gridTemplateRows={"50px 1fr"}
            gridTemplateColumns={"350px 1fr"}
            h={"100vh"}
        >
            <GridItem area={"nav"}>
                <Navigation />
            </GridItem>
            <GridItem
                area={"main"}
                bgColor={"gray.100"}
                borderTopStartRadius={"20px"}
                overflow={"auto"}
            >
                <Outlet />
            </GridItem>
        </Grid>
    );
}
