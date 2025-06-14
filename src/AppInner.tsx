import React from "react"
import { useTheme } from "./context/ThemeContext"
import AppNavigator from "./navigation/AppNavigator"
import { StatusBar } from "react-native"

const AppInner = () => {
  const { theme, colors } = useTheme()

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <AppNavigator />
    </>
  )
}

export default AppInner
