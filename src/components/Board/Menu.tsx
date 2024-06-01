import { BoxProps, Button, Stack, background } from "@chakra-ui/react"
import { ReactElement } from "react"
import { IconType } from "react-icons"
import { useNavigate } from "react-router-dom"

interface Menu {
    children: ReactElement | Array<ReactElement>
    props?: BoxProps
}

interface MenuOption {
    type: string,
    name: string,
    href: string
    bgColor: string,
    icon: string | IconType,
}


const MenuOption = (props: MenuOption) => {
    const router = useNavigate()
    const handleClick = () => {
        router(`/${props.href}`)
    }
    const IconComponent = props.icon;
    return (
        <Button 
            borderRadius={12} 
            borderColor="#82c8a6"
            bgColor={props.bgColor}
            fontSize={18}
            textColor="#0f172a"
            leftIcon={<IconComponent fontSize={26}/>}
            _hover={{ backgroundColor: '#212962', color: 'white'}} 
            w={props.type == "primary" ? "35%" : "30%"} 
            h="70px"
            size="lg" 
            fontFamily="Monserrat"
            onClick={handleClick}
        >
            {props.name}
        </Button>
    )
}


const Menu = (props: Menu) => {
    return (
        <Stack {...props.props} align="center" spacing={3} w="100%">
            {props.children}
        </Stack>
    )
}

Menu.Option = MenuOption

export default Menu