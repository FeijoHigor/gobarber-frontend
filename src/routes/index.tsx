import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './Routes'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

import Dashboard from '../pages/Dashboard'

const Router: React.FC = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

        </Routes>
    )
}

export default Router