import { useContext } from "react";
import { ModalContext } from "./ModalProvider";


export default function useModal() {
    const { openModal } = useContext(ModalContext)
    return openModal
}