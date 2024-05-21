import { createBrowserRouter, RouterProvider as RouterBrowser } from 'react-router-dom'
import AsociateNumbersPage from './pages/AsociateNumbersPage'
import BinnaclePage from './pages/BinnaclePage'
import Homepage from './pages/Homepage'
import LearnCountPage from './pages/LearnCountPage'
import PuzzlesPage from './pages/PuzzlesPage'
import ScorePage from './pages/ScorePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />
    },
    {
        path: '/aprenderacontar',
        element: <LearnCountPage />
    },
    {
        path: '/asociarnumeros',
        element: <AsociateNumbersPage />
    },
    {
        path: '/puzzles',
        element: <PuzzlesPage />
    },
    {
        path: '/puntaje',
        element: <ScorePage />
    },
    {
        path: '/bitacora',
        element: <BinnaclePage />
    }
])

export default function RouterProvider() {
    return <RouterBrowser router={router} />
}
