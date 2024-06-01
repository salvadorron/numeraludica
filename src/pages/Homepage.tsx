import { useState } from "react";
import { Box, Image, Flex, Card, CardBody, Text, Heading, Stack, Divider } from "@chakra-ui/react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import logo from '../assets/logo.png';
import nav from '../assets/nav.png';
import Menu from "../components/Board/Menu";
import styles from './homepage.module.css';
import { PiGameControllerFill } from "react-icons/pi";
import { FaHandsHelping } from "react-icons/fa";
import { MdScoreboard } from "react-icons/md";

export default function HomePage() {
    const colors = ["#212962", "#f5eb50", "#7acedc", "#a52228"]
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
        <Box 
            bg="#b4b1cc" 
            minH="100vh"
        >

                <Stack
                    spacing={4}
                    align="center"
                >
                    <Image 
                        marginTop={12}
                        w="30%"
                        alt="NumeraLúdica" 
                        src={logo} 
                        />
                    <Box
                        display="flex"
                        gap={4}
                        marginTop={12}
                    >
                        <Text 
                            color="#000000"
                            fontSize='5xl'
                            fontWeight='light'
                            className={styles.Monserrat}
                        >
                            Aprende
                        </Text>
                        <Text 
                            color={color}
                            fontSize='5xl'
                            fontWeight='semibold'
                            className={styles.Monserrat}
                        >
                            {typeEffect}
                            <Cursor cursorColor={color}/>
                        </Text>
                        
                    </Box>


                    <Menu>
                        <Menu.Option icon={PiGameControllerFill} bgColor="#ffdf7a" type="primary" name="Empezar" href="aprenderacontar"/>
                        <Menu.Option icon={MdScoreboard} bgColor="#82c8a6" type="secondary"  name="Puntaje" href="puntaje" />
                        <Menu.Option icon={FaHandsHelping} bgColor="#be3b41" type="secondary" name="Ayuda" href="ayuda" />
                    </Menu>
                </Stack>
        </Box>
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




