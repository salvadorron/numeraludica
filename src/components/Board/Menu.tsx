import { BoxProps, Button, Stack } from "@chakra-ui/react"
import { ReactElement } from "react"
import { useNavigate } from "react-router-dom"

interface Menu {
    children: ReactElement | Array<ReactElement>
    props?: BoxProps
}

interface MenuOption {
    name: string,
    href: string
}


const MenuOption = (props: MenuOption) => {

    const router = useNavigate()

    const handleClick = () => {
        router(`/${props.href}`)
    }

    return (
        <Button size='lg' bgColor="#ffdf7a" _hover={{ backgroundColor: '#b4b1cc', color: 'white' }} width={400} onClick={handleClick}>{props.name}</Button>
    )
}


const Menu = (props: Menu) => {
    return (
        <Stack {...props.props}>
            {props.children}
        </Stack>
    )
}

Menu.Option = MenuOption

export default Menu