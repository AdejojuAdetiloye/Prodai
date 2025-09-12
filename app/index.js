import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { TextStyles } from '../constants/Typography';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after animation
    const timer = setTimeout(() => {
      router.replace('/(onboarding)');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient circles */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
      
      {/* Main content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        {/* Logo/Icon placeholder */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>P</Text>
          </View>
        </View>
        
        {/* App name */}
        <Text style={styles.title}>Prodai</Text>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          AI-Powered Fake Product Detector
        </Text>
        
        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDots}>
            <Animated.View style={[styles.dot, styles.dot1]} />
            <Animated.View style={[styles.dot, styles.dot2]} />
            <Animated.View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      </Animated.View>
      
      {/* Bottom text */}
      <Animated.View 
        style={[
          styles.bottomContainer,
          { opacity: fadeAnim }
        ]}
      >
        <Text style={styles.bottomText}>Powered by AI Technology</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Background elements
  backgroundCircle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: Colors.secondary,
    opacity: 0.08,
  },
  backgroundCircle3: {
    position: 'absolute',
    top: height * 0.3,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.accent,
    opacity: 0.12,
  },
  
  // Main content
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    ...TextStyles.h1,
    color: Colors.textLight,
    fontSize: 36,
    fontWeight: '800',
  },
  
  title: {
    ...TextStyles.h1,
    color: Colors.textPrimary,
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -1,
  },
  
  subtitle: {
    ...TextStyles.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
    paddingHorizontal: 32,
    lineHeight: 24,
  },
  
  // Loading indicator
  loadingContainer: {
    marginTop: 32,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  
  // Bottom content
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  bottomText: {
    ...TextStyles.caption,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
});