import React from "react"
import { View, TouchableOpacity, StatusBar } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useTheme } from "../../context/ThemeContext"
import { styles } from "./Styles"
import Typography from "../Typography"

interface HeaderBarProps {
  title: string
  showBackButton?: boolean
  onBackPress?: () => void
  rightComponent?: React.ReactNode
  transparent?: boolean
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
  transparent = false,
}) => {
  const { colors, theme } = useTheme()
  const insets = useSafeAreaInsets()

  const isDarkMode = theme === "dark"

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: transparent ? "transparent" : colors.cardBackground,
          paddingTop: insets.top > 0 ? 0 : 16,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={transparent ? "transparent" : colors.cardBackground}
        translucent={transparent}
      />
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="chevron-back" size={28} color={colors.text.primary} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Typography variant="h2" style={styles.title} numberOfLines={1}>
            {title}
          </Typography>
        </View>
        <View style={styles.rightContainer}>{rightComponent}</View>
      </View>
    </View>
  )
}



export default HeaderBar