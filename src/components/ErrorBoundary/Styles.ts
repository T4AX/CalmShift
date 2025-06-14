import { StyleSheet } from "react-native";
import { scale, verticalScale } from "../../utils/responsive";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: verticalScale(16),
    color: "#1e293b",
  },
  message: {
    fontSize: scale(16),
    textAlign: "center",
    marginBottom: verticalScale(24),
    color: "#64748b",
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    borderRadius: scale(8),
  },
  buttonText: {
    color: "#ffffff",
    fontSize: scale(16),
    fontWeight: "600",
  },
})
