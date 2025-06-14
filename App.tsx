import React from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from "./src/context/ThemeContext"
import ErrorBoundary from "./src/components/ErrorBoundary"
import store from "./src/redux/store"
import AppInner from "./src/AppInner"

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <AppInner />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
