import { Image } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable, ResponderProvided } from 'react-beautiful-dnd';
import styles from './levelone.module.css';

const INITIAL_CARDS = 30;

export default function LevelOne() {

    const [itemList, setItemList] = useState<any[]>([])
    const [sourceList, setSourceList] = useState<any[]>([])
    const [destinationList, setDestinationList] = useState<any[]>([])
    const [randomSourceList, setRandomSourceList] = useState<any[]>([])


    function getRandomUniqueNumber(arr: number[]) {
        const randonNumber = Math.floor(Math.random() * 10) + 1;
        if (arr.some(item => item === randonNumber)) return getRandomUniqueNumber(arr)
        return randonNumber
    }


    async function getPokemonById(id: number) {
        const { data } = await axios.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return data
    }

    async function initialBoard() {
        const randomNumbersList: number[] = []
        const initalRandomId = Math.floor((Math.random() * 100) + 1);
        const initialList = [];
        for (let i = 1; i <= INITIAL_CARDS; i++) {
            try {
                const randomId = initalRandomId + (Math.floor((Math.random() * 3) + 1))
                const data = await getPokemonById(randomId)
                initialList.push({ ...data, id: crypto.randomUUID() })
            } catch (err) {
                setItemList([])
                break;
            }
        }

        const questionList = initialList.reduce((x, y) => {
            (x[y.name] = x[y.name] || []).push(y)
            return x;
        }, {})


        const returnedValue = Object.keys(questionList).map(item => {
            const name = item;
            const length = questionList[item].length
            return {
                name,
                length
            }
        })

        const randomSourceList = Array.from(Array(7), (_m) => {
            const randomNumber = getRandomUniqueNumber([...returnedValue.map(item => item.length), ...randomNumbersList]);
            randomNumbersList.push(randomNumber)
            return { name: crypto.randomUUID(), length: randomNumber }
        })
            .sort(() => .5 - Math.random())
        setRandomSourceList(randomSourceList)
        setItemList(initialList)
        setSourceList(returnedValue)
        setDestinationList(returnedValue.map(item => ({ ...item, length: undefined })))
    }

    async function initialGame() {
        await initialBoard()
    }


    const handleValidate = (result: DropResult, _provided: ResponderProvided) => {
        const { source, destination } = result

        if (!destination) return
        if (destination.droppableId === source.droppableId) return
        if (source.droppableId.replace(/droppable-source-/g, '') === destination.droppableId.replace(/droppable-destination-/g, '')) {
            const element = sourceList.find(sourceItem => sourceItem.name === source.droppableId.replace(/droppable-source-/g, ''))
            const arr = destinationList.map(destinationItem => destinationItem.name === source.droppableId.replace(/droppable-source-/g, '') ? { ...element } : destinationItem);
            const currentSourceList = sourceList.filter(_currentSourceListItem => !element)
            setDestinationList(arr)
            setSourceList(currentSourceList)
        } else {
            const droppableDestination = document.querySelector<HTMLDivElement>(`#destination-${destination.droppableId.replace(/droppable-destination-/g, '')}`)
            if (!droppableDestination) return
            droppableDestination.classList.add(styles.bounce)
            setTimeout(() => {
                droppableDestination.classList.remove(styles.bounce)
            }, 1000)
        }
    }


    useEffect(() => {
        initialGame()
    }, [])


    if (itemList.length === 0) return


    return <div className={styles.mainframe}>
        <DragDropContext onDragEnd={handleValidate}>
            <div className={styles.destination_wrapper}>
                <div className={styles.destination}>
                    {itemList.map((item: any) => (
                        <div key={item.id} className={styles.destination_item}>
                            <Image src={item.sprites.other["official-artwork"].front_default} />
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
                    {destinationList.map((item: any) => (
                        <Droppable droppableId={`droppable-destination-${item.name}`} key={item.name}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={styles.option}
                                    id={`destination-${item.name}`}
                                >
                                    <div className={styles.marker}>
                                        <p className={styles.marker_title}>{item.name}</p>
                                    </div>
                                    <div className={item.length ? styles.source_item : ''}>{item.length}</div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </div>
        </DragDropContext>
    </div>

}