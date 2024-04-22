import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import ExpensePanel from "@/pages/dashboard/[accountId]/_components/expensePanel.tsx";
import IncomePanel from "@/pages/dashboard/[accountId]/_components/incomePanel.tsx";
import TransferPanel from "@/pages/dashboard/[accountId]/_components/transferPanel.tsx";

type TransactionModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type PanelTabProps = {
    onClose: () => void;
};

export default function TransactionModal({
    isOpen,
    onClose,
}: TransactionModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs variant={"soft-rounded"}>
                        <TabList>
                            <Tab>Expense</Tab>
                            <Tab>Income</Tab>
                            <Tab>Transfer</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <ExpensePanel onClose={onClose} />
                            </TabPanel>
                            <TabPanel>
                                <IncomePanel onClose={onClose} />
                            </TabPanel>
                            <TabPanel>
                                <TransferPanel onClose={onClose} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
