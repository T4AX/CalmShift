import { StyleSheet } from "react-native"
import { verticalScale, scale } from "../../utils/responsive"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: scale(290),
    borderRadius: scale(28),
    alignItems: "center",
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.10,
    shadowRadius: 32,
    elevation: 18,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(24),
    backgroundColor: "rgba(21,130,56,0.08)",
    borderRadius: scale(60),
    padding: scale(14),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 10,
  },
  logo: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(16),
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: scale(32),
    textAlign: "center",
  },
  tagline: {
    marginTop: verticalScale(12),
    fontSize: scale(15),
    textAlign: "center",
    letterSpacing: 0.2,
  },
})