import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
      position: "relative",
      overflow: "hidden",
    },
    content: {
      flex: 1,
    },
    pressable: {
      flex: 1,
    },
    glow: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.3,
    },
    scanlines: {
      position: "absolute",
      top: -100, // Start above the view
      left: 0,
      right: 0,
      bottom: -100, // Extend below the view
      height: 200, // Height of scanline effect
      backgroundColor: "transparent",
      zIndex: 1,
      pointerEvents: "none",
    },
  })