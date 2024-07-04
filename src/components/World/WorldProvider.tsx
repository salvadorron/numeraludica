import { createContext, useState } from "react";
import SummaryComponent from "./SummaryComponent";


interface WorldProps {
    /**
     * this method provides an incremental world level and its summary
     * @param summary a numeric expression
     */
    onFinish: ({ summary, showSummary }: { summary: number, showSummary?: boolean }) => void,
    /**
     * returns the current step on the world provider
     */
    getStep: () => number,
    /**
     * returns the current accumulate summary on the all worlds
     */
    getSummary: () => number,
    /**
     * this method provides a dialog for current summary to world 
     * @param isShow a boolean expression
     */
    onShowSummary: (isShow: boolean) => void,
    /**
     * this method returns the current accumulated points
     * @param points a numeric expression
     */
    getPoints: () => number
    /**
     * this method returns a list of accumulated points per world
     * @param points a numeric expression
     */
   getPointList: () => number[]
}

export const WorldContext = createContext<WorldProps>({
    onFinish: () => null,
    getStep: () => 0,
    getSummary: () => 0,
    onShowSummary: () => null,
   getPoints: () => 0,
   getPointList: () => []
})

export default function WorldProvider({ children }: { children: React.ReactElement[] }) {

    const [currentSummary, setSummary] = useState<number>(0)
    const [currentPoint, setCurrentPoint] = useState<number>(0)
    const [pointList, setPointList] = useState<number[]>([])
    const [showSummary, setShowSummary] = useState<boolean>(false)
    const [step, setStep] = useState(0);

    function onFinish({ summary, showSummary = false }: { summary: number, showSummary?: boolean }) {
        setShowSummary(showSummary)
        setStep(step + 1)
        setCurrentPoint(summary)
        setPointList([...pointList, summary])
        setSummary(currentSummary + summary)
    }

    function getStep() {
        return step
    }

    function getSummary() {
        return currentSummary
    }

    function onShowSummary(isShow: boolean) {
        setShowSummary(isShow)
    }

    function getPoints() {
        return currentPoint
    }

    function getPointList(){
      return pointList
  }


    return (
        <WorldContext.Provider value={{
            onFinish,
            getStep,
            getSummary,
            onShowSummary,
            getPoints,
            getPointList
        }}>
            <SummaryComponent isShow={showSummary}>
                {children[step]}
            </SummaryComponent>
        </WorldContext.Provider>
    )
}


