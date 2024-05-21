import { Stack, Image } from "@chakra-ui/react";
import logo from '../assets/logo.png'
import Navbar from "../components/Navbar";

export default function Homepage () {
    return (
        <Navbar>
        <Stack>
            <Image src={logo} />
        </Stack>
        </Navbar>
    )
}