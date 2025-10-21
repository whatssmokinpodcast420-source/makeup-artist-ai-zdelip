
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, TextInput, Platform, ActivityIndicator, Image } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import Button from "@/components/button";
import CameraCapture from "@/components/CameraCapture";
import { analyzeImageWithAI, AIAnalysisResult } from "@/utils/aiAnalysis";

export default function HomeScreen() {
  const router = useRouter();
  const [skinTone, setSkinTone] = useState("");
  const [undertone, setUndertone] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [faceShape, setFaceShape] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleGenerateRecommendations = () => {
    console.log("Generating recommendations with:", { skinTone, undertone, eyeColor, faceShape });
    router.push({
      pathname: "/(tabs)/recommendations",
      params: { skinTone, undertone, eyeColor, faceShape }
    });
  };

  const handleImageCaptured = async (imageUri: string) => {
    console.log("Image captured:", imageUri);
    setCapturedImage(imageUri);
    setShowCamera(false);
    setIsAnalyzing(true);

    // Analyze the image with AI
    const analysis = await analyzeImageWithAI(imageUri);
    
    setIsAnalyzing(false);

    if (analysis) {
      // Auto-fill the form with AI results
      setSkinTone(analysis.skinTone);
      setUndertone(analysis.undertone);
      setEyeColor(analysis.eyeColor);
      setFaceShape(analysis.faceShape);
      
      console.log("AI Analysis complete:", analysis);
    }
  };

  const handleTakePhoto = () => {
    setShowCamera(true);
  };

  const handleRetakePhoto = () => {
    setCapturedImage(null);
    setSkinTone("");
    setUndertone("");
    setEyeColor("");
    setFaceShape("");
    setShowCamera(true);
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
            Take a selfie or enter your details for personalized recommendations
          </Text>
        </View>

        {/* Camera Section */}
        <View style={styles.cameraCard}>
          {capturedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: capturedImage }} style={styles.imagePreview} />
              <Pressable onPress={handleRetakePhoto} style={styles.retakeButton}>
                <IconSymbol name="camera.fill" size={20} color={colors.primary} />
                <Text style={styles.retakeButtonText}>Retake Photo</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={handleTakePhoto} style={styles.cameraButton}>
              <View style={styles.cameraIconContainer}>
                <IconSymbol name="camera.fill" size={48} color={colors.primary} />
              </View>
              <Text style={styles.cameraButtonTitle}>Take a Selfie</Text>
              <Text style={styles.cameraButtonSubtitle}>
                Let AI analyze your features automatically
              </Text>
            </Pressable>
          )}
        </View>

        {isAnalyzing && (
          <View style={styles.analyzingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.analyzingText}>Analyzing your features...</Text>
            <Text style={styles.analyzingSubtext}>This will only take a moment</Text>
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR ENTER MANUALLY</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Form Section */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Your Profile</Text>
          <Text style={styles.sectionDescription}>
            {capturedImage 
              ? "Review and adjust the AI-detected features below"
              : "Tell us about yourself to get the best recommendations"
            }
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
            disabled={!skinTone || !undertone || !eyeColor || isAnalyzing}
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

      {showCamera && (
        <CameraCapture
          onImageCaptured={handleImageCaptured}
          onClose={() => setShowCamera(false)}
        />
      )}
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
  cameraCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  cameraButton: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cameraIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cameraButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  cameraButtonSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.highlight,
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  analyzingCard: {
    backgroundColor: colors.highlight,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 4,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.textSecondary + '40',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: 16,
    letterSpacing: 0.5,
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
