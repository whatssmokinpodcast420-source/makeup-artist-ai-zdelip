
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import Button from "@/components/button";

export default function HomeScreen() {
  const router = useRouter();
  const [skinTone, setSkinTone] = useState("");
  const [undertone, setUndertone] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [faceShape, setFaceShape] = useState("");

  const handleGenerateRecommendations = () => {
    console.log("Generating recommendations with:", { skinTone, undertone, eyeColor, faceShape });
    router.push({
      pathname: "/(tabs)/recommendations",
      params: { skinTone, undertone, eyeColor, faceShape }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Makeup Profile",
            headerLargeTitle: true,
          }}
        />
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        <View style={styles.header}>
          <IconSymbol name="sparkles" size={60} color={colors.primary} />
          <Text style={styles.title}>AI Makeup Artist</Text>
          <Text style={styles.subtitle}>
            Get personalized makeup recommendations for every occasion
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Your Profile</Text>
          <Text style={styles.sectionDescription}>
            Tell us about yourself to get the best recommendations
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Skin Tone</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Fair, Medium, Tan, Deep"
              placeholderTextColor={colors.textSecondary}
              value={skinTone}
              onChangeText={setSkinTone}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Undertone</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Cool, Warm, Neutral"
              placeholderTextColor={colors.textSecondary}
              value={undertone}
              onChangeText={setUndertone}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Eye Color</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Brown, Blue, Green, Hazel"
              placeholderTextColor={colors.textSecondary}
              value={eyeColor}
              onChangeText={setEyeColor}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Face Shape (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Oval, Round, Square, Heart"
              placeholderTextColor={colors.textSecondary}
              value={faceShape}
              onChangeText={setFaceShape}
            />
          </View>

          <Button
            onPress={handleGenerateRecommendations}
            disabled={!skinTone || !undertone || !eyeColor}
            style={styles.generateButton}
          >
            Generate Recommendations
          </Button>
        </View>

        <View style={styles.infoCard}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.accent} />
          <Text style={styles.infoText}>
            Our AI makeup artist will create personalized looks for Work, Date, Party, Wedding, and Evening occasions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  generateButton: {
    marginTop: 12,
  },
  infoCard: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
