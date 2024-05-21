import { ChakraProvider } from "@chakra-ui/react"
import RouterProvider from "./RouterProvider"
function App() {

  return (
    <ChakraProvider>
      <RouterProvider />
    </ChakraProvider>
  )
}

export default App
