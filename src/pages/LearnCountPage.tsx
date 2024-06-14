import { useContext } from "react";
import { AbacusLevel } from "../components/Abacus/AbacusLevel";
import WorldProvider, { WorldContext } from "../components/World/WorldProvider";

export default function LearnCountPage() {

    // STRUCTURE:

    // PROVIDER
    //     WORLCOMPONENT1
    //     WORLDCOMPONENT2
    //     WORLDCOMPONENT3
    // PROVIDER

    return <WorldProvider>
        <AbacusLevel />
        {/* <LevelOne /> */}
        <ExampleComponent />
    </WorldProvider>
}

const ExampleComponent = () => {
    const worlProvider = useContext(WorldContext)

    return <p>{worlProvider.getSummary()}</p>
}

