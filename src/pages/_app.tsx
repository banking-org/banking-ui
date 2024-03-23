import {Outlet} from 'react-router-dom'

export default function App() {
    return (
        <main style={{
            width: "100vw",
            height: "100vh"
        }}>
            <Outlet/>
        </main>
    )
}