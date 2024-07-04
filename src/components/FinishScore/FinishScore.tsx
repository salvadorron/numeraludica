import { useContext } from "react"
import { WorldContext } from "../World/WorldProvider"
import './Finish.css';
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Background from "../Board/Background";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { FaHome } from "react-icons/fa";

const FinishScore = () => {
    const [typeEffect] = useTypewriter({
        words: ['Puntaje final:'],
        typeSpeed: 100
    })
    const worlProvider = useContext(WorldContext)
    return (
        <Background>
        <Flex justifyContent='center' paddingTop={24}>
            <Flex gap={12} direction="column" justifyContent='center' alignItems='center' backgroundColor='#f4f3f6' width='40%' className="box" borderRadius='lg' minH={400}>
                <Flex direction='column' justifyContent='center' alignItems='center'>
                    <Box>
                        <Text
                            fontSize='5xl'
                            fontWeight='semibold'
                            color='#b4b1cc'
                        >
                            {typeEffect}
                            <Cursor cursorColor="#b4b1cc"/>
                        </Text>
                    </Box>
                    <Text fontSize="6xl" fontWeight='semibold'>
                        {worlProvider.getSummary()}
                    </Text>
                </Flex>
                <Flex direction='column' justifyContent='center' alignContent='center' alignItems='center' gap={4}>
                    <Link to='/'>
                        <Button leftIcon={<FaHome/>} colorScheme='blue' variant={'solid'}>Inicio</Button>
                    </Link>
                    <Text fontSize="2xl" fontWeight='semibold'>¡Gracias por participar en Numeralúdica!</Text>
                </Flex>
            </Flex>
        </Flex>
    </Background>
    )
}

export default FinishScore

