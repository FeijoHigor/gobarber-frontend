import { Route, Routes } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" Component={SignIn} />
            <Route path="/signup" Component={SignUp} />
        </Routes>
    )
}

export default Router