import { createBrowserRouter, RouterProvider as RouterBrowser } from 'react-router-dom'
import HelpPage from './pages/HelpPage'
import HomePage from './pages/HomePage'
import LearnCountPage from './pages/LearnCountPage'
import ScorePage from './pages/ScorePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/aprenderacontar',
        element: <LearnCountPage />
    },
    {
        path: '/puntaje',
        element: <ScorePage />
    },
    {
        path: '/ayuda',
        element: <HelpPage />
    }
])

export default function RouterProvider() {
    return <RouterBrowser router={router} />
}
