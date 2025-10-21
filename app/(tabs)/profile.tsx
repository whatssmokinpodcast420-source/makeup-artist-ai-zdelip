
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Redirect } from "expo-router";

export default function ProfileScreen() {
  // Redirect to home screen since we're using home as the profile input
  return <Redirect href="/(tabs)/(home)/" />;
}
