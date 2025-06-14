import { StyleSheet } from "react-native";
import { scale, verticalScale } from "../../utils/responsive";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: scale(20),
    },
    message: {
      marginTop: verticalScale(16),
      textAlign: "center",
    },
  })
  