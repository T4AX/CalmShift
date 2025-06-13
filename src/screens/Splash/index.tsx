import type React from "react"
import { useEffect } from "react"
import { View, Animated, Dimensions, Image, StatusBar, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../context/ThemeContext"
import type { AppNavigationProp } from "../../types/navigation"
import { styles } from "./Styles"


const Splash = () => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation<AppNavigationProp>()

  // Animation values
  const logoOpacity = new Animated.Value(0)
  const logoScale = new Animated.Value(0.8)
  const textOpacity = new Animated.Value(0)
  const cardOpacity = new Animated.Value(0)
  const cardTranslateY = new Animated.Value(30)

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(cardTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      })
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigation, logoOpacity, logoScale, textOpacity, cardOpacity, cardTranslateY])

  return (
    <View style={[styles.container, { backgroundColor: colors.splash }]}>
      <StatusBar backgroundColor={colors.splash} />
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            opacity: cardOpacity,
            transform: [{ translateY: cardTranslateY }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              shadowColor: colors.primary,
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={require("../../assets/icons/icon.png")}
            resizeMode="contain"
            style={styles.logo}
          />
        </Animated.View>
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
          <Text style={[styles.title, { color: colors.text.primary, fontFamily: fonts.bold }]}>
            CalmShift
          </Text>
          <Text style={[styles.tagline, { color: colors.text.secondary, fontFamily: fonts.medium }]}>
            Find Your Calm, Every Day
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

export default Splash