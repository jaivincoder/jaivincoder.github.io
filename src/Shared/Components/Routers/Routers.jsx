import { lazy } from "react"
import { Navigate, useRoutes } from "react-router-dom"

const Home = lazy(() => import('../../../Pages/Home/Home'));
const Sample = lazy(() => import('../../../Pages/Sample/Sample'));

const Routers = () => {

    const allRoutes = useRoutes([   
        { path: '/*', element: <Home /> },
        // { path: '/*', element: <Home /> }
    ])

    return (allRoutes)

}

export default Routers;