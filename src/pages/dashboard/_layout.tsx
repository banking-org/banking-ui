import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './_components/header';
import Navigation from './_components/navigation';

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
            <GridItem area={"main"} bgColor={"gray.100"} borderTopStartRadius={'20px'} overflow={"auto"}>
                <Outlet/>
            </GridItem>
        </Grid>
    );
}
