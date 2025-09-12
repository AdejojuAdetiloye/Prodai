import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { TextStyles } from '../../constants/Typography';

const TabIcon = ({ icon, color, focused, label }) => {
  return (
    <View style={styles.tabIconContainer}>
      <View style={[
        styles.iconWrapper,
        focused && styles.iconWrapperFocused
      ]}>
        <Text style={[styles.icon, { color }]}>{icon}</Text>
      </View>
      <Text style={[
        styles.tabLabel,
        { color },
        focused && styles.tabLabelFocused
      ]}>
        {label}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="🏠"
              color={color}
              focused={focused}
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="📷"
              color={color}
              focused={focused}
              label="Scan"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="📋"
              color={color}
              focused={focused}
              label="History"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon="👤"
              color={color}
              focused={focused}
              label="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: 88,
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconWrapperFocused: {
    backgroundColor: Colors.primary + '15',
  },
  icon: {
    fontSize: 20,
  },
  tabLabel: {
    ...TextStyles.small,
    fontWeight: '500',
    fontSize: 11,
    includeFontPadding: false,
    textAlign: 'center',
  },
  tabLabelFocused: {
    fontWeight: '600',
  },
});