"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, useCallback } from "react"
import { useColorScheme, Appearance } from "react-native"
import { MMKV } from "react-native-mmkv"

// Initialize MMKV instance
const mmkv = new MMKV()

// Define theme types
export type ThemeType = "light" | "dark"
export type ThemeMode = "system" | "manual"

// Define theme colors interface
export interface ThemeColors {
  background: string
  card: string
  primary: string
  secondary: string
  accent: string
  danger: string
  success: string
  splash: string
  tabBar: string
  text: {
    primary: string
    secondary: string
    tertiary: string
    inverse: string
  }
  border: string
  shadow: string
  divider: string
}

// Define font interface
export interface ThemeFonts {
  regular: string
  medium: string
  semibold: string
  bold: string
}

// Light theme definition
export const lightTheme: ThemeColors = {
  background: "#F9FAFB",
  card: "#FFFFFF",
  primary: "#158238",
  secondary: "#116A2F",
  accent: "#A7F3D0",
  danger: "#E76F51",
  success: "#22C55E",
  splash: "#158238",
  tabBar: "#FFFFFF",
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
  },
  border: "#E5E7EB",
  shadow: "rgba(0, 0, 0, 0.04)",
  divider: "#E5E7EB",
}

// Dark theme definition
export const darkTheme: ThemeColors = {
  background: "#0B0F0D",
  card: "#1A1F1D",
  primary: "#158238",
  secondary: "#1FC95C",
  accent: "#4ADE80",
  danger: "#FF6F61",
  success: "#52B788",
  splash: "#158238",
  tabBar: "#1A1F1D",
  text: { 
    primary: "#F3F4F6",
    secondary: "#9CA3AF",
    tertiary: "#6B7280",
    inverse: "#121212",
  },
  border: "#2E2E2E",
  shadow: "rgba(0, 0, 0, 0.5)",
  divider: "#2E2E2E",
}

// Default fonts
export const defaultFonts: ThemeFonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
}

// Theme context type
type ThemeContextType = {
  theme: ThemeType
  themeMode: ThemeMode
  colors: ThemeColors
  fonts: ThemeFonts
  toggleTheme: () => void
  setTheme: (theme: ThemeType) => void
  setThemeMode: (mode: ThemeMode) => void
}

// Create theme context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  themeMode: "system",
  colors: darkTheme,
  fonts: defaultFonts,
  toggleTheme: () => {},
  setTheme: () => {},
  setThemeMode: () => {},
})

// Storage keys
const THEME_STORAGE_KEY = "calmshift_theme"
const THEME_MODE_STORAGE_KEY = "calmshift_theme_mode"

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useColorScheme()
  const [theme, setThemeState] = useState<ThemeType>("dark")
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system")

  // Load saved theme settings on mount
  useEffect(() => {
    const savedThemeMode = mmkv.getString(THEME_MODE_STORAGE_KEY) || "system"
    setThemeModeState(savedThemeMode as ThemeMode)
    
    if (savedThemeMode === "system") {
      setThemeState(deviceColorScheme as ThemeType)
    } else {
      const savedTheme = mmkv.getString(THEME_STORAGE_KEY) || "dark"
      setThemeState(savedTheme as ThemeType)
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === "system" && colorScheme) {
        setThemeState(colorScheme as ThemeType)
      }
    })
    return () => subscription.remove()
  }, [themeMode])

  // Set theme manually
  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme)
    setThemeModeState("manual")
    mmkv.set(THEME_STORAGE_KEY, newTheme)
    mmkv.set(THEME_MODE_STORAGE_KEY, "manual")
  }, [])

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setThemeState(newTheme)
    setThemeModeState("manual")
    mmkv.set(THEME_STORAGE_KEY, newTheme)
    mmkv.set(THEME_MODE_STORAGE_KEY, "manual")
  }, [theme])

  // Set theme mode
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode)
    mmkv.set(THEME_MODE_STORAGE_KEY, mode)
    if (mode === "system" && deviceColorScheme) {
      setThemeState(deviceColorScheme as ThemeType)
    }
  }, [deviceColorScheme])

  // Get current theme colors
  const colors = theme === "light" ? lightTheme : darkTheme
  const fonts = defaultFonts

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        colors,
        fonts,
        toggleTheme,
        setTheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)