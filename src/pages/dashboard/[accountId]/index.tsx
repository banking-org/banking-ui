import { useParams } from "../../../router";

export default function Dashboard() {
    const {accountId} = useParams("/dashboard/:accountId");
    return <>{accountId}</>
}