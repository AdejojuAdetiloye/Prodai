import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  Alert,
  StatusBar,
  Platform
} from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Card } from '../../components';
import { Colors } from '../../constants/Colors';
import { TextStyles } from '../../constants/Typography';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    getPermissions();
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (scanning) {
      // Animate scan line
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanLineAnim.stopAnimation();
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [scanning]);

  const getPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) return;
    
    setScanned(true);
    setScanning(false);
    
    // Simulate AI processing
    setTimeout(() => {
      Alert.alert(
        'Product Scanned',
        `Barcode: ${data}\nType: ${type}\n\nAI Analysis: This appears to be an authentic product with 94% confidence.`,
        [
          { text: 'Scan Again', onPress: () => setScanned(false) },
          { text: 'View Details', onPress: () => {} },
        ]
      );
    }, 1000);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      setScanning(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        // Simulate AI processing
        setTimeout(() => {
          setScanning(false);
          Alert.alert(
            'Photo Analyzed',
            'AI Analysis complete!\n\nResult: Authentic Product\nConfidence: 92%\n\nThis product appears to be genuine based on visual analysis.',
            [
              { text: 'Take Another', onPress: () => {} },
              { text: 'Save Result', onPress: () => {} },
            ]
          );
        }, 2000);
      } catch (error) {
        setScanning(false);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Card style={styles.permissionCard} padding="large">
            <Text style={styles.permissionIcon}>📷</Text>
            <Text style={styles.permissionTitle}>Camera Permission</Text>
            <Text style={styles.permissionText}>
              We need camera access to scan and verify products
            </Text>
            <Button
              title="Grant Permission"
              onPress={getPermissions}
              style={styles.permissionButton}
            />
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Card style={styles.permissionCard} padding="large">
            <Text style={styles.permissionIcon}>🚫</Text>
            <Text style={styles.permissionTitle}>No Camera Access</Text>
            <Text style={styles.permissionText}>
              Please enable camera permission in your device settings to use the scanner
            </Text>
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.textPrimary}
        translucent={false}
      />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scan Product</Text>
          <Text style={styles.headerSubtitle}>
            Point camera at product or barcode
          </Text>
        </View>

        {/* Camera Container */}
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            flashMode={flashMode}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ref={cameraRef}
          >
            {/* Scanning Overlay */}
            <View style={styles.overlay}>
              {/* Top overlay */}
              <View style={styles.overlayTop} />
              
              {/* Middle section with scan area */}
              <View style={styles.overlayMiddle}>
                <View style={styles.overlaySide} />
                
                {/* Scan Area */}
                <View style={styles.scanArea}>
                  {/* Corner indicators */}
                  <View style={[styles.corner, styles.cornerTopLeft]} />
                  <View style={[styles.corner, styles.cornerTopRight]} />
                  <View style={[styles.corner, styles.cornerBottomLeft]} />
                  <View style={[styles.corner, styles.cornerBottomRight]} />
                  
                  {/* Scan line */}
                  {scanning && (
                    <Animated.View
                      style={[
                        styles.scanLine,
                        {
                          transform: [{
                            translateY: scanLineAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 200],
                            })
                          }]
                        }
                      ]}
                    />
                  )}
                  
                  {/* Status text */}
                  <View style={styles.scanStatus}>
                    <Text style={styles.scanStatusText}>
                      {scanning ? 'Analyzing...' : 'Position product in frame'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.overlaySide} />
              </View>
              
              {/* Bottom overlay */}
              <View style={styles.overlayBottom} />
            </View>
          </Camera>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {/* Top controls */}
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
              <Text style={styles.controlIcon}>
                {flashMode === Camera.Constants.FlashMode.off ? '🔦' : '💡'}
              </Text>
              <Text style={styles.controlLabel}>Flash</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <Text style={styles.controlIcon}>🖼️</Text>
              <Text style={styles.controlLabel}>Gallery</Text>
            </TouchableOpacity>
          </View>

          {/* Main capture button */}
          <View style={styles.captureContainer}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                style={[
                  styles.captureButton,
                  scanning && styles.captureButtonScanning
                ]}
                onPress={takePicture}
                disabled={scanning}
              >
                <View style={styles.captureButtonInner}>
                  <Text style={styles.captureIcon}>
                    {scanning ? '⏳' : '📷'}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            
            <Text style={styles.captureLabel}>
              {scanning ? 'Processing...' : 'Tap to scan'}
            </Text>
          </View>

          {/* Instructions */}
          <Card style={styles.instructionsCard} padding="medium">
            <View style={styles.instructionsHeader}>
              <Text style={styles.instructionsIcon}>💡</Text>
              <Text style={styles.instructionsTitle}>Scanning Tips</Text>
            </View>
            <Text style={styles.instructionsText}>
              • Ensure good lighting{'\n'}
              • Hold camera steady{'\n'}
              • Focus on product labels or barcodes{'\n'}
              • Keep product centered in frame
            </Text>
          </Card>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.textPrimary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  
  // Permission screens
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 24,
  },
  permissionCard: {
    alignItems: 'center',
    width: '100%',
  },
  permissionIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  permissionTitle: {
    ...TextStyles.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionText: {
    ...TextStyles.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  permissionButton: {
    width: '100%',
  },
  
  // Header
  header: {
    backgroundColor: Colors.background,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    ...TextStyles.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
  },
  
  // Camera
  cameraContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  
  // Overlay
  overlay: {
    flex: 1,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: 250,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  
  // Scan area
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: Colors.primary,
    borderWidth: 3,
  },
  cornerTopLeft: {
    top: 10,
    left: 10,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cornerTopRight: {
    top: 10,
    right: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  cornerBottomLeft: {
    bottom: 10,
    left: 10,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cornerBottomRight: {
    bottom: 10,
    right: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  scanStatus: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanStatusText: {
    ...TextStyles.caption,
    color: Colors.textLight,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Controls
  controls: {
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  controlButton: {
    alignItems: 'center',
    padding: 12,
  },
  controlIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  controlLabel: {
    ...TextStyles.small,
    color: Colors.textSecondary,
  },
  
  // Capture button
  captureContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 8,
  },
  captureButtonScanning: {
    backgroundColor: Colors.accent,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureIcon: {
    fontSize: 28,
  },
  captureLabel: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  
  // Instructions
  instructionsCard: {
    backgroundColor: Colors.backgroundSecondary,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionsIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  instructionsTitle: {
    ...TextStyles.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  instructionsText: {
    ...TextStyles.small,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});