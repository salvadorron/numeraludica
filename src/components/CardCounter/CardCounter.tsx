import { Box, Image, Tooltip,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    Button,
    AlertDialogOverlay,
    Divider,
    Text,
    Flex,
    useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState, useRef } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable, ResponderProvided } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import useModal from '../../ctx';
import Background from '../Board/Background';
import { WorldContext } from '../World/WorldProvider';
import './CardCounter.css'
import fruits from '../../assets/fruits/fruits.json';
import { PiGameControllerFill, PiArrowLineLeftLight } from 'react-icons/pi';


const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
    }, {} as Record<K, T[]>);


const getRandomizeNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//TYPES

type GameLife = {
    current: number
    limit: number
}

type SourceItem = {
    name: string
    length: number
    image: string
    color: string
}

type Fruit = {
    id: string,
    url: string
    name: string,
    color: string
}


//Motions

const boardAnimation = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0,
            staggerChildren: 0.050
        }
    }
}

const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

export default function CardCounter() {

    const modal = useModal()

    const worlProvider = useContext(WorldContext)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ref = useRef<HTMLButtonElement>(null)

    const [ openedHelp, setOpenedHelp ] = useState(true); 

    const router = useNavigate()

    const [itemList, setItemList] = useState<Fruit[]>([])

    const [sourceList, setSourceList] = useState<SourceItem[]>([])

    const [destinationList, setDestinationList] = useState<SourceItem[]>([])

    const [randomSourceList, setRandomSourceList] = useState<SourceItem[]>([])

    const [correct, setCorrect] = useState<GameLife>({ current: 0, limit: 3 })

    const [life, setLife] = useState<GameLife>({ current: 3, limit: 0 })


    function getRandomUniqueNumber(arr: SourceItem[]) {
        const randonNumber = Math.floor(Math.random() * 10) + 1;
        if (arr.some(item => item.length === randonNumber)) return getRandomUniqueNumber(arr)
        return randonNumber
    }


    function getFruitById(id: number) {
        const fruit = fruits[id]
        return fruit
    }


    async function initialBoard() {

        setLife({
            ...life,
            current: 3
        })

        setCorrect({
            ...correct,
            current: 0
        })

        let initalRandomId1, initalRandomId2, initalRandomId3;

        do {
            initalRandomId1 = Math.floor((Math.random() * 16));
            initalRandomId2 = Math.floor((Math.random() * 16));
            initalRandomId3 = Math.floor((Math.random() * 16));
        } while((initalRandomId1 === initalRandomId2) || (initalRandomId1 === initalRandomId3) || (initalRandomId2 === initalRandomId3))

        let num1, num2, num3;
        let max = 30;
        let currentMax = 30;


        do {

            num1 = getRandomizeNumber(1, currentMax)

            currentMax -= num1;

            num2 = getRandomizeNumber(1, currentMax)

            num3 = max - (num1 + num2)

            currentMax = max;

        } while (num1 === num2 || num1 === num3 || num2 === num3 || num1 < 4 || num2 < 4 || num3 < 4)



        const listPoke1: Fruit[] = [];
        const listPoke2: Fruit[] = [];
        const listPoke3: Fruit[] = [];


        for (let i = 1; i <= num1; i++) {
                const data = getFruitById(initalRandomId1)
                listPoke1.push({...data, id: crypto.randomUUID(), color: '#e5c86d' })
        }

        for (let i = 1; i <= num2; i++) {
  
                const data = getFruitById(initalRandomId2)
                listPoke2.push({ ...data, id: crypto.randomUUID(), color: '#82c8a6' })
            
        }

        for (let i = 1; i <= num3; i++) {
                const data = getFruitById(initalRandomId3)
                listPoke3.push({ ...data, id: crypto.randomUUID(), color: '#be3b41' })

        }

        const randomAllList = [...listPoke1, ...listPoke2, ...listPoke3].sort(() => Math.random() - 0.5)

        const groupRandomAllList = groupBy(randomAllList, i => i.name)
        const sourceList = Object.keys(groupRandomAllList).map(item => {
            const name = item;
            const length = groupRandomAllList[item].length;
            const image = groupRandomAllList[item][0].url;
            const color = groupRandomAllList[item][0].color;
            return {
                name,
                length,
                image,
                color
            }
        })




        const randomNumbersList: SourceItem[] = [...sourceList]

        Array.from(Array(7), (_m) => {
            const randomNumber = getRandomUniqueNumber(randomNumbersList);
            randomNumbersList.push({ name: crypto.randomUUID(), length: randomNumber, image: 'none', color: 'none' })
        })

        randomNumbersList.sort(() => Math.random() - 0.5)

        setRandomSourceList(randomNumbersList)
        setItemList(randomAllList)
        setSourceList(sourceList)
        setDestinationList(sourceList.map(item => ({ ...item, length: 0 })))
    }

    async function initialGame() {
        await initialBoard();
    }

    function openHelp () {
        setOpenedHelp(true);
        onOpen();    
    }

    function closeHelp () {
        setOpenedHelp(false);
        onClose();    
    }

    function isGetOver() {
        const nextTry = life.current - 1;
        setLife({ ...life, current: nextTry })
        if (nextTry === life.limit) {
            modal({
                title: "Has perdido",
                description: "Has alcanzado el maximo de intentos posibles",
                button1: {
                    text: "Reintentar",
                    onClick() {
                        return initialGame()
                    }
                },
                button2: {
                    text: "Volver al menu principal",
                    onClick() {
                        return router('/')
                    },
                }
            })
        }
    }


    const handleValidate = (result: DropResult, _provided: ResponderProvided) => {
        const { source, destination } = result

        if (!destination) return
        if (destination.droppableId === source.droppableId) return
        const droppableDestination = document.querySelector<HTMLDivElement>(`#destination-${destination.droppableId.replace(/droppable-destination-/g, '')}`)
        if (!droppableDestination) return

        if (source.droppableId.replace(/droppable-source-/g, '') === destination.droppableId.replace(/droppable-destination-/g, '')) {
            const element = sourceList.find(sourceItem => sourceItem.name === source.droppableId.replace(/droppable-source-/g, ''))
            if (element) {
                const nextCorrect = correct.current + 1;
                const arr = destinationList.map(destinationItem => destinationItem.name === source.droppableId.replace(/droppable-source-/g, '') ? { ...element } : destinationItem);
                setDestinationList(arr)
                const currentSourceList = randomSourceList.filter(currentRandomSourceListItem => currentRandomSourceListItem.name !== element.name)
                setRandomSourceList(currentSourceList)
                droppableDestination.classList.add("bounce_correct")
                setTimeout(() => {
                    droppableDestination.classList.remove("bounce_correct")
                }, 1000)
                setCorrect({ ...correct, current: nextCorrect })

                if (nextCorrect === correct.limit) {
                    worlProvider.onFinish({
                        summary: Math.floor((life.current / 3) * 10),
                        showSummary: true
                    })
                }
            }
        } else {
            isGetOver()
            droppableDestination.classList.add("bounce_error")
            setTimeout(() => {
                droppableDestination.classList.remove("bounce_error")
            }, 1000)
        }
    }


    useEffect(() => {
        openHelp();
        initialGame();
    }, [])


    if (itemList.length < 3) return
    return <Background>
        <div className={"mainframe"}>
            <DragDropContext onDragEnd={handleValidate}>
                <div className={"destination_wrapper"}>
                    <motion.div className={"destination"} variants={boardAnimation} initial='hidden' animate='visible'>
                        {itemList.map(item => {
                            const splitName = item.name.split("-");
                            const displayName = splitName.join(" ")
                            return(
                                <motion.div key={item.id} variants={itemAnimation} className={"destination_item"} style={{ backgroundColor: item.color }}>
                                    <b className={"destination_corner"}></b>
                                    <Tooltip hasArrow label={displayName.toUpperCase()} placement='bottom-start' bg='#212962' fontSize='md' fontWeight={700}>
                                        <Image className={"destination_image"} src={item.url} />
                                    </Tooltip>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                    <div className={"source"}>
                        <div className={"status"}>
                            <p className={"status_description"} style={{color: life.current > 1 ? '#3bb150' : '#a52228'}}>{life.current}</p>
                            <div>
                                <p className={"status_title"}>Intentos</p>
                                <p className={"status_title"}> restantes</p>
                            </div>
                        </div>
                        <div className={"random_source_wrapper"}>
                            {randomSourceList
                                .map((question, index) => 
                                    (
                                    <Droppable droppableId={`droppable-source-${question.name}`} isDropDisabled key={question.name}>
                                        {(provided) => (
                                            <div
                                                className={"droppable_item"}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                <Draggable draggableId={`draggable-source-${question.name}`} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            key={index.toString()}
                                                            className={"source_item"}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            {question.length}
                                                        </div>
                                                    )}
                                                </Draggable>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                ))}
                        </div>
                    </div>
                </div>
                <Box className={"table_question"} maxH='sm'>
                    <div className={"options"}>
                        {destinationList.map(item => {
                            const splitName = item.name.split("-");
                            const displayName = splitName.join(" ")
                            return  (
                                <Droppable droppableId={`droppable-destination-${item.name}`} key={`destination-${item.name}`}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"option"}
                                            id={`destination-${item.name}`}
                                            key={`destination-${item.name}`}
                                        >
                                            <Tooltip hasArrow label={displayName.toUpperCase()} placement='bottom-start' bg='#212962' fontSize='md' fontWeight={700}>
                                                <div className={item.length === 0 ? "option_image_wrapper" : "option_image_wrapper_correct"}>
                                                        <Image src={item.image} alt="image" className={"option_image"} />
                                                        {item.length === 0 ? <p className={"option_icon"}>?</p> : <p className={"option_text"}>{item.length}</p>}
                                                </div>
                                            </Tooltip>
    
                                            {/* {item.length !== 0 && <div className={source_item} >{item.length}</div>} */}
                                        </div>
                                    )}
                                </Droppable>
                            )
                        })}
                    </div>
                </Box>
            </DragDropContext>
            {openedHelp &&  <>
                <AlertDialog
                    isOpen={isOpen}
                    size={'3xl'}
                    leastDestructiveRef={ref}
                    onClose={closeHelp}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            ¡PRIMERA ACTIVIDAD!
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Flex direction='column' gap={4}>
                                <Text>En esta primera actividad deberás relacionar la cantidad de cada objeto en el tablero con un número en el panel derecho, para interactuar puedes arrastrar el número que creas desde el panel hacia la figura correspondiente en la parte inferior.</Text>
                                <Text fontWeight='bold'>Pero recuerda, tienes a tu disposición tres intentos, tras llevar a cabo cada uno de ellos deberías empezar desde el principio.</Text>
                            </Flex>
                        </AlertDialogBody>    
                        <Divider sx={{ width: "auto" }} mx={8} marginTop={4} />
                        <AlertDialogFooter>
                            <Button onClick={closeHelp} variant="ghost" leftIcon={<PiArrowLineLeftLight/>}>
                            Volver
                        </Button>
                        <Button bgColor="#82c8a6" _hover={{ backgroundColor: '#212962', color: 'white' }} onClick={closeHelp} ml={3} rightIcon={<PiGameControllerFill/>}>
                            ¡EMPEZAR!
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                </>
            }       
        </div>
    </Background>
}