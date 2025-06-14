import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { styles } from "./Styles"

interface DividerProps {
  style?: ViewStyle
  color?: string
}

const Divider: React.FC<DividerProps> = ({ style, color }) => {
  const { colors } = useTheme()
  
  return (
    <View 
      style={[
        styles.divider, 
        { backgroundColor: color || colors.border },
        style
      ]} 
    />
  )
}

export default Divider