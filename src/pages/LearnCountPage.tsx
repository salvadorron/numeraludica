import CardCounter from "../components/CardCounter/CardCounter";
import TracerNumbers from "../components/TracerNumbers/TracerNumbers";
import AbacusCounter from "../components/AbacusCounter/AbacusCounter";
import FinishScore from "../components/FinishScore/FinishScore";
import WorldProvider from "../components/World/WorldProvider";

export default function LearnCountPage() {

    return <WorldProvider>
        <CardCounter />
        <AbacusCounter />
        <TracerNumbers />    
        <FinishScore />
    </WorldProvider>
}
