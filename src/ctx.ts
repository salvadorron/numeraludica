import { useContext } from "react";
import { ModalContext } from "./ModalProvider";


export default function useModal() {
    return useContext(ModalContext)
}