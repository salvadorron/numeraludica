import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable, ResponderProvided } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import useModal from '../../ctx';
import styles from './levelone.module.css';

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
}

type Poke = {
    id: string,
    name: string
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
}

type CardColor = {
    [key: string]: string
}

export default function LevelOne() {

    const modal = useModal()

    const router = useNavigate()

    const [itemList, setItemList] = useState<Poke[]>([])

    const [sourceList, setSourceList] = useState<SourceItem[]>([])

    const [destinationList, setDestinationList] = useState<SourceItem[]>([])

    const [randomSourceList, setRandomSourceList] = useState<SourceItem[]>([])

    const [life, setLife] = useState<GameLife>({ current: 0, limit: 3 })

    const [initialColor, setColor] = useState<CardColor | undefined>(undefined)


    function getRandomUniqueNumber(arr: SourceItem[]) {
        const randonNumber = Math.floor(Math.random() * 10) + 1;
        if (arr.some(item => item.length === randonNumber)) return getRandomUniqueNumber(arr)
        return randonNumber
    }


    async function getPokemonById(id: number) {
        const { data } = await axios.get<Poke>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return data
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    async function initialBoard() {

        setLife({
            ...life,
            current: 0
        })
        const initalRandomId1 = Math.floor((Math.random() * 100) + 1);
        const initalRandomId2 = Math.floor((Math.random() * 100) + 1);
        const initalRandomId3 = Math.floor((Math.random() * 100) + 1);

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



        const listPoke1: Poke[] = [];
        const listPoke2: Poke[] = [];
        const listPoke3: Poke[] = [];


        for (let i = 1; i <= num1; i++) {
            try {
                const data = await getPokemonById(initalRandomId1)
                listPoke1.push({ ...data, id: crypto.randomUUID() })
            } catch (err) {
                setItemList([])
                break;
            }
        }

        for (let i = 1; i <= num2; i++) {
            try {
                const data = await getPokemonById(initalRandomId2)
                listPoke2.push({ ...data, id: crypto.randomUUID() })
            } catch (err) {
                setItemList([])
                break;
            }
        }

        for (let i = 1; i <= num3; i++) {
            try {
                const data = await getPokemonById(initalRandomId3)
                listPoke3.push({ ...data, id: crypto.randomUUID() })
            } catch (err) {
                setItemList([])
                break;
            }
        }

        const randomAllList = [...listPoke1, ...listPoke2, ...listPoke3].sort(() => Math.random() - 0.5)

        const groupRandomAllList = groupBy(randomAllList, i => i.name)

        const sourceList = Object.keys(groupRandomAllList).map(item => {
            const name = item;
            const length = groupRandomAllList[item].length;
            const image = groupRandomAllList[item][0].sprites.other['official-artwork'].front_default
            return {
                name,
                length,
                image
            }
        })


        console.log(sourceList)


        const randomNumbersList: SourceItem[] = [...sourceList]
        const colors = {}

        sourceList.forEach(item => {
            Object.assign(colors, {
                [item.name]: getRandomColor()
            })
        })

        Array.from(Array(7), (_m) => {
            const randomNumber = getRandomUniqueNumber(randomNumbersList);
            randomNumbersList.push({ name: crypto.randomUUID(), length: randomNumber, image: 'none' })
        })

        randomNumbersList.sort(() => Math.random() - 0.5)

        setColor(colors)
        setRandomSourceList(randomNumbersList)
        setItemList(randomAllList)
        setSourceList(sourceList)
        setDestinationList(sourceList.map(item => ({ ...item, length: 0 })))
    }

    async function initialGame() {
        await initialBoard()
    }

    function isGetOver() {
        const nextTry = life.current + 1
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
                const arr = destinationList.map(destinationItem => destinationItem.name === source.droppableId.replace(/droppable-source-/g, '') ? { ...element } : destinationItem);
                setDestinationList(arr)
                const currentSourceList = randomSourceList.filter(currentRandomSourceListItem => currentRandomSourceListItem.name !== element.name)
                setRandomSourceList(currentSourceList)
                droppableDestination.classList.add(styles.bounce_correct)
                setTimeout(() => {
                    droppableDestination.classList.remove(styles.bounce_correct)
                }, 1000)
            }
        } else {
            isGetOver()
            droppableDestination.classList.add(styles.bounce_error)
            setTimeout(() => {
                droppableDestination.classList.remove(styles.bounce_error)
            }, 1000)
        }
    }


    useEffect(() => {
        initialGame()
    }, [])


    if (itemList.length === 0) return
    if (!initialColor) return


    return <div className={styles.mainframe}>
        <DragDropContext onDragEnd={handleValidate}>
            <div className={styles.destination_wrapper}>
                <div className={styles.status}>
                    <p className={styles.status_title}>Intentos:</p>
                    <p className={styles.status_description}>{life.current}/{life.limit}</p>
                </div>
                <div className={styles.destination}>
                    {itemList.map(item => (
                        <div key={item.id} className={styles.destination_item} style={{ backgroundColor: initialColor[item.name] }}>
                            <b className={styles.destination_corner}></b>
                            <Image className={styles.destination_image} src={item.sprites.other["official-artwork"].front_default} />
                        </div>
                    ))}
                </div>
                <div className={styles.source}>
                    {randomSourceList
                        .map((question, index) => (
                            <Droppable droppableId={`droppable-source-${question.name}`} isDropDisabled key={question.name}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Draggable draggableId={`draggable-source-${question.name}`} index={index}>
                                            {(provided) => (
                                                <div
                                                    key={index.toString()}
                                                    className={styles.source_item}
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
            <div className={styles.table_question}>
                <div className={styles.options}>
                    {destinationList.map(item => (
                        <Droppable droppableId={`droppable-destination-${item.name}`} key={`destination-${item.name}`}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={styles.option}
                                    id={`destination-${item.name}`}
                                    key={`destination-${item.name}`}
                                >
                                    <div className={item.length === 0 ? styles.option_image_wrapper : styles.option_image_wrapper_correct}>
                                        <Image src={item.image} alt="image" className={styles.option_image} />
                                        {item.length === 0 ? <p className={styles.option_icon}>?</p> : <p className={styles.option_text}>{item.length}</p>}
                                    </div>

                                    {/* {item.length !== 0 && <div className={styles.source_item} >{item.length}</div>} */}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </div>
        </DragDropContext>
    </div>

}