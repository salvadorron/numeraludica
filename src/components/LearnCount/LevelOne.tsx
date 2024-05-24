import { Button, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './levelone.module.css';

const INITIAL_CARDS = 30;

export default function LevelOne() {

    const [list, setList] = useState<any[]>([])
    const [listQuestion, setListQuestion] = useState<any[]>([])



    async function getPokemonById(id: number) {
        const { data } = await axios.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return data
    }

    async function initialBoard() {
        const initalRandomId = Math.floor((Math.random() * 100) + 1);
        const initialList = [];
        for (let i = 1; i <= INITIAL_CARDS; i++) {
            const randomId = initalRandomId + (Math.floor((Math.random() * 3) + 1))
            const data = await getPokemonById(randomId)
            initialList.push({ ...data, id: crypto.randomUUID() })
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
        setList(initialList)
        setListQuestion(returnedValue)
    }

    async function initialGame() {
        await initialBoard()
    }


    const handleValidate = () => {
        listQuestion.map(item => {
            const $selector = document.querySelector(item.name)
            console.log($selector)
        })
    }


    useEffect(() => {
        initialGame()
    }, [])




    return <div className={styles.mainframe}>
        <div className={styles.destination}>
            {list.map((item: any) => (
                <div key={item.id} className={styles.destination_item}>
                    <Image src={item.sprites.other["official-artwork"].front_default} />
                </div>
            ))}
        </div>
        <div className={styles.table_question}>
            <div className={styles.options}>
                {listQuestion.map((item: any) => (
                    <div className={styles.option} key={item.name}>
                        <div className={styles.marker}>
                            <p className={styles.marker_title}>{item.name}</p>
                        </div>
                        <input type='text' className={styles.field} id={item.name} />
                    </div>
                ))}
                <Button onClick={handleValidate}>Validar</Button>
            </div>
        </div>
    </div>

}