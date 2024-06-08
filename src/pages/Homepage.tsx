import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { MdScoreboard } from "react-icons/md";
import { PiGameControllerFill } from "react-icons/pi";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import logo from '../assets/logo.png';
import Background from "../components/Board/Background";
import Menu from "../components/Board/Menu";
import styles from './homepage.module.css';

export default function HomePage() {
    const colors = ["#212962", "#e5c86d", "#b4b1cc", "#a52228"]
    const [color, setColor] = useState<string>()
    const [typeEffect] = useTypewriter({
        onType(count) {
            setColor(colors[count])
        },
        words: ['y explora', 'y descubre', 'y diviértete', 'con NumeraLúdica'],
        typeSpeed: 100,
        deleteSpeed: 50,
    })
    return (
        <Background>
            <Stack
                spacing={4}
                align="center"
            >   <Box
                borderRadius={12}
                marginTop={6}
                width="35%"
                justifyContent="center"
                display="flex"
            >
                    <Image
                        padding={6}
                        alt="Logo de NumeraLúdica"
                        src={logo}
                    />
                </Box>
                <Box
                    display="flex"
                    gap={4}
                    marginTop={6}
                >
                    <Text
                        color="#000000"
                        fontSize='5xl'
                        fontWeight='light'
                        className={styles.Montserrat}
                    >
                        Aprende
                    </Text>
                    <Text
                        color={color}
                        fontSize='5xl'
                        fontWeight='semibold'
                        className={styles.Montserrat}
                    >
                        {typeEffect}
                        <Cursor cursorColor={color} />
                    </Text>

                </Box>
                <Menu>
                    <Menu.Option icon={PiGameControllerFill} bgColor="#ffdf7a" type="primary" name="Empezar" href="aprenderacontar" />
                    <Menu.Option icon={MdScoreboard} bgColor="#82c8a6" type="secondary" name="Puntaje" href="puntaje" />
                    <Menu.Option icon={FaHandsHelping} bgColor="#be3b41" type="secondary" name="Ayuda" href="ayuda" />
                </Menu>
            </Stack>
        </Background>
    )
}


{/* <Box w="100%">
                    <Card borderRadius={8} boxShadow='lg'>
                        <CardBody>
                            <Stack spacing={8} marginBottom={8}>
                            <Box>
                                <Text 
                                    bgGradient='linear(to-r, #82c8a6, #b4b1cc)'
                                    className={styles.Monserrat}
                                    fontSize='5xl'
                                    bgClip='text'
                                    fontWeight='semibold'
                                >
                                    ¡Bienvenido a NumeraLúdica!
                                </Text>
                                <Divider/>
                            </Box>
                            <Box>
                                <Heading className={styles.Monserrat} size="lg" color="#b4b1cc">
                                    ¿Qué es NumeraLúdica?
                                </Heading>
                            </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box> */}




