import { ChakraProvider } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"

function App() {

  return (
    <ChakraProvider>
    <Navbar>
      <Homepage />
    </Navbar>
    </ChakraProvider>
  )
}

export default App
