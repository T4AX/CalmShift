import type React from "react"
import { Text, type TextStyle, type TextProps } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { moderateScale } from "../../utils/responsive"
import { styles } from "./Styles"

type TypographyVariant = 
  | "h1" 
  | "h2" 
  | "h3" 
  | "h4" 
  | "h5"
  | "body1" 
  | "body2" 
  | "subtitle1"
  | "subtitle2"
  | "caption" 
  | "label" 
  | "overline"
  | "quote"
  | "code"
  | "retro"
  | "pixel"
  | "terminal"

type TypographyColor = 
  | "primary" 
  | "secondary" 
  | "tertiary" 
  | "inverse" 
  | "accent" 
  | "danger" 
  | "success" 
  | "info"
  | "warning"
  | "muted"
  | "custom"

type TypographyWeight = 
  | "thin"
  | "light"
  | "normal" 
  | "medium" 
  | "semibold" 
  | "bold"
  | "black"

type TypographyAlign = "auto" | "left" | "center" | "right" | "justify"

interface TypographyProps extends TextProps {
  variant?: TypographyVariant
  color?: TypographyColor
  customColor?: string
  weight?: TypographyWeight
  style?: TextStyle
  children: React.ReactNode
  glowEffect?: boolean
  pixelated?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  align?: TypographyAlign
  letterSpacing?: number
  uppercase?: boolean
  lowercase?: boolean
  capitalize?: boolean
  truncate?: boolean | number
  selectable?: boolean
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color = "primary",
  customColor,
  weight = "normal",
  style,
  children,
  glowEffect = false,
  pixelated = false,
  italic = false,
  underline = false,
  strikethrough = false,
  align = "auto",
  letterSpacing,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  truncate,
  selectable = false,
  ...props
}) => {
  const { colors, fonts } = useTheme()

  const getFontSize = () => {
    switch (variant) {
      case "h1":
        return moderateScale(32)
      case "h2":
        return moderateScale(28)
      case "h3":
        return moderateScale(24)
      case "h4":
        return moderateScale(20)
      case "h5":
        return moderateScale(18)
      case "body1":
        return moderateScale(16)
      case "body2":
        return moderateScale(15)
      case "subtitle1":
        return moderateScale(16)
      case "subtitle2":
        return moderateScale(14)
      case "caption":
        return moderateScale(12)
      case "label":
        return moderateScale(14)
      case "overline":
        return moderateScale(10)
      case "retro":
      case "pixel":
        return moderateScale(14)
      case "terminal":
        return moderateScale(15)
      case "quote":
        return moderateScale(17)
      case "code":
        return moderateScale(14)
      default:
        return moderateScale(16)
    }
  }

  const getLineHeight = () => {
    switch (variant) {
      case "h1":
        return moderateScale(40)
      case "h2":
        return moderateScale(36)
      case "h3":
        return moderateScale(32)
      case "h4":
        return moderateScale(28)
      case "h5":
        return moderateScale(24)
      case "body1":
        return moderateScale(24)
      case "body2":
        return moderateScale(22)
      case "subtitle1":
        return moderateScale(24)
      case "subtitle2":
        return moderateScale(20)
      case "caption":
        return moderateScale(16)
      case "label":
        return moderateScale(20)
      case "overline":
        return moderateScale(14)
      case "retro":
      case "pixel":
        return moderateScale(20)
      case "terminal":
        return moderateScale(22)
      case "quote":
        return moderateScale(28)
      case "code":
        return moderateScale(20)
      default:
        return moderateScale(24)
    }
  }

  const getFontFamily = () => {
    if (variant === "retro" || variant === "pixel" || pixelated) {
      return "PressStart2P-Regular"
    } else if (variant === "terminal" || variant === "code") {
      return "CascadiaCode-Regular"
    } else {
      const baseWeight = {
        thin: "thin",
        light: "light",
        normal: "regular",
        medium: "medium",
        semibold: "semibold",
        bold: "bold",
        black: "black",
      }[weight] || "regular"
      const fontKey = italic ? `${baseWeight}Italic` : baseWeight
      return (fonts as any)[fontKey] || fonts.regular
    }
  }

  const getColor = () => {
    if (color === "custom" && customColor) {
      return customColor
    }
    if (color !== "primary") {
      switch (color) {
        case "secondary":
          return colors.text.secondary
        case "tertiary":
          return colors.text.tertiary
        case "inverse":
          return colors.text.inverse
        case "accent":
          return colors.accent
        case "danger":
          return colors.danger
        case "success":
          return colors.success
        case "info":
          return colors.secondary
        case "warning":
          return "#F59E0B"
        case "muted":
          return colors.text.tertiary + "80"
        default:
          return colors.text.primary
      }
    } else {
      switch (variant) {
        case "retro":
          return "#33FF33"
        case "pixel":
          return colors.primary
        case "terminal":
        case "code":
          return "#00FF00"
        default:
          return colors.text.primary
      }
    }
  }

  const getTextShadow = () => {
    if (glowEffect) {
      return {
        textShadowColor: getColor(),
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
      }
    }
    return {}
  }

  const getTextTransform = () => {
    if (uppercase) return "uppercase"
    if (lowercase) return "lowercase"
    if (capitalize) return "capitalize"
    if (variant === "overline") return "uppercase"
    return undefined
  }

  const getLetterSpacing = () => {
    if (letterSpacing !== undefined) return letterSpacing
    switch (variant) {
      case "overline":
        return 1.5
      case "h1":
      case "h2":
        return -0.5
      case "caption":
        return 0.4
      case "code":
        return 0
      default:
        return 0.2
    }
  }

  const getVariantSpecificStyles = () => {
    switch (variant) {
      case "quote":
        return styles.quote
      case "code":
        return styles.code
      case "overline":
        return styles.overline
      default:
        return {}
    }
  }

  const getFontWeight = () => {
    switch (weight) {
      case "thin":
        return "200"
      case "light":
        return "300"
      case "normal":
        return "400"
      case "medium":
        return "500"
      case "semibold":
        return "600"
      case "bold":
        return "700"
      case "black":
        return "900"
      default:
        return "400"
    }
  }

  const getTextDecorationLine = () => {
    if (underline && strikethrough) return "underline line-through"
    if (underline) return "underline"
    if (strikethrough) return "line-through"
    return "none"
  }

  const getNumberOfLines = () => {
    if (truncate === true) return 1
    if (typeof truncate === "number") return truncate
    return undefined
  }

  return (
    <Text
      {...props}
      style={[
        {
          fontSize: getFontSize(),
          lineHeight: getLineHeight(),
          fontWeight: getFontWeight(),
          fontFamily: getFontFamily(),
          color: getColor(),
          textAlign: align,
          letterSpacing: getLetterSpacing(),
          textTransform: getTextTransform(),
          textDecorationLine: getTextDecorationLine(),
          ...getTextShadow(),
        },
        getVariantSpecificStyles(),
        style,
      ]}
      numberOfLines={getNumberOfLines()}
      ellipsizeMode={truncate ? "tail" : props.ellipsizeMode}
      selectable={selectable}
    >
      {children}
    </Text>
  )
}



export default Typography