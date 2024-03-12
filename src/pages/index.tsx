import {useNavigate} from "../router.ts";
import {useEffect} from "react";

function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/auth")
    });
}

export default Home
