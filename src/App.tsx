import { ChakraProvider } from "@chakra-ui/react"
import RouterProvider from "./RouterProvider"
import './index.css'
function App() {

  return (
    <ChakraProvider>
      <RouterProvider />
    </ChakraProvider>
  )
}

export default App
