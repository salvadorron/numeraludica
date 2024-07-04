import { ReactElement, useContext } from "react"
import { WorldContext } from "./WorldProvider"
import './Summary.css';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Background from "../Board/Background";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { HiPlay } from "react-icons/hi2";

const SummaryComponent = ({ children, isShow = false }: { children: ReactElement, isShow?: boolean }) => {
    const [typeEffect] = useTypewriter({
        words: ['Puntaje:'],
        typeSpeed: 100
    })
    const worldProvider = useContext(WorldContext)
    const currentPoint = worldProvider.getPoints();
    if (!isShow) return children
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
                            {currentPoint}
                        </Text>
                    </Flex>
                    <Button rightIcon={<HiPlay/>} onClick={() => worldProvider.onShowSummary(false)} colorScheme='red' variant={'solid'}>Continuar</Button>
                </Flex>
            </Flex>
        </Background>
    )
}

export default SummaryComponent
