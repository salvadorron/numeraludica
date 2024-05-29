import { useContext } from "react";
import { ModalContext } from "./ModalProvider";


export default function useModal() {
    const modalContext = useContext(ModalContext)
    return modalContext
}