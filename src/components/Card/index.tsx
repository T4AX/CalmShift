import type React from "react"
import { useRef, useEffect, memo } from "react"
import { View, Animated, type ViewStyle, Pressable, Platform } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { scale, verticalScale } from "../../utils/responsive"
import { styles } from "./Styles"

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  contentStyle?: ViewStyle
  animated?: boolean
  variant?: 
    | "default" 
    | "elevated" 
    | "outlined" 
    | "flat" 
    | "retro" 
    | "pixel" 
    | "glass" 
    | "subtle"
    | "minimal"
  accessibilityLabel?: string
  glowEffect?: boolean
  elevation?: number
  onPress?: () => void
  onLongPress?: () => void
  borderRadius?: number
  padding?: number | string
  margin?: number | string
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  contentStyle,
  animated = false,
  variant = "default",
  accessibilityLabel,
  glowEffect = false,
  elevation,
  onPress,
  onLongPress,
  borderRadius,
  padding,
  margin,
}) => {
  const { colors } = useTheme()
  const backgroundColor = useRef(new Animated.Value(0)).current
  const borderColor = useRef(new Animated.Value(0)).current
  const shadowColor = useRef(new Animated.Value(0)).current
  const glowOpacity = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  const isMounted = useRef(true)

  const isInteractive = !!onPress || !!onLongPress

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (animated && isMounted.current) {
      const ANIMATION_DURATION = 300
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start()
      Animated.timing(borderColor, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start()
      Animated.timing(shadowColor, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start()
    }
  }, [animated, backgroundColor, borderColor, shadowColor])

  useEffect(() => {
    if (glowEffect) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: 0.5,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.2,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    } else {
      glowOpacity.setValue(0)
    }
  }, [glowEffect, glowOpacity])

  const animatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", getBackgroundColor()],
  })

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", getBorderColor()],
  })

  const animatedShadowColor = shadowColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", getShadowColor()],
  })

  function getBackgroundColor() {
    switch (variant) {
      case "retro":
        return "rgba(0, 0, 0, 0.8)"
      case "pixel":
        return colors.card
      case "glass":
        return `${colors.card}80`
      case "subtle":
        return colors.background
      case "minimal":
        return "transparent"
      case "outlined":
        return "transparent"
      default:
        return colors.card
    }
  }

  function getBorderColor() {
    switch (variant) {
      case "outlined":
        return colors.border
      case "retro":
        return colors.primary
      case "pixel":
        return colors.primary
      case "glass":
        return `${colors.border}40`
      case "subtle":
        return colors.border + "30"
      case "minimal":
        return "transparent"
      default:
        return "transparent"
    }
  }

  function getShadowColor() {
    switch (variant) {
      case "retro":
        return colors.primary
      case "glass":
        return `${colors.shadow}80`
      default:
        return colors.shadow
    }
  }

  function getBorderWidth() {
    switch (variant) {
      case "outlined":
      case "retro":
      case "glass":
      case "subtle":
        return 1
      case "pixel":
        return 2
      default:
        return 0
    }
  }

  function getBorderRadius() {
    if (borderRadius !== undefined) {
      return scale(borderRadius)
    }
    switch (variant) {
      case "pixel":
        return 0
      case "retro":
        return scale(4)
      case "minimal":
      case "subtle":
        return scale(12)
      default:
        return scale(16)
    }
  }

  function getElevation() {
    if (elevation !== undefined) {
      return elevation
    }
    switch (variant) {
      case "elevated":
        return 4
      case "default":
        return 2
      case "retro":
      case "pixel":
        return 5
      case "glass":
        return 3
      default:
        return 0
    }
  }

  const getCardStyle = () => {
    const customElevation = getElevation()
    switch (variant) {
      case "elevated":
        return {
          backgroundColor: colors.card,
          borderColor: "transparent",
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: customElevation / 2 },
          shadowOpacity: 0.12,
          shadowRadius: customElevation * 1.5,
          elevation: customElevation,
        }
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderColor: colors.border,
          borderWidth: 1,
          shadowOpacity: 0,
          elevation: 0,
        }
      case "flat":
        return {
          backgroundColor: colors.card,
          borderColor: "transparent",
          shadowOpacity: 0,
          elevation: 0,
        }
      case "retro":
        return {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: colors.primary,
          borderWidth: 1,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 5,
        }
      case "pixel":
        return {
          backgroundColor: colors.card,
          borderColor: colors.primary,
          borderWidth: 2,
          borderBottomWidth: 4,
          borderRightWidth: 4,
          borderBottomColor: "rgba(0, 0, 0, 0.5)",
          borderRightColor: "rgba(0, 0, 0, 0.5)",
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
          elevation: 4,
        }
      case "glass":
        return {
          backgroundColor: `${colors.card}80`,
          borderColor: `${colors.border}40`,
          borderWidth: 1,
          shadowColor: `${colors.shadow}80`,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 3,
        }
      case "subtle":
        return {
          backgroundColor: colors.background,
          borderColor: colors.border + "30",
          borderWidth: 1,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 3,
          elevation: 1,
        }
      case "minimal":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          shadowOpacity: 0,
          elevation: 0,
        }
      default:
        return {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: getBorderWidth(),
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: customElevation / 2 },
          shadowOpacity: 0.08,
          shadowRadius: customElevation,
          elevation: customElevation,
        }
    }
  }

  const onPressIn = () => {
    if (isInteractive && isMounted.current) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
        speed: 20,
      }).start()
    }
  }

  const onPressOut = () => {
    if (isInteractive && isMounted.current) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }).start()
    }
  }

  const getPadding = () => {
    if (padding !== undefined) {
      return typeof padding === 'number' ? scale(padding) : padding
    }
    switch (variant) {
      case "minimal":
        return scale(8)
      case "subtle":
        return scale(12)
      default:
        return scale(16)
    }
  }

  const getMargin = () => {
    if (margin !== undefined) {
      return typeof margin === 'number' ? verticalScale(margin) : margin
    }
    return verticalScale(8)
  }

  const renderCardContent = () => (
    <>
      {glowEffect && (
        <Animated.View
          style={[
            styles.glow,
            {
              backgroundColor: colors.primary,
              opacity: glowOpacity,
              borderRadius: getBorderRadius(),
            },
          ]}
        />
      )}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </>
  )

  const baseCardStyle = [
    styles.card,
    {
      borderRadius: getBorderRadius(),
      padding: getPadding(),
      marginVertical: getMargin(),
      position: "relative",
      overflow: "hidden",
    },
    getCardStyle(),
    style,
  ]

  const animatedCardStyle = [
    styles.card,
    {
      backgroundColor: animated ? animatedBackgroundColor : getBackgroundColor(),
      borderColor: animated ? animatedBorderColor : getBorderColor(),
      shadowColor: animated ? animatedShadowColor : getShadowColor(),
      borderRadius: getBorderRadius(),
      borderWidth: getBorderWidth(),
      padding: getPadding(),
      marginVertical: getMargin(),
      transform: isInteractive ? [{ scale: scaleAnim }] : undefined,
    },
    getCardStyle(),
    style,
  ]

  if (isInteractive) {
    return (
      <Animated.View style={animatedCardStyle as any}>
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={({ pressed }) => [
            styles.pressable,
            {
              opacity: pressed && Platform.OS === 'ios' ? 0.9 : 1,
            },
          ]}
          android_ripple={
            variant !== "glass" && variant !== "minimal"
              ? { color: colors.primary + "20", borderless: false }
              : null
          }
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
        >
          {renderCardContent()}
        </Pressable>
      </Animated.View>
    )
  }

  if (animated) {
    return (
      <Animated.View
        style={animatedCardStyle as any}
        accessibilityRole="none"
        accessibilityLabel={accessibilityLabel}
      >
        {renderCardContent()}
      </Animated.View>
    )
  }

  return (
    <View
      style={baseCardStyle as any}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
    >
      {renderCardContent()}
    </View>
  )
}

export default memo(Card)