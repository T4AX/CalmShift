import { Component, type ErrorInfo, type ReactNode } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { scale, verticalScale } from "../utils/responsive"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.message}>{this.state.error?.message || "An unexpected error occurred"}</Text>
            <TouchableOpacity style={styles.button} onPress={this.resetError}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
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

export default ErrorBoundary

