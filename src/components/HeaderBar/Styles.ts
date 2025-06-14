import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      width: "100%",
      borderBottomWidth: 1,
      zIndex: 10,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 56,
      paddingHorizontal: 16,
    },
    backButton: {
      marginRight: 8,
    },
    titleContainer: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      textAlign: "center",
    },
    rightContainer: {
      marginLeft: 8,
      minWidth: 28,
    },
  })