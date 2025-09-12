import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
  Alert,
  StatusBar,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card } from '../../components';
import { Colors } from '../../constants/Colors';
import { TextStyles } from '../../constants/Typography';
import useAuthStore from '../../stores/authStore';
import { getCurrentLocation, getCurrencyFromLocation } from '../../services/location';
import { processSubscription } from '../../services/payment';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [currency, setCurrency] = useState('USD');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fetchLocation();
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fetchLocation = async () => {
    try {
      const location = await getCurrentLocation();
      const curr = getCurrencyFromLocation(location.coords.latitude, location.coords.longitude);
      setCurrency(curr);
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/login');
          }
        },
      ]
    );
  };

  const handleSubscribe = async (plan) => {
    try {
      await processSubscription(plan, currency);
    } catch (error) {
      Alert.alert('Error', 'Failed to process subscription');
    }
  };

  const pricingPlans = [
    { 
      name: 'Starter', 
      price: currency === 'NGN' ? '₦15,000' : '$15', 
      period: '/month', 
      features: ['1 brand verification', '2 products', '200 scans/month', 'Basic support'],
      color: Colors.info,
      popular: false
    },
    { 
      name: 'Pro', 
      price: currency === 'NGN' ? '₦50,000' : '$50', 
      period: '/month', 
      features: ['10 products', '2000 scans/month', 'Advanced analytics', 'Priority support', 'API access'],
      color: Colors.primary,
      popular: true
    },
    { 
      name: 'Enterprise', 
      price: 'Custom', 
      period: '', 
      features: ['Unlimited scans', 'SLA guarantee', 'On-premise deployment', 'Custom integrations', 'Dedicated support'],
      color: Colors.secondary,
      popular: false
    },
  ];

  const menuItems = [
    { id: 'account', title: 'Account Settings', icon: '⚙️', action: () => {} },
    { id: 'notifications', title: 'Notifications', icon: '🔔', action: () => {} },
    { id: 'security', title: 'Security & Privacy', icon: '🔒', action: () => {} },
    { id: 'help', title: 'Help & Support', icon: '❓', action: () => {} },
    { id: 'about', title: 'About Prodai', icon: 'ℹ️', action: () => {} },
  ];

  const stats = [
    { label: 'Total Scans', value: '127', icon: '🔍' },
    { label: 'Authentic Found', value: '89%', icon: '✅' },
    { label: 'Member Since', value: 'Jan 2024', icon: '📅' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
        translucent={false}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <Card style={styles.profileCard} padding="large">
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusIcon}>✓</Text>
                </View>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
                <View style={styles.membershipBadge}>
                  <Text style={styles.membershipText}>Free Plan</Text>
                </View>
              </View>
            </View>
            
            {/* Stats */}
            <View style={styles.statsContainer}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickAction}>
                <Text style={styles.quickActionIcon}>📊</Text>
                <Text style={styles.quickActionText}>View Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Text style={styles.quickActionIcon}>📤</Text>
                <Text style={styles.quickActionText}>Export Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Text style={styles.quickActionIcon}>🔗</Text>
                <Text style={styles.quickActionText}>Share App</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pricing Plans */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upgrade Your Plan</Text>
            <Text style={styles.sectionSubtitle}>
              Unlock advanced features and higher scan limits
            </Text>
            
            <View style={styles.pricingContainer}>
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  style={[
                    styles.pricingCard,
                    plan.popular && styles.pricingCardPopular
                  ]} 
                  padding="large"
                >
                  {plan.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>Most Popular</Text>
                    </View>
                  )}
                  
                  <View style={styles.pricingHeader}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.planPrice}>{plan.price}</Text>
                      {plan.period && (
                        <Text style={styles.planPeriod}>{plan.period}</Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.featuresContainer}>
                    {plan.features.map((feature, featureIndex) => (
                      <View key={featureIndex} style={styles.featureItem}>
                        <Text style={styles.featureIcon}>✓</Text>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <Button
                    title={plan.name === 'Enterprise' ? 'Contact Sales' : 'Subscribe'}
                    onPress={() => handleSubscribe(plan.name)}
                    variant={plan.popular ? 'primary' : 'outline'}
                    style={styles.subscribeButton}
                  />
                </Card>
              ))}
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Card style={styles.menuCard} padding="none">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    index !== menuItems.length - 1 && styles.menuItemBorder
                  ]}
                  onPress={item.action}
                >
                  <View style={styles.menuItemLeft}>
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </Card>
          </View>

          {/* App Info */}
          <Card style={styles.appInfoCard} padding="large">
            <View style={styles.appInfoHeader}>
              <Text style={styles.appInfoIcon}>🤖</Text>
              <View style={styles.appInfoText}>
                <Text style={styles.appInfoTitle}>Prodai v1.0.0</Text>
                <Text style={styles.appInfoSubtitle}>
                  AI-powered product authentication
                </Text>
              </View>
            </View>
          </Card>

          {/* Logout Button */}
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Extra padding for tab bar
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  
  // Header
  header: {
    backgroundColor: Colors.background,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    ...TextStyles.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 18,
  },
  
  // Profile Card
  profileCard: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...TextStyles.h2,
    color: Colors.textLight,
    fontWeight: '700',
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  statusIcon: {
    fontSize: 10,
    color: Colors.textLight,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    ...TextStyles.body,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  membershipBadge: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  membershipText: {
    ...TextStyles.small,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  statValue: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    ...TextStyles.small,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  
  // Sections
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    ...TextStyles.small,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Pricing
  pricingContainer: {
    gap: 16,
  },
  pricingCard: {
    position: 'relative',
  },
  pricingCardPopular: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  popularText: {
    ...TextStyles.small,
    color: Colors.textLight,
    fontWeight: '600',
  },
  pricingHeader: {
    marginBottom: 16,
  },
  planName: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    ...TextStyles.h3,
    color: Colors.primary,
    fontWeight: '700',
  },
  planPeriod: {
    ...TextStyles.body,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 14,
    color: Colors.success,
    marginRight: 8,
    width: 16,
  },
  featureText: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    flex: 1,
    flexWrap: 'wrap',
    lineHeight: 18,
  },
  subscribeButton: {
    marginTop: 4,
  },
  
  // Menu
  menuCard: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  menuTitle: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    fontWeight: '500',
    flex: 1,
    flexShrink: 1,
  },
  menuArrow: {
    ...TextStyles.h4,
    color: Colors.textTertiary,
    fontWeight: '300',
  },
  
  // App Info
  appInfoCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: Colors.backgroundTertiary,
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appInfoIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  appInfoText: {
    flex: 1,
  },
  appInfoTitle: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  appInfoSubtitle: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
  },
  
  // Logout
  logoutButton: {
    marginHorizontal: 24,
    borderColor: Colors.error,
  },
  logoutButtonText: {
    color: Colors.error,
  },
});