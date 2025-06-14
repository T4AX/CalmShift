import { Dimensions, PixelRatio, Platform, NativeModules } from "react-native"
import { useState, useEffect } from "react"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Get device info
const { PlatformConstants } = NativeModules
const deviceType = PlatformConstants?.interfaceIdiom || "unknown"
const isTablet = deviceType === "pad" || (SCREEN_WIDTH >= 768 && SCREEN_HEIGHT >= 768)

// Base dimensions (based on iPhone 11 Pro)
const baseWidth = 375
const baseHeight = 812

// Calculating scale ratio based on screen width
const widthRatio = SCREEN_WIDTH / baseWidth
const heightRatio = SCREEN_HEIGHT / baseHeight

// Use the smaller ratio to ensure content fits on screen
// For tablets, use a different scaling factor to prevent elements from becoming too large
const ratio = isTablet ? Math.min(widthRatio, heightRatio) * 0.8 : Math.min(widthRatio, heightRatio)

/**
 * Scales a value based on the screen size
 * @param size - The size to scale
 * @returns The scaled size
 */
export const scale = (size: number): number => {
  // Prevent negative values
  if (size <= 0) return size

  const newSize = size * ratio
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 * Scales a value based on the screen width
 * @param size - The size to scale
 * @returns The scaled size
 */
export const horizontalScale = (size: number): number => {
  // Prevent negative values
  if (size <= 0) return size

  // For tablets, use a different scaling factor
  const scaleFactor = isTablet ? widthRatio * 0.8 : widthRatio
  return size * scaleFactor
}

/**
 * Scales a value based on the screen height
 * @param size - The size to scale
 * @returns The scaled size
 */
export const verticalScale = (size: number): number => {
  // Prevent negative values
  if (size <= 0) return size

  // For tablets, use a different scaling factor
  const scaleFactor = isTablet ? heightRatio * 0.8 : heightRatio
  return size * scaleFactor
}

/**
 * Scales a font size based on the screen size
 * @param size - The font size to scale
 * @returns The scaled font size
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  // Prevent negative values
  if (size <= 0) return size

  // For tablets, use a different scaling factor
  const scaleFactor = isTablet ? factor * 0.8 : factor
  return size + (scale(size) - size) * scaleFactor
}

/**
 * Returns dimensions for responsive layouts
 */
export const getResponsiveDimensions = () => {
  return {
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
    isSmallDevice: SCREEN_WIDTH < 375,
    isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
    isLargeDevice: SCREEN_WIDTH >= 414,
    isTablet,
    isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  }
}

/**
 * Hook to get responsive dimensions and re-render on dimension changes
 */
export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState(() => getResponsiveDimensions())

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        screenWidth: window.width,
        screenHeight: window.height,
        isSmallDevice: window.width < 375,
        isMediumDevice: window.width >= 375 && window.width < 414,
        isLargeDevice: window.width >= 414,
        isTablet: window.width >= 768 && window.height >= 768,
        isLandscape: window.width > window.height,
      })
    })

    return () => subscription?.remove()
  }, [])

  return dimensions
}

