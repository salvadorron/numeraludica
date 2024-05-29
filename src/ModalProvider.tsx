import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { createContext, useRef } from "react";

export const ModalContext = createContext<{
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    onToggle: () => void,
    isControlled: boolean,
    getButtonProps: (props?: any) => any,
    getDisclosureProps: (props?: any) => any
}>({
    isOpen: false,
    onOpen: () => null,
    onClose: () => null,
    onToggle: () => null,
    isControlled: false,
    getButtonProps: () => false,
    getDisclosureProps: () => false
})

export default function ModalProvider({ children }: { children: React.ReactElement }) {

    const disclosure = useDisclosure()
    const ref = useRef<HTMLButtonElement>(null)

    return (
        <ModalContext.Provider value={disclosure} >
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
                    <AlertDialogHeader>Has perdido</AlertDialogHeader>
                    <AlertDialogBody>
                        Has agotado el numero maximo de intentos posibles
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme='red' ml={3}>
                            Reintentar
                        </Button>
                        <Button variant='ghost' ml={3} onClick={() => window.location.reload()}>
                            Salir
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {children}
        </ModalContext.Provider>
    )

}