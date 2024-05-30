import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { createContext, useRef, useState } from "react";

type ModalOptions = {
    title?: string,
    description?: string,
    button1?: {
        text?: string,
        onClick?: () => void
    },
    button2?: {
        text?: string,
        onClick?: () => void
    }
}


type ModalFunction = {
    openModal: (modalOptions?: ModalOptions) => void
}

export const ModalContext = createContext<ModalFunction>({ openModal: () => null })

export default function ModalProvider({ children }: { children: React.ReactElement }) {

    const [modal, setModal] = useState<ModalOptions | undefined>()

    const disclosure = useDisclosure()

    function openModal(modalOptions?: ModalOptions) {
        setModal({
            ...modalOptions
        })
        return disclosure.onOpen()
    }

    const ref = useRef<HTMLButtonElement>(null)

    return (
        <ModalContext.Provider value={{ openModal }}>
            <AlertDialog
                motionPreset='slideInTop'
                leastDestructiveRef={ref}
                onClose={disclosure.onClose}
                isOpen={disclosure.isOpen}
                isCentered
                closeOnEsc={false}
                closeOnOverlayClick={false}
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{modal?.title}</AlertDialogHeader>
                    <AlertDialogBody>
                        {modal?.description}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme='red' ml={3} onClick={() => {
                            disclosure.onClose()
                            modal?.button1?.onClick && modal?.button1?.onClick()
                        }}>
                            {modal?.button1?.text}
                        </Button>
                        <Button variant='ghost' ml={3} onClick={() => {
                            disclosure.onClose()
                            modal?.button2?.onClick && modal.button2.onClick()
                        }}>
                            {modal?.button2?.text}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {children}
        </ModalContext.Provider>
    )

}