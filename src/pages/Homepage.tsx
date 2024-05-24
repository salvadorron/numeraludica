import { Image, Stack } from "@chakra-ui/react";
import logo from '../assets/logo.png';
import Menu from "../components/Board/Menu";
import styles from './homepage.module.css';

export default function HomePage() {
    return (
        <Stack className={styles.board}>
            <Image className={styles.image} src={logo} />
            <Menu>
                <Menu.Option name="Empezar" href="aprenderacontar" />
                <Menu.Option name="Puntaje" href="puntaje" />
                <Menu.Option name="Ayuda" href="ayuda" />
            </Menu>
        </Stack>
    )
}





