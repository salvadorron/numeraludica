import { useContext } from "react"
import Background from "../Board/Background"
import { WorldContext } from "../World/WorldProvider"

const FinishScore = () => {

    const worlProvider = useContext(WorldContext)

    return <Background>
            <p>{worlProvider.getSummary()}</p>
        </Background>
}

export default FinishScore

