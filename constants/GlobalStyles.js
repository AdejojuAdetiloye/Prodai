import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors } from './Colors';
import { TextStyles } from './Typography';

export const GlobalStyles = StyleSheet.create({
  // Safe area styles
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  safeAreaSecondary: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  containerSecondary: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  
  // Content styles
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  
  contentCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  
  // Scroll view styles
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for tab bar
  },
  
  // Text styles with proper rendering
  textPrimary: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  textSecondary: {
    ...TextStyles.body,
    color: Colors.textSecondary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  textCaption: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 18,
  },
  
  // Header styles
  header: {
    backgroundColor: Colors.background,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  headerTitle: {
    ...TextStyles.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  // Button styles
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  
  buttonText: {
    ...TextStyles.body,
    color: Colors.textLight,
    fontWeight: '600',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  // Input styles
  input: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    ...TextStyles.body,
    color: Colors.textPrimary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Spacing
  marginBottom: {
    marginBottom: 16,
  },
  
  marginTop: {
    marginTop: 16,
  },
  
  paddingHorizontal: {
    paddingHorizontal: 24,
  },
  
  paddingVertical: {
    paddingVertical: 16,
  },
  
  // Shadows
  shadow: {
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  shadowLarge: {
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  
  // Status bar styles
  statusBarLight: {
    backgroundColor: Colors.background,
  },
  
  statusBarDark: {
    backgroundColor: Colors.textPrimary,
  },
});

// Helper functions for responsive design
export const getResponsiveWidth = (percentage) => {
  const { width } = require('react-native').Dimensions.get('window');
  return (width * percentage) / 100;
};

export const getResponsiveHeight = (percentage) => {
  const { height } = require('react-native').Dimensions.get('window');
  return (height * percentage) / 100;
};

// Text truncation helper
export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};