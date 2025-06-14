import type React from "react"
import { View, ActivityIndicator } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import Typography from "../Typography"
import { styles } from "./Styles"

interface LoadingStateProps {
  message?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Typography variant="body1" color="secondary" style={styles.message}>
        {message}
      </Typography>
    </View>
  )
}


export default LoadingState

