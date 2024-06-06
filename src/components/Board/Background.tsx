import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from 'react';
import { BsPuzzle } from "react-icons/bs";
import { FaPuzzlePiece } from "react-icons/fa";
import { HiMiniPuzzlePiece, HiOutlinePuzzlePiece } from "react-icons/hi2";

const colors = ["#3bb150", "#f5eb50", "#a52228", "#7acedc", "#212962"];
const icons = [HiMiniPuzzlePiece, FaPuzzlePiece, BsPuzzle, HiOutlinePuzzlePiece];

const Background = ({ children }: { children: React.ReactElement }) => {
    const [elements, setElements] = useState<ReactNode[]>([]);
    useEffect(() => {
        const newElements = Array.from({ length: 10 }, () => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const Icon = icons[Math.floor(Math.random() * icons.length)];
            const top = Math.random() * 100;
            const left = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 10;
            return (
                <Box position="fixed" top={`${top}%`} left={`${left}%`}>
                    <Icon style={{ color }} fontSize={76} />
                </Box>
            );
        });
        setElements(newElements);
    }, []);

    return (
        <Box bgColor='#CDE9DB' minH='100vh'>
            <Box position="relative" zIndex={1}>
                {elements}
            </Box>
            {children}
        </Box>
    )
}
export default Background;
