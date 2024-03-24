import {Outlet} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
    return (
        <main style={{
            width: "100vw",
            height: "100vh"
        }}>
            <QueryClientProvider client={queryClient}>
                <Outlet/>
            </QueryClientProvider>
        </main>
    )
}