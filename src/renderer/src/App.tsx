import { useRoutes } from 'react-router-dom'
import router from './router'
import TitleBar from './components/titleBar'
// import BeforeEnter from './router/beforeEnter';

function BeforeEnter() {
    console.log('BeforeEnter')

    const Outlet = useRoutes(router)
    // const location = useLocation()
    // console.log(location)

    return Outlet
}

function App() {
    return (
        <div>
            <TitleBar />
            <BeforeEnter />
        </div>
    )
}

export default App
