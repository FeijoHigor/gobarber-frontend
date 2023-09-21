import GlobalStyle from "./styles/global"
import { BrowserRouter } from 'react-router-dom'
import Router from "./routes"

import AppProvider from "./hooks"

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  )
}

export default App
