import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import { Card } from '../../components';
import { Colors } from '../../constants/Colors';
import { TextStyles } from '../../constants/Typography';

const { width } = Dimensions.get('window');

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
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

  const scans = [
    { 
      id: '1', 
      product: 'Nike Air Max 270', 
      brand: 'Nike',
      result: 'Authentic', 
      confidence: 95, 
      date: '2024-01-15T10:30:00Z',
      status: 'verified',
      category: 'Footwear',
      image: '👟',
      details: 'All authenticity markers verified'
    },
    { 
      id: '2', 
      product: 'iPhone 15 Pro Max', 
      brand: 'Apple',
      result: 'Suspicious', 
      confidence: 78, 
      date: '2024-01-14T15:45:00Z',
      status: 'warning',
      category: 'Electronics',
      image: '📱',
      details: 'Serial number inconsistencies detected'
    },
    { 
      id: '3', 
      product: 'Rolex Submariner', 
      brand: 'Rolex',
      result: 'Authentic', 
      confidence: 92, 
      date: '2024-01-13T09:15:00Z',
      status: 'verified',
      category: 'Watches',
      image: '⌚',
      details: 'Genuine materials and craftsmanship confirmed'
    },
    { 
      id: '4', 
      product: 'Louis Vuitton Bag', 
      brand: 'Louis Vuitton',
      result: 'Fake', 
      confidence: 88, 
      date: '2024-01-12T14:20:00Z',
      status: 'fake',
      category: 'Fashion',
      image: '👜',
      details: 'Counterfeit materials and poor stitching quality'
    },
    { 
      id: '5', 
      product: 'Adidas Yeezy 350', 
      brand: 'Adidas',
      result: 'Authentic', 
      confidence: 96, 
      date: '2024-01-11T11:00:00Z',
      status: 'verified',
      category: 'Footwear',
      image: '👟',
      details: 'All authentication features present'
    },
    { 
      id: '6', 
      product: 'Chanel No. 5', 
      brand: 'Chanel',
      result: 'Suspicious', 
      confidence: 72, 
      date: '2024-01-10T16:30:00Z',
      status: 'warning',
      category: 'Beauty',
      image: '🧴',
      details: 'Packaging inconsistencies noted'
    },
  ];

  const filters = [
    { id: 'all', label: 'All', count: scans.length },
    { id: 'verified', label: 'Authentic', count: scans.filter(s => s.status === 'verified').length },
    { id: 'warning', label: 'Suspicious', count: scans.filter(s => s.status === 'warning').length },
    { id: 'fake', label: 'Fake', count: scans.filter(s => s.status === 'fake').length },
  ];

  const filteredScans = selectedFilter === 'all' 
    ? scans 
    : scans.filter(scan => scan.status === selectedFilter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return Colors.success;
      case 'warning': return Colors.warning;
      case 'fake': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return '✅';
      case 'warning': return '⚠️';
      case 'fake': return '❌';
      default: return '❓';
    }
  };

  const renderScanItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.scanItemContainer,
        {
          opacity: fadeAnim,
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 20],
              outputRange: [0, 20 + (index * 5)],
            })
          }]
        }
      ]}
    >
      <TouchableOpacity activeOpacity={0.8}>
        <Card style={styles.scanCard} padding="medium">
          <View style={styles.scanHeader}>
            <View style={styles.scanImageContainer}>
              <Text style={styles.scanImage}>{item.image}</Text>
            </View>
            
            <View style={styles.scanInfo}>
              <Text style={styles.scanProduct}>{item.product}</Text>
              <Text style={styles.scanBrand}>{item.brand} • {item.category}</Text>
              <Text style={styles.scanDate}>{formatDate(item.date)}</Text>
            </View>
            
            <View style={styles.scanStatus}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.status) + '15' }
              ]}>
                <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(item.status) }
                ]}>
                  {item.result}
                </Text>
              </View>
              <Text style={styles.confidenceText}>{item.confidence}% confidence</Text>
            </View>
          </View>
          
          <View style={styles.scanDetails}>
            <Text style={styles.scanDetailsText}>{item.details}</Text>
          </View>
          
          <View style={styles.scanActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(filter.id)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter.id && styles.filterButtonTextActive
      ]}>
        {filter.label}
      </Text>
      <View style={[
        styles.filterCount,
        selectedFilter === filter.id && styles.filterCountActive
      ]}>
        <Text style={[
          styles.filterCountText,
          selectedFilter === filter.id && styles.filterCountTextActive
        ]}>
          {filter.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <Animated.View 
      style={[
        styles.headerContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      {/* Stats Summary */}
      <Card style={styles.statsCard} padding="large">
        <View style={styles.statsHeader}>
          <Text style={styles.statsTitle}>Scan Summary</Text>
          <Text style={styles.statsSubtitle}>Last 30 days</Text>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{scans.length}</Text>
            <Text style={styles.statLabel}>Total Scans</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.success }]}>
              {scans.filter(s => s.status === 'verified').length}
            </Text>
            <Text style={styles.statLabel}>Authentic</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.warning }]}>
              {scans.filter(s => s.status === 'warning').length}
            </Text>
            <Text style={styles.statLabel}>Suspicious</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.error }]}>
              {scans.filter(s => s.status === 'fake').length}
            </Text>
            <Text style={styles.statLabel}>Fake</Text>
          </View>
        </View>
      </Card>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filter Results</Text>
        <View style={styles.filtersRow}>
          {filters.map(renderFilterButton)}
        </View>
      </View>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📋</Text>
      <Text style={styles.emptyStateTitle}>No scans found</Text>
      <Text style={styles.emptyStateText}>
        {selectedFilter === 'all' 
          ? 'Start scanning products to see your history here'
          : `No ${selectedFilter} products found`
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
        translucent={false}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scan History</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredScans}
        renderItem={renderScanItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
  },
  
  // List
  listContent: {
    paddingBottom: 100, // Extra padding for tab bar
  },
  separator: {
    height: 12,
  },
  
  // Header content
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  
  // Stats
  statsCard: {
    marginBottom: 20,
  },
  statsHeader: {
    marginBottom: 16,
  },
  statsTitle: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  statsSubtitle: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...TextStyles.h3,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    ...TextStyles.small,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  
  // Filters
  filtersContainer: {
    marginBottom: 8,
  },
  filtersTitle: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginRight: 6,
  },
  filterButtonTextActive: {
    color: Colors.textLight,
    fontWeight: '600',
  },
  filterCount: {
    backgroundColor: Colors.backgroundTertiary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  filterCountActive: {
    backgroundColor: Colors.textLight + '20',
  },
  filterCountText: {
    ...TextStyles.small,
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  filterCountTextActive: {
    color: Colors.textLight,
  },
  
  // Scan items
  scanItemContainer: {
    paddingHorizontal: 24,
  },
  scanCard: {
    marginBottom: 0,
  },
  scanHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  scanImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scanImage: {
    fontSize: 20,
  },
  scanInfo: {
    flex: 1,
    marginRight: 12,
  },
  scanProduct: {
    ...TextStyles.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
    flexShrink: 1,
  },
  scanBrand: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  scanDate: {
    ...TextStyles.small,
    color: Colors.textTertiary,
  },
  scanStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statusText: {
    ...TextStyles.small,
    fontWeight: '600',
  },
  confidenceText: {
    ...TextStyles.small,
    color: Colors.textTertiary,
  },
  scanDetails: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  scanDetailsText: {
    ...TextStyles.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  scanActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    ...TextStyles.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    ...TextStyles.h4,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    ...TextStyles.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});