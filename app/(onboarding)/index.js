import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components';
import { Colors } from '../../constants/Colors';
import { TextStyles } from '../../constants/Typography';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Background elements */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Hero illustration placeholder */}
        <View style={styles.heroContainer}>
          <View style={styles.heroIllustration}>
            <View style={styles.phoneFrame}>
              <View style={styles.phoneScreen}>
                <View style={styles.scanningArea}>
                  <View style={styles.scanLine} />
                  <Text style={styles.scanText}>📱</Text>
                </View>
              </View>
            </View>
            
            {/* Floating elements */}
            <View style={styles.floatingElement1}>
              <Text style={styles.floatingIcon}>✓</Text>
            </View>
            <View style={styles.floatingElement2}>
              <Text style={styles.floatingIcon}>🔍</Text>
            </View>
            <View style={styles.floatingElement3}>
              <Text style={styles.floatingIcon}>🛡️</Text>
            </View>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.textContent}>
          <Text style={styles.title}>Welcome to Prodai</Text>
          <Text style={styles.subtitle}>
            Your AI-powered companion for authentic product verification
          </Text>
          
          {/* Features list */}
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🤖</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI Detection</Text>
                <Text style={styles.featureDescription}>
                  Advanced AI algorithms to detect fake products instantly
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📸</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Quick Scan</Text>
                <Text style={styles.featureDescription}>
                  Simply scan or take a photo to verify authenticity
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📊</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Detailed Reports</Text>
                <Text style={styles.featureDescription}>
                  Get comprehensive analysis and verification history
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            size="large"
            style={styles.getStartedButton}
          />
          
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Background elements
  backgroundCircle1: {
    position: 'absolute',
    top: -50,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    opacity: 0.08,
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.secondary,
    opacity: 0.06,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  // Hero section
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
    height: height * 0.35,
    justifyContent: 'center',
  },
  heroIllustration: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: 160,
    height: 280,
    backgroundColor: Colors.textPrimary,
    borderRadius: 24,
    padding: 8,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningArea: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scanLine: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.primary,
    opacity: 0.8,
  },
  scanText: {
    fontSize: 32,
  },
  
  // Floating elements
  floatingElement1: {
    position: 'absolute',
    top: 20,
    right: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingElement2: {
    position: 'absolute',
    bottom: 40,
    left: -30,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingElement3: {
    position: 'absolute',
    top: 80,
    left: -40,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.info,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingIcon: {
    fontSize: 16,
    color: Colors.textLight,
  },
  
  // Text content
  textContent: {
    marginBottom: 40,
  },
  title: {
    ...TextStyles.h1,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    ...TextStyles.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  
  // Features
  featuresList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  
  // Button section
  buttonContainer: {
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    marginBottom: 16,
  },
  termsText: {
    ...TextStyles.small,
    color: Colors.textTertiary,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 16,
  },
});