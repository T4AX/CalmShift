import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ThemeProvider } from "./src/context/ThemeContext"
import ErrorBoundary from "./src/components/ErrorBoundary"
import LoadingState from "./src/components/LoadingState/LoadingState"
import { store, persistor } from "./src/redux"
import AppInner from "./src/AppInner"

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<LoadingState />} persistor={persistor}>
          <ThemeProvider>
            <AppInner />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
