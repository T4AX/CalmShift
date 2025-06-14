import type React from "react"
import { useState } from "react"
import { View, TouchableOpacity, Animated, ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useTheme } from "../../context/ThemeContext"
import Card from "../Card"
import Typography from "../Typography"
import { scale } from "../../utils/responsive"
import type { Quote } from "../../redux/features/quotes/quoteSlice"
import { styles } from "./Styles"

interface QuotesProps {
  quote: Quote
  onRefresh?: () => void
  style?: ViewStyle
}

const Quotes: React.FC<QuotesProps> = ({ quote, onRefresh, style }) => {
  const { colors } = useTheme()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const rotateAnim = new Animated.Value(0)

  const handleRefresh = () => {
    if (!onRefresh || isRefreshing) return
    
    setIsRefreshing(true)

    // Animate refresh icon
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0)
    })

    // Call the refresh function
    onRefresh()

    // Reset refreshing state after animation
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <Card style={[styles.card, style]}>
      <View style={styles.header}>
        <Typography variant="h4" style={styles.title}>
          Daily Inspiration
        </Typography>
        {onRefresh && (
          <TouchableOpacity onPress={handleRefresh} disabled={isRefreshing} style={styles.refreshButton}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Icon name="refresh" size={scale(20)} color={colors.primary} />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.quoteContainer, { backgroundColor: colors.primary + "15" }]}>
        <Icon name="format-quote-close" size={22} color={colors.primary} />

        <Typography variant="body1" style={styles.quoteText}>
          {quote.text}
        </Typography>

        <Typography variant="caption" color="secondary" style={styles.author}>
          — {quote.author}
        </Typography>
      </View>
    </Card>
  )
}

export default Quotes

