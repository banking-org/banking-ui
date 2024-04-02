import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "@generouted/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
            <Routes />
        </QueryClientProvider>
    </ChakraProvider>,
);
