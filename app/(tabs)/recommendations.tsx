
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import ModelPreview from "@/components/ModelPreview";
import { getModelForComplexion } from "@/utils/modelSelector";

interface MakeupRecommendation {
  name: string;
  short_title: string;
  foundation_shade: string;
  lip_shade: string;
  eye_palette: string;
  blush_shade: string;
  brushes_needed: string[];
  look_summary: string;
  product_affiliate_urls: string[];
}

export default function RecommendationsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { skinTone, undertone, eyeColor, faceShape } = params;

  console.log("Received params:", { skinTone, undertone, eyeColor, faceShape });

  // Get model image for user's complexion
  const modelImage = getModelForComplexion(
    (skinTone as string) || 'Medium',
    (undertone as string) || 'Neutral'
  );

  // Mock recommendations - In a real app, this would come from an AI API
  const recommendations: MakeupRecommendation[] = [
    {
      name: "Work",
      short_title: "Natural Day Glow",
      foundation_shade: "Fenty Beauty Pro Filt'r - 240",
      lip_shade: "MAC Velvet Teddy",
      eye_palette: "Urban Decay Naked Basics - #D4A574, #8B7355",
      blush_shade: "NARS Orgasm",
      brushes_needed: ["Foundation brush", "Blending brush", "Lip brush"],
      look_summary: "A fresh, natural look perfect for the office with subtle definition and a healthy glow.",
      product_affiliate_urls: [
        "https://example.com/fenty-foundation",
        "https://example.com/mac-lipstick",
        "https://example.com/urban-decay-palette"
      ]
    },
    {
      name: "Date",
      short_title: "Romantic Evening",
      foundation_shade: "Fenty Beauty Pro Filt'r - 240",
      lip_shade: "Charlotte Tilbury Pillow Talk",
      eye_palette: "Huda Beauty Rose Gold - #C9A0A0, #8B4C4C",
      blush_shade: "Benefit Dandelion",
      brushes_needed: ["Foundation brush", "Eyeshadow brush", "Contour brush", "Lip brush"],
      look_summary: "Soft, romantic look with warm tones and a subtle shimmer for a date night.",
      product_affiliate_urls: [
        "https://example.com/fenty-foundation",
        "https://example.com/charlotte-tilbury",
        "https://example.com/huda-beauty"
      ]
    },
    {
      name: "Party",
      short_title: "Glamorous Night Out",
      foundation_shade: "Fenty Beauty Pro Filt'r - 240",
      lip_shade: "Anastasia Beverly Hills - Ruby",
      eye_palette: "Pat McGrath Mothership - #4A148C, #E1BEE7",
      blush_shade: "Too Faced Papa Don't Peach",
      brushes_needed: ["Foundation brush", "Blending brush", "Precision liner", "Highlight brush"],
      look_summary: "Bold, dramatic look with statement eyes and lips for a night of dancing.",
      product_affiliate_urls: [
        "https://example.com/fenty-foundation",
        "https://example.com/anastasia-lipstick",
        "https://example.com/pat-mcgrath"
      ]
    },
    {
      name: "Wedding",
      short_title: "Timeless Elegance",
      foundation_shade: "Fenty Beauty Pro Filt'r - 240",
      lip_shade: "MAC Ruby Woo",
      eye_palette: "Tom Ford Eye Color Quad - #D4AF37, #8B7355",
      blush_shade: "Hourglass Mood Exposure",
      brushes_needed: ["Foundation brush", "Powder brush", "Blending brush", "Lip brush", "Highlight brush"],
      look_summary: "Classic, elegant look that photographs beautifully and lasts all day.",
      product_affiliate_urls: [
        "https://example.com/fenty-foundation",
        "https://example.com/mac-ruby-woo",
        "https://example.com/tom-ford"
      ]
    },
    {
      name: "Evening",
      short_title: "Sophisticated Chic",
      foundation_shade: "Fenty Beauty Pro Filt'r - 240",
      lip_shade: "YSL Rouge Pur Couture - 70",
      eye_palette: "Natasha Denona Gold - #FFD700, #8B6914",
      blush_shade: "Dior Rosy Glow",
      brushes_needed: ["Foundation brush", "Contour brush", "Blending brush", "Lip brush"],
      look_summary: "Refined, sophisticated look with warm metallics for evening events.",
      product_affiliate_urls: [
        "https://example.com/fenty-foundation",
        "https://example.com/ysl-lipstick",
        "https://example.com/natasha-denona"
      ]
    }
  ];

  const getOccasionIcon = (occasion: string) => {
    switch (occasion) {
      case "Work":
        return "briefcase.fill";
      case "Date":
        return "heart.fill";
      case "Party":
        return "music.note";
      case "Wedding":
        return "gift.fill";
      case "Evening":
        return "moon.stars.fill";
      default:
        return "sparkles";
    }
  };

  const getOccasionColor = (occasion: string) => {
    switch (occasion) {
      case "Work":
        return "#6200EE";
      case "Date":
        return "#E91E63";
      case "Party":
        return "#FF6F00";
      case "Wedding":
        return "#00BCD4";
      case "Evening":
        return "#9C27B0";
      default:
        return colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Your Looks",
            headerLargeTitle: false,
            headerBackTitle: "Back",
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
          <IconSymbol name="sparkles" size={48} color={colors.primary} />
          <Text style={styles.title}>Your Personalized Looks</Text>
          <View style={styles.profileSummary}>
            <Text style={styles.profileText}>
              Skin: {skinTone} • Undertone: {undertone} • Eyes: {eyeColor}
            </Text>
          </View>
        </View>

        {recommendations.map((rec, index) => (
          <View key={index} style={styles.recommendationCard}>
            <View style={[styles.occasionHeader, { backgroundColor: getOccasionColor(rec.name) + '20' }]}>
              <IconSymbol name={getOccasionIcon(rec.name)} size={32} color={getOccasionColor(rec.name)} />
              <View style={styles.occasionTitleContainer}>
                <Text style={styles.occasionName}>{rec.name}</Text>
                <Text style={styles.shortTitle}>{rec.short_title}</Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              {/* Model Preview Section */}
              <ModelPreview
                modelImageUrl={modelImage.url}
                skinTone={skinTone as string}
                undertone={undertone as string}
                occasionName={rec.name}
                occasionColor={getOccasionColor(rec.name)}
              />

              <Text style={styles.lookSummary}>{rec.look_summary}</Text>

              <View style={styles.productsGrid}>
                <View style={styles.productSection}>
                  <View style={styles.productHeader}>
                    <IconSymbol name="drop.fill" size={16} color={getOccasionColor(rec.name)} />
                    <Text style={styles.productLabel}>Foundation</Text>
                  </View>
                  <Text style={styles.productValue}>{rec.foundation_shade}</Text>
                </View>

                <View style={styles.productSection}>
                  <View style={styles.productHeader}>
                    <IconSymbol name="paintbrush.fill" size={16} color={getOccasionColor(rec.name)} />
                    <Text style={styles.productLabel}>Lip Shade</Text>
                  </View>
                  <Text style={styles.productValue}>{rec.lip_shade}</Text>
                </View>

                <View style={styles.productSection}>
                  <View style={styles.productHeader}>
                    <IconSymbol name="eye.fill" size={16} color={getOccasionColor(rec.name)} />
                    <Text style={styles.productLabel}>Eye Palette</Text>
                  </View>
                  <Text style={styles.productValue}>{rec.eye_palette}</Text>
                </View>

                <View style={styles.productSection}>
                  <View style={styles.productHeader}>
                    <IconSymbol name="heart.fill" size={16} color={getOccasionColor(rec.name)} />
                    <Text style={styles.productLabel}>Blush</Text>
                  </View>
                  <Text style={styles.productValue}>{rec.blush_shade}</Text>
                </View>
              </View>

              <View style={styles.brushesSection}>
                <Text style={styles.brushesTitle}>Tools You'll Need</Text>
                <View style={styles.brushesList}>
                  {rec.brushes_needed.map((brush, idx) => (
                    <View key={idx} style={styles.brushItem}>
                      <IconSymbol name="checkmark.circle.fill" size={14} color={colors.accent} />
                      <Text style={styles.brushText}>{brush}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.affiliateSection}>
                <Text style={styles.affiliateTitle}>Shop This Look</Text>
                {rec.product_affiliate_urls.map((url, idx) => (
                  <Pressable key={idx} style={styles.affiliateButton}>
                    <View style={styles.affiliateButtonContent}>
                      <IconSymbol name="bag.fill" size={18} color={colors.primary} />
                      <Text style={styles.affiliateButtonText}>Product {idx + 1}</Text>
                    </View>
                    <IconSymbol name="arrow.right" size={16} color={colors.primary} />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        ))}

        {Platform.OS !== 'ios' && (
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="arrow.left" size={20} color={colors.text} />
            <Text style={styles.backButtonText}>Back to Profile</Text>
          </Pressable>
        )}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  profileSummary: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  recommendationCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  occasionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  occasionTitleContainer: {
    flex: 1,
  },
  occasionName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  shortTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  cardContent: {
    padding: 20,
  },
  lookSummary: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  productsGrid: {
    gap: 16,
    marginBottom: 20,
  },
  productSection: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  productLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    lineHeight: 20,
  },
  brushesSection: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  brushesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  brushesList: {
    gap: 8,
  },
  brushItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brushText: {
    fontSize: 14,
    color: colors.text,
  },
  affiliateSection: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.textSecondary + '30',
  },
  affiliateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  affiliateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.highlight,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  affiliateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  affiliateButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
