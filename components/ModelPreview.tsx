
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

interface ModelPreviewProps {
  modelImageUrl: string;
  skinTone: string;
  undertone: string;
  occasionName: string;
  occasionColor: string;
}

export default function ModelPreview({
  modelImageUrl,
  skinTone,
  undertone,
  occasionName,
  occasionColor,
}: ModelPreviewProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol name="person.fill" size={20} color={occasionColor} />
        <Text style={styles.headerText}>See This Look on Your Complexion</Text>
      </View>

      <View style={styles.modelImageContainer}>
        {imageLoading && !imageError && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading model preview...</Text>
          </View>
        )}

        {imageError ? (
          <View style={styles.errorContainer}>
            <IconSymbol name="photo" size={48} color={colors.textSecondary} />
            <Text style={styles.errorText}>Model preview unavailable</Text>
            <Text style={styles.errorSubtext}>
              {skinTone} skin • {undertone} undertone
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: modelImageUrl }}
            style={styles.modelImage}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            resizeMode="cover"
          />
        )}

        <View style={[styles.overlay, { backgroundColor: occasionColor + '15' }]}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle}>{occasionName} Look</Text>
            <Text style={styles.overlaySubtitle}>
              Model: {skinTone} • {undertone}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoBox}>
        <IconSymbol name="checkmark.circle.fill" size={16} color={colors.accent} />
        <Text style={styles.infoText}>
          This model has a similar complexion to yours, showing how these products will look on your skin tone.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  modelImageContainer: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.background,
    position: 'relative',
  },
  modelImage: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  overlayContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 12,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  overlaySubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
});
