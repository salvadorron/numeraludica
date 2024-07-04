import { Text, Flex, Box, Button } from "@chakra-ui/react"
import Background from "../components/Board/Background";
import { PiArrowCircleLeft } from "react-icons/pi"
import { Link } from "react-router-dom";

const HelpPage = () => {
    return (
        <Background>
            <Box>
                <Link to="/">
                    <Button  leftIcon={<PiArrowCircleLeft/>} colorScheme='blue' variant='ghost'>Volver</Button>
                </Link>
                <Flex  direction='column' gap={8} justifyContent='center' alignItems='center' paddingY={4}>
                    <Flex gap={12} direction="column" backgroundColor='#f4f3f6' width='80%' className="box" borderRadius='lg' minH={40}>
                        <Flex direction='column' padding={4} gap={16}>
                            <Flex direction='column' gap={2}>
                                <Text
                                    fontSize='2xl'
                                    fontWeight='semibold'
                                >
                                    ¿Necesitas ayuda para empezar a entretenerte en Numeralúdica?
                                </Text>
                                <Text
                                    fontSize='lg'
                                    marginLeft={4}
                                    fontWeight='light'
                                >
                                    Antes de cada nivel, encontrarás una breve descripción de cada uno de ellos para saber como proceder, tras terminar cada uno se te mostrará el puntaje que obtuviste en ese nivel.
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex gap={12} direction="column" backgroundColor='#f4f3f6' width='80%' className="box" borderRadius='lg' minH={40}>
                        <Flex direction='column' padding={4} gap={4}>
                            <Flex direction='row' gap={0}>
                                <Flex direction='column' alignItems='anchor-center'>
                                    <Text
                                        fontSize='4xl'
                                        fontWeight='semibold'
                                        color='#b4b1cc'
                                    >
                                        Nivel
                                    </Text>
                                    <Box marginTop={-8}>
                                        <Text
                                            fontSize='6xl'
                                            fontWeight='semibold'
                                            color='#b4b1cc'
                                        >
                                            1:
                                        </Text>
                                    </Box>
                                </Flex>
                                <Flex alignItems='self-end'>
                                    <Box marginY={6}>
                                        <Text
                                            fontSize='2xl'
                                            fontWeight='semibold'
                                        >
                                            Ábaco interactivo
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                                <Text
                                    fontSize='lg'
                                    fontWeight='light'
                                >
                                    En esta primera actividad que te ofrece Numeralúdica encontrarás con un ábaco, que contiene 10 esferas o circulos en cada fila, el objetivo de esta actividad es relacionar el número de esferas con el que aparece a la derecha de cada fila, una vez termines de relacionar cada fila, deberás presionar el botón "Validar respuesta" que encuentras en el menú derecho.
                                </Text>
                        </Flex>
                    </Flex>
                    <Flex gap={12} direction="column" backgroundColor='#f4f3f6' width='80%' className="box" borderRadius='lg' minH={40}>
                        <Flex direction='column' padding={4} gap={4}>
                            <Flex direction='row' gap={0}>
                                <Flex direction='column' alignItems='anchor-center'>
                                    <Text
                                        fontSize='4xl'
                                        fontWeight='semibold'
                                        color='#a52228'
                                    >
                                        Nivel
                                    </Text>
                                    <Box marginTop={-8}>
                                        <Text
                                            fontSize='6xl'
                                            fontWeight='semibold'
                                            color='#a52228'
                                        >
                                            2:
                                        </Text>
                                    </Box>
                                </Flex>
                                <Flex alignItems='self-end'>
                                    <Box marginY={6}>
                                        <Text
                                            fontSize='2xl'
                                            fontWeight='semibold'
                                        >
                                            Trazo de números
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                                <Text
                                    fontSize='lg'
                                    fontWeight='light'
                                >
                                    En la segunda actividad, se te presentará un cuadrado con números que van desde el 1 (uno) al diez (10), deberás trazar un recorrido llevando una secuencia ascendente, (1, 2, 3... 10) hasta llegar el número 10, entonces habrás vencido el nivel :)
                                </Text>
                        </Flex>
                    </Flex>
                    <Flex gap={12} direction="column" backgroundColor='#f4f3f6' width='80%' className="box" borderRadius='lg' minH={40}>
                        <Flex direction='column' padding={4} gap={4}>
                            <Flex direction='row' gap={0}>
                                <Flex direction='column' alignItems='anchor-center'>
                                    <Text
                                        fontSize='4xl'
                                        fontWeight='semibold'
                                        color='#e5c86d'
                                    >
                                        Nivel
                                    </Text>
                                    <Box marginTop={-8}>
                                        <Text
                                            fontSize='6xl'
                                            fontWeight='semibold'
                                            color='#e5c86d'
                                        >
                                            3:
                                        </Text>
                                    </Box>
                                </Flex>
                                <Flex alignItems='self-end'>
                                    <Box marginY={6}>
                                        <Text
                                            fontSize='2xl'
                                            fontWeight='semibold'
                                        >
                                            Mazo de cartas
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                                <Text
                                    fontSize='lg'
                                    fontWeight='light'
                                >
                                    En esta tercera actividad deberás según el número de fichas que contengan un objeto en el tablero, deberás relacionar esa cantidad con uno de los números en el menú derecho, podrás arrastrar con el ratón el número hacia el panel inferior donde se encuentra el elemento/fruta/verdura correspondiente.
                                </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Background>
    )
}

export default HelpPage