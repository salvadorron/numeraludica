import { createContext, useState } from "react";

type HandleShowProps = {
    summary: number,
    isEnd?: boolean
}

type HandleShow = (props: HandleShowProps) => void

export const WorldContext = createContext<HandleShow>(() => null)

export default function WorldProvider({ children }: { children: React.ReactElement }) {

    const [currentSummary, setSummary] = useState<number>(0)


    function onContinue({ summary, isEnd = false }: HandleShowProps) {
        setSummary((prev) => prev + summary)
        if (isEnd) return alert(summary)
        return alert(0)
    }


    return (
        <WorldContext.Provider value={onContinue}>
            {children}
        </WorldContext.Provider>
    )
}