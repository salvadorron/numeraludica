import React, { useState, useEffect, ReactNode } from 'react';
import { HiMiniPuzzlePiece, HiOutlinePuzzlePiece  } from "react-icons/hi2";
import { FaPuzzlePiece } from "react-icons/fa";
import { BsPuzzle } from "react-icons/bs";
import { Box } from "@chakra-ui/react"

const colors = ["#3bb150", "#f5eb50", "#a52228", "#7acedc", "#212962"];
const icons = [HiMiniPuzzlePiece, FaPuzzlePiece, BsPuzzle, HiOutlinePuzzlePiece ];

const Background = () => {
    const [elements, setElements] = useState<ReactNode[]>([]);
    useEffect(() => {
        const newElements = Array.from({ length: 10 }, () => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const Icon = icons[Math.floor(Math.random() * icons.length)];
            const top = Math.random() * 100;
            const left = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 10;
            return (
                <Box position="fixed" top={`${top}%`} left={`${left}%`}>
                    <Icon style={{ color }} fontSize={76}/>
                </Box>
            );
        });
        setElements(newElements);
    }, []);

    return (
        <Box position="relative" zIndex={1}>
            {elements}
        </Box>
    )
}
export default Background;
