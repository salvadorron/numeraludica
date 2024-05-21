import { createBrowserRouter, RouterProvider as RouterBrowser } from 'react-router-dom'
import Homepage from './pages/Homepage'
import LearnCountPage from './pages/LearnCountPage'
import AsociateNumbersPage from './pages/AsociateNumbersPage'
import ScorePage from './pages/ScorePage'
import PuzzlesPage from './pages/PuzzlesPage'
import BinnaclePage from './pages/BinnaclePage'

function RouterProvider() {
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

    return <RouterBrowser router={router} />
}

export default RouterProvider