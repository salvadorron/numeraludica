import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Navbar from "../components/Navbar";
import './learncountpage.css';

const initialTasks = [
    {
        id: 0,
        text: 'Cambur'
    },
    {
        id: 1,
        text: 'Manzana'
    },
    {
        id: 2,
        text: 'Pera'
    },
    {
        id: 3,
        text: 'Mango'
    }
]


export default function LearnCountPage() {

    const fruits = ['Manzana', 'Durazno', 'Pera', 'Banano', 'Papaya']

    const getRandomFruit = () => {
        return Math.floor(Math.random() * fruits.length)
    }

    const [tasks, setTasks] = useState(initialTasks)

    function reorder(list: any[], startIndex: number, endIndex: number) {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result
    }

    return (
        <Navbar>
            <DragDropContext onDragEnd={result => {
                const { source, destination } = result
                if (!destination) return

                if (source.index === destination.index && source.droppableId === destination.droppableId) return

                setTasks((prevTasks) => reorder(prevTasks, source.index, destination.index))
            }}>
                <Droppable droppableId="tasks">
                    {(droppableProvider) => (
                        <ul
                            {...droppableProvider.droppableProps}
                            ref={droppableProvider.innerRef}
                            className="task-container"
                        >
                            {tasks.map((task, index) => (
                                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                                    {(draggableProvided) => <li key={task.id.toString()} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} className="task-item">{task.text}</li>}
                                </Draggable>
                            ))}
                            {droppableProvider.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </Navbar>
    )
}