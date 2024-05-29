import { ChakraProvider } from "@chakra-ui/react"
import ModalProvider from "./ModalProvider"
import RouterProvider from "./RouterProvider"
import './index.css'
function App() {

  return (
    <ChakraProvider>
      <ModalProvider>
        <RouterProvider />
      </ModalProvider>
    </ChakraProvider>
  )
}

export default App
