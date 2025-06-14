import { StyleSheet } from "react-native";
import { scale, verticalScale } from "../../utils/responsive";

export const styles = StyleSheet.create({
    card: {
      padding: scale(16),
      marginBottom: verticalScale(16),
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: verticalScale(12),
    },
    title: {
      flex: 1,
    },
    refreshButton: {
      padding: scale(8),
    },
    quoteContainer: {
      borderRadius: scale(12),
      padding: scale(20),
      paddingTop: scale(30),
    },
    quoteIcon: {
      position: "absolute",
      top: scale(10),
      left: scale(10),
    },
    quoteText: {
      textAlign: "center",
      fontStyle: "italic",
      lineHeight: scale(24),
      marginBottom: verticalScale(12),
    },
    author: {
      textAlign: "right",
      marginTop: verticalScale(8),
    },
  })