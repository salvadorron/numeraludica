import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";
import { MdScoreboard } from "react-icons/md";
import { PiGameControllerFill, PiArrowLineLeftLight } from "react-icons/pi";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import logo from '../assets/logo.png';
import Background from "../components/Board/Background";
import Menu from "../components/Board/Menu";
import styles from './homepage.module.css';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    Button,
    AlertDialogOverlay,
    Divider,
    useDisclosure
  } from '@chakra-ui/react'

export default function HomePage() {
    const colors = ["#212962", "#e5c86d", "#b4b1cc", "#a52228"]
    const [color, setColor] = useState<string>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useNavigate()
    const [ game, setGame ] = useState<boolean>(false);
    const ref = useRef<HTMLButtonElement>(null)
    const [typeEffect] = useTypewriter({
        onType(count) {
            setColor(colors[count])
        },
        words: ['y explora', 'y descubre', 'y diviértete', 'con NumeraLúdica'],
        typeSpeed: 100,
        deleteSpeed: 50,
    })

    const handleGame = () => {
        setGame(true);
        onOpen();
    }
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
                    <Menu.Option icon={PiGameControllerFill} bgColor="#ffdf7a" type="primary" name="Empezar" onClick={handleGame} />
                    <Menu.Option icon={MdScoreboard} bgColor="#82c8a6" type="secondary" name="Puntaje" href="puntaje" />
                    <Menu.Option icon={FaHandsHelping} bgColor="#be3b41" type="secondary" name="Ayuda" href="ayuda" />
                </Menu>
                {game &&     <>
    <AlertDialog
        isOpen={isOpen}
        size={'3xl'}
        leastDestructiveRef={ref}
        onClose={onClose}
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                ¡Aprende con Numeralúdica!
            </AlertDialogHeader>

            <AlertDialogBody>
                ¡Númeraludica es un lugar en el que podras mejorar tus habilidades para el conteo y asociación de cantidades a un número específico.
                Encontrarás diversas actividades con las cuales divertirte mientras aprendes :)
            </AlertDialogBody>    
            <Divider sx={{ width: "auto" }} mx={8} marginTop={4} />
            <AlertDialogFooter>
                <Button onClick={onClose} variant="ghost" leftIcon={<PiArrowLineLeftLight/>}>
                Volver
            </Button>
            <Button bgColor="#82c8a6" _hover={{ backgroundColor: '#212962', color: 'white' }} onClick={() => router('/aprenderacontar')} ml={3} rightIcon={<PiGameControllerFill/>}>
                ¡Empieza a divertirte!
            </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
    </>
}                
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
                                    className={styles.Montserrat}
                                    fontSize='5xl'
                                    bgClip='text'
                                    fontWeight='semibold'
                                >
                                    ¡Bienvenido a NumeraLúdica!
                                </Text>
                                <Divider/>
                            </Box>
                            <Box>
                                <Heading className={styles.Montserrat} size="lg" color="#b4b1cc">
                                    ¿Qué es NumeraLúdica?
                                </Heading>
                            </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box> */}




