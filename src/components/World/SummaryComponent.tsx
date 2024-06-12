import { ReactElement, useContext } from "react"
import { WorldContext } from "./WorldProvider"

const SummaryComponent = ({ children, isShow = false }: { children: ReactElement, isShow?: boolean }) => {
    const worldProvider = useContext(WorldContext)
    if (!isShow) return children
    return (
        <div>
            <p>Acceso Especial</p>
            <button onClick={() => worldProvider.onShowSummary(false)}>Avanzar</button>
        </div>
    )
}

export default SummaryComponent