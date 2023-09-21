import GlobalStyle from "./styles/global"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

import { AuthProvider } from "./context/AuthContext"

const App = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <GlobalStyle />
    </>
  )
}

export default App
