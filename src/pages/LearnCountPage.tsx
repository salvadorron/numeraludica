import { useContext } from "react";
import AbacusLevel from "../components/Abacus/AbacusLevel";
import WorldProvider, { WorldContext } from "../components/World/WorldProvider";
import LevelOne from "../components/LearnCount/LevelOne";
import TracersNumbers from "../components/TracersNumbers/TracersNumbers";

export default function LearnCountPage() {

    // STRUCTURE:

    // PROVIDER
    //     WORLCOMPONENT1
    //     WORLDCOMPONENT2
    //     WORLDCOMPONENT3
    // PROVIDER

    return <WorldProvider>
        <AbacusLevel />
        <TracersNumbers />    
        <LevelOne />
        <ExampleComponent />
    </WorldProvider>
}

const ExampleComponent = () => {
    const worlProvider = useContext(WorldContext)

    return <p>{worlProvider.getSummary()}</p>
}

