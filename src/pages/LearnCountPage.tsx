import { useContext } from "react";
import WorldProvider, { WorldContext } from "../components/World/WorldProvider";
import CardCounter from "../components/CardCounter/CardCounter";
import TracerNumbers from "../components/TracerNumbers/TracerNumbers";
import AbacusCounter from "../components/AbacusCounter/AbacusCounter";

export default function LearnCountPage() {

    return <WorldProvider>
        <AbacusCounter />
        <TracerNumbers />    
        <CardCounter />
        <ExampleComponent />
    </WorldProvider>
}

const ExampleComponent = () => {
    const worlProvider = useContext(WorldContext)

    return <p>{worlProvider.getSummary()}</p>
}

