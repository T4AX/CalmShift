import type React from "react"
import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useTheme } from "../../context/ThemeContext"
import Card from "../Card"
import { scale, verticalScale } from "../../utils/responsive"
import { useSelector, useDispatch } from "react-redux"
import { selectDailyQuote } from "../../redux/selectors"
import { refreshDailyQuote } from "../../redux/actions"
import Typography from "../Typography"
import { styles } from "./Styles"

interface MotivationalQuoteProps {
  style?: any
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ style }) => {
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const quote = useSelector(selectDailyQuote)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const rotateAnim = new Animated.Value(0)

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Animate refresh icon
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0)
    })

    // Dispatch action to get a new quote
    dispatch(refreshDailyQuote())

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
        <Typography variant="h4" weight="semibold" style={styles.title}>
          Daily Inspiration
        </Typography>
        <TouchableOpacity onPress={handleRefresh} disabled={isRefreshing} style={styles.refreshButton}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Icon name="refresh" size={scale(20)} color={colors.primary} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={[styles.quoteContainer, { backgroundColor: colors.primary + "15" }]}>
        <Icon name="format-quote-close" size={22} color={colors.primary} />

        <Typography variant="body1" weight="medium" style={styles.quoteText}>
          {quote.text}
        </Typography>

        <Typography variant="caption" color="secondary" style={styles.author}>
          — {quote.author}
        </Typography>
      </View>
    </Card>
  )
}



export default MotivationalQuote

