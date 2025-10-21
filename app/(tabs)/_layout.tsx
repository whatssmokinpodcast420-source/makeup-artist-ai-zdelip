
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'sparkles',
      label: 'Profile',
    },
    {
      name: 'recommendations',
      route: '/(tabs)/recommendations',
      icon: 'wand.and.stars',
      label: 'Looks',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="sparkles" drawable="ic_home" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="recommendations">
          <Icon sf="wand.and.stars" drawable="ic_looks" />
          <Label>Looks</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="recommendations" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
