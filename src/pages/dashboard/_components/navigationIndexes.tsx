import { Params, Path } from "@/router";
import React, { ReactNode } from "react";
import { GoHome } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";
import { MdTransferWithinAStation } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";

export type Navigation<T extends Path> = {
    icon: ReactNode;
    label: string;
    path: {
        url: T;
        params?: T extends keyof Params ? Params[T] : undefined;
    }
}

export const navigations = (accountId: string | number): Navigation<Path>[] => [
    {
        icon: <GoHome size={"25px"} />,
        label: "Home",
        path: {
            url: "/dashboard/:accountId",
            params: { accountId: accountId + "" },
        },
    },
    {
        icon: <GiMoneyStack size={"25px"} />,
        label: "Debts",
        path: {
            url: "/dashboard/:accountId/debts",
            params: {
                accountId: accountId + "",
            },
        },
    },
    {
        icon: <GrDocumentPerformance />,
        label: "Statement",
        path: {
            url: "/dashboard/:accountId/statement",
            params: {
                accountId: accountId + "",
            },
        },
    },
    {
        icon: <MdTransferWithinAStation />,
        label: "Grouped Transfer",
        path: {
            url: "/dashboard/:accountId/grouped-transfers",
            params: {
                accountId: accountId + ""
            }
        }
    },
];