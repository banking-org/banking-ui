import { Params, Path } from "@/router";
import { ReactNode } from "react"
import {GoArrowBoth, GoHome} from "react-icons/go";

export type Navigation<T extends Path> = {
    icon: ReactNode;
    label: string;
    path: {
        url: T;
        params?: T extends keyof Params ? Params[T] : undefined;
    }
}

export const navigations= (accountId: string | number): Navigation<Path>[] => [
    {
        icon: <GoHome size={"25px"} />,
        label: "Home",
        path: {
            url: "/dashboard/:accountId",
            params: {accountId: accountId + ""}
        }
    },
    {
        icon: <GoArrowBoth size={"25px"}/>,
        label: "Transfers",
        path: {
            url: "/dashboard/:accountId/transfers",
            params: {accountId: accountId + ""}
        }
    },
]