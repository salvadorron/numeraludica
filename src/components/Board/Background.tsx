import { Box } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { BsPuzzle } from "react-icons/bs";
import { FaPuzzlePiece } from "react-icons/fa";
import { HiMiniPuzzlePiece, HiOutlinePuzzlePiece } from "react-icons/hi2";

const colors = ["#3bb150", "#E4DB58", "#a52228", "#7acedc", "#212962"];
const icons = [HiMiniPuzzlePiece, FaPuzzlePiece, BsPuzzle, HiOutlinePuzzlePiece];

const Background = ({ children }: { children: React.ReactElement }) => {
    const [elements, setElements] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const positions: { top: number, left: number }[] = [];
        const newElements = Array.from({ length: 10 }, () => {
            let top, left;
            do {
                top = Math.random() * 100;
                left = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 10;
            } while (positions.some(pos => Math.abs(pos.top - top) < 10 && Math.abs(pos.left - left) < 10));
            positions.push({ top, left });
            const color = colors[Math.floor(Math.random() * colors.length)];
            const Icon = icons[Math.floor(Math.random() * icons.length)];
            return (
                <Box position="fixed" top={`${top}%`} left={`${left}%`} w='100%'>
                    <Icon style={{ color }} fontSize={76} />
                </Box>
            );
        });
        setElements(newElements);
    }, []);

    return (
        <Box bgColor='#CDE9DB' minH='100vh' >
            <Box position="relative" zIndex={0}>
                {elements}
            </Box>
            {children}
        </Box>
    )
}
export default Background;