
import { BlurView } from 'expo-blur';
import React from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 40,
  borderRadius = 25,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const activeIndex = tabs.findIndex((tab) => {
    if (tab.route === '/(tabs)/(home)/') {
      return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
    }
    return pathname.includes(tab.name);
  });

  const translateX = useSharedValue(0);

  React.useEffect(() => {
    const tabWidth = containerWidth / tabs.length;
    translateX.value = withSpring(activeIndex * tabWidth, {
      damping: 20,
      stiffness: 90,
    });
  }, [activeIndex, containerWidth, tabs.length]);

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route as any);
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const tabWidth = containerWidth / tabs.length;

  return (
    <SafeAreaView
      style={[styles.safeArea, { marginBottom: bottomMargin }]}
      edges={['bottom']}
    >
      <View style={[styles.container, { width: containerWidth }]}>
        <BlurView
          intensity={80}
          tint="light"
          style={[styles.blurContainer, { borderRadius }]}
        >
          <View style={styles.tabBar}>
            <Animated.View
              style={[
                styles.activeIndicator,
                {
                  width: tabWidth,
                  borderRadius: borderRadius - 5,
                  backgroundColor: colors.primary,
                },
                animatedIndicatorStyle,
              ]}
            />
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={[styles.tab, { width: tabWidth }]}
                  onPress={() => handleTabPress(tab.route)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={tab.icon as any}
                    size={24}
                    color={isActive ? colors.card : colors.text}
                  />
                  <Text
                    style={[
                      styles.label,
                      { color: isActive ? colors.card : colors.text },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    height: 70,
    overflow: 'hidden',
  },
  blurContainer: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'android' ? colors.card + 'E6' : 'transparent',
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    height: '80%',
    top: '10%',
    left: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    zIndex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
