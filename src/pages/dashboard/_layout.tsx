import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './_components/header';

export default function DashboardLayout() {
    return (
        <Grid
            templateAreas={`"header header"
                        "nav main"`}
            gridTemplateRows={"50px 1fr"}
            gridTemplateColumns={"300px 1fr"}
            h={"100vh"}
        >
            <GridItem area={"header"} bgColor={"red"}>
                <Header/>
            </GridItem>
            <GridItem area={"nav"} bgColor={"green"}>
                Navigation
            </GridItem>
            <GridItem area={"main"}>
                <Outlet/>
            </GridItem>
        </Grid>
    );
}
