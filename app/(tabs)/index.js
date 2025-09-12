import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Button } from '../../components';
import { Colors } from '../../constants/Colors';
import { TextStyles } from '../../constants/Typography';
import useAuthStore from '../../stores/authStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
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

  const goToScan = () => {
    router.push('/(tabs)/scan');
  };

  const quickActions = [
    { id: 1, title: 'Quick Scan', icon: '📷', color: Colors.primary, action: goToScan },
    { id: 2, title: 'Batch Scan', icon: '📚', color: Colors.secondary, action: () => {} },
    { id: 3, title: 'History', icon: '📋', color: Colors.accent, action: () => router.push('/(tabs)/history') },
    { id: 4, title: 'Reports', icon: '📊', color: Colors.info, action: () => {} },
  ];

  const recentScans = [
    { id: 1, product: 'Nike Air Max', result: 'Authentic', confidence: 95, date: '2 hours ago', status: 'verified' },
    { id: 2, product: 'iPhone 15 Pro', result: 'Suspicious', confidence: 78, date: '1 day ago', status: 'warning' },
    { id: 3, product: 'Rolex Watch', result: 'Authentic', confidence: 92, date: '2 days ago', status: 'verified' },
  ];

  const stats = [
    { label: 'Total Scans', value: '127', icon: '🔍' },
    { label: 'Authentic', value: '89%', icon: '✅' },
    { label: 'This Month', value: '23', icon: '📅' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.greeting}>Good morning,</Text>
                <Text style={styles.userName}>{user?.name || 'User'}</Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <View style={styles.notificationIcon}>
                  <Text style={styles.notificationText}>🔔</Text>
                  <View style={styles.notificationBadge} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <Card key={index} style={styles.statCard} padding="medium">
                <View style={styles.statContent}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </Card>
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.quickActionCard}
                  onPress={action.action}
                  activeOpacity={0.8}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                    <Text style={styles.quickActionIconText}>{action.icon}</Text>
                  </View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Main CTA */}
          <Card style={styles.ctaCard} variant="gradient" padding="large">
            <View style={styles.ctaContent}>
              <View style={styles.ctaTextContent}>
                <Text style={styles.ctaTitle}>Start Scanning</Text>
                <Text style={styles.ctaSubtitle}>
                  Verify product authenticity with AI-powered detection
                </Text>
              </View>
              <Button
                title="Scan Now"
                onPress={goToScan}
                variant="secondary"
                style={styles.ctaButton}
              />
            </View>
            <View style={styles.ctaDecoration}>
              <Text style={styles.ctaDecorationText}>🤖</Text>
            </View>
          </Card>

          {/* Recent Scans */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Scans</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
                <Text style={styles.sectionLink}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.recentScansContainer}>
              {recentScans.map((scan) => (
                <Card key={scan.id} style={styles.scanCard} padding="medium">
                  <View style={styles.scanContent}>
                    <View style={styles.scanInfo}>
                      <Text style={styles.scanProduct}>{scan.product}</Text>
                      <Text style={styles.scanDate}>{scan.date}</Text>
                    </View>
                    <View style={styles.scanResult}>
                      <View style={[
                        styles.scanStatus,
                        { backgroundColor: scan.status === 'verified' ? Colors.success + '15' : Colors.warning + '15' }
                      ]}>
                        <Text style={[
                          styles.scanStatusText,
                          { color: scan.status === 'verified' ? Colors.success : Colors.warning }
                        ]}>
                          {scan.result}
                        </Text>
                      </View>
                      <Text style={styles.scanConfidence}>{scan.confidence}%</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </View>

          {/* Tips Section */}
          <Card style={styles.tipsCard} padding="large">
            <View style={styles.tipsHeader}>
              <Text style={styles.tipsIcon}>💡</Text>
              <Text style={styles.tipsTitle}>Pro Tip</Text>
            </View>
            <Text style={styles.tipsText}>
              For best results, ensure good lighting and capture clear images of product labels, serial numbers, and distinctive features.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  
  // Header
  header: {
    backgroundColor: Colors.background,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...TextStyles.body,
    color: Colors.textSecondary,
  },
  userName: {
    ...TextStyles.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginTop: 2,
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationText: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  
  // Stats
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -12,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  sectionLink: {
    ...TextStyles.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIconText: {
    fontSize: 20,
  },
  quickActionTitle: {
    ...TextStyles.caption,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // CTA Card
  ctaCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaTextContent: {
    flex: 1,
    marginRight: 16,
  },
  ctaTitle: {
    ...TextStyles.h4,
    color: Colors.textLight,
    fontWeight: '700',
    marginBottom: 4,
  },
  ctaSubtitle: {
    ...TextStyles.caption,
    color: Colors.textLight,
    opacity: 0.9,
    lineHeight: 18,
  },
  ctaButton: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  ctaDecoration: {
    position: 'absolute',
    top: -10,
    right: -10,
    opacity: 0.2,
  },
  ctaDecorationText: {
    fontSize: 60,
  },
  
  // Recent Scans
  recentScansContainer: {
    gap: 12,
  },
  scanCard: {
    marginBottom: 0,
  },
  scanContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanInfo: {
    flex: 1,
  },
  scanProduct: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  scanDate: {
    ...TextStyles.small,
    color: Colors.textTertiary,
  },
  scanResult: {
    alignItems: 'flex-end',
  },
  scanStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  scanStatusText: {
    ...TextStyles.small,
    fontWeight: '600',
  },
  scanConfidence: {
    ...TextStyles.small,
    color: Colors.textSecondary,
  },
  
  // Tips
  tipsCard: {
    marginHorizontal: 24,
    backgroundColor: Colors.info + '10',
    borderLeftWidth: 4,
    borderLeftColor: Colors.info,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipsIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tipsTitle: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  tipsText: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});