import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const Card = ({ 
  children, 
  style, 
  variant = 'default',
  padding = 'medium',
  shadow = true 
}) => {
  const getCardStyle = () => {
    const baseStyle = [styles.card, styles[padding]];
    
    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.elevated);
        break;
      case 'outlined':
        baseStyle.push(styles.outlined);
        break;
      case 'gradient':
        baseStyle.push(styles.gradient);
        break;
      default:
        baseStyle.push(styles.default);
    }
    
    if (shadow && variant !== 'outlined') {
      baseStyle.push(styles.shadow);
    }
    
    return baseStyle;
  };

  return (
    <View style={[...getCardStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  
  // Padding variants
  none: {
    padding: 0,
  },
  small: {
    padding: 12,
  },
  medium: {
    padding: 16,
  },
  large: {
    padding: 24,
  },
  
  // Card variants
  default: {
    backgroundColor: Colors.background,
  },
  elevated: {
    backgroundColor: Colors.background,
  },
  outlined: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  gradient: {
    backgroundColor: Colors.primary,
  },
  
  // Shadow
  shadow: {
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});