import { StyleSheet } from "react-native";
import { scale } from "../../utils/responsive";

export const styles = StyleSheet.create({
    quote: {
      fontStyle: "italic",
      paddingLeft: scale(16),
      borderLeftWidth: 2,
      borderLeftColor: "rgba(128, 128, 128, 0.5)",
    },
    code: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      paddingHorizontal: scale(4),
      paddingVertical: scale(2),
      borderRadius: scale(3),
    },
    overline: {
      letterSpacing: 1.5,
    },
  })