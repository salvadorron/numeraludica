import { Box } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { IconType } from "react-icons";
import { BsPuzzle } from "react-icons/bs";
import { FaPuzzlePiece } from "react-icons/fa";
import { HiMiniPuzzlePiece, HiOutlinePuzzlePiece } from "react-icons/hi2";

const colors = ["#3bb150", "#E4DB58", "#a52228", "#7acedc", "#212962"];
const icons = [HiMiniPuzzlePiece, FaPuzzlePiece, BsPuzzle, HiOutlinePuzzlePiece];

const Background = ({ children }: { children: React.ReactElement }) => {
    const [elements, setElements] = useState<{id: number, top: number, left: number, color: string, Icon: IconType}[]>([]);

    useEffect(() => {
        const positions: { id: number, top: number, left: number, color: string, Icon: IconType }[] = [];
        const newElements = Array.from({ length: 10 }, (_, i) => {
            const id = i;
            let top: number;
            let left: number;
            do {
                top = Math.random() * 100;
                left = Math.random() < 0.5 ? Math.random() * 20 : 80 + Math.random() * 10;
            } while (positions.some(pos => Math.abs(pos.top - top) < 10 && Math.abs(pos.left - left) < 10));
            const color = colors[Math.floor(Math.random() * colors.length)];
            const Icon = icons[Math.floor(Math.random() * icons.length)];
            positions.push({ id, top, left, color, Icon });
            return {
                id,
                top,
                left,
                color,
                Icon
            }
        });
        setElements(newElements);
    }, []);

    return (
        <Box bgColor='#CDE9DB' minH='100vh' position='relative'>
            <Box position="absolute" zIndex={0} w='100%' h='100%' overflow={'hidden'}>
                {elements.map(element => (
                    <Box key={element.id} position="absolute" top={`${element.top}%`} left={`${element.left}%`} w='100%'>
                        <element.Icon style={{ color: element.color }} fontSize={76} />
                    </Box>
                ))}
            </Box>
            <Box position='relative' zIndex={1}>
                {children}
            </Box>
        </Box>
    )
}
export default Background;
