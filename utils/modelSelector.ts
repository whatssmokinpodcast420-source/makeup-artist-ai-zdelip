
/**
 * Model Selector Utility
 * Maps skin tones to appropriate model images from Unsplash
 * and provides product visualization on models with matching complexions
 */

export interface ModelImage {
  url: string;
  skinTone: string;
  undertone: string;
  description: string;
}

/**
 * Get a model image URL that matches the user's complexion
 */
export function getModelForComplexion(skinTone: string, undertone: string): ModelImage {
  const normalizedSkinTone = skinTone.toLowerCase();
  const normalizedUndertone = undertone.toLowerCase();

  // Map skin tones to appropriate Unsplash model images
  // These are high-quality beauty/makeup images with diverse skin tones
  const modelDatabase: Record<string, ModelImage[]> = {
    fair: [
      {
        url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80',
        skinTone: 'Fair',
        undertone: 'Cool',
        description: 'Fair skin with cool undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=800&q=80',
        skinTone: 'Fair',
        undertone: 'Warm',
        description: 'Fair skin with warm undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
        skinTone: 'Fair',
        undertone: 'Neutral',
        description: 'Fair skin with neutral undertones',
      },
    ],
    light: [
      {
        url: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80',
        skinTone: 'Light',
        undertone: 'Cool',
        description: 'Light skin with cool undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800&q=80',
        skinTone: 'Light',
        undertone: 'Warm',
        description: 'Light skin with warm undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
        skinTone: 'Light',
        undertone: 'Neutral',
        description: 'Light skin with neutral undertones',
      },
    ],
    medium: [
      {
        url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80',
        skinTone: 'Medium',
        undertone: 'Cool',
        description: 'Medium skin with cool undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
        skinTone: 'Medium',
        undertone: 'Warm',
        description: 'Medium skin with warm undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=800&q=80',
        skinTone: 'Medium',
        undertone: 'Neutral',
        description: 'Medium skin with neutral undertones',
      },
    ],
    tan: [
      {
        url: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800&q=80',
        skinTone: 'Tan',
        undertone: 'Cool',
        description: 'Tan skin with cool undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
        skinTone: 'Tan',
        undertone: 'Warm',
        description: 'Tan skin with warm undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80',
        skinTone: 'Tan',
        undertone: 'Neutral',
        description: 'Tan skin with neutral undertones',
      },
    ],
    deep: [
      {
        url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
        skinTone: 'Deep',
        undertone: 'Cool',
        description: 'Deep skin with cool undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
        skinTone: 'Deep',
        undertone: 'Warm',
        description: 'Deep skin with warm undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        skinTone: 'Deep',
        undertone: 'Neutral',
        description: 'Deep skin with neutral undertones',
      },
    ],
    dark: [
      {
        url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
        skinTone: 'Dark',
        undertone: 'Cool',
        description: 'Dark skin with cool undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
        skinTone: 'Dark',
        undertone: 'Warm',
        description: 'Dark skin with warm undertones',
      },
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        skinTone: 'Dark',
        undertone: 'Neutral',
        description: 'Dark skin with neutral undertones',
      },
    ],
  };

  // Find matching models for the skin tone
  const models = modelDatabase[normalizedSkinTone] || modelDatabase['medium'];

  // Try to match undertone, otherwise return first model
  const matchingModel = models.find(
    (model) => model.undertone.toLowerCase() === normalizedUndertone
  );

  return matchingModel || models[0];
}

/**
 * Get multiple model variations for a complexion
 * Useful for showing different looks on the same complexion
 */
export function getModelVariations(skinTone: string, undertone: string, count: number = 3): ModelImage[] {
  const normalizedSkinTone = skinTone.toLowerCase();
  
  const allModels: ModelImage[] = [
    // Fair skin models
    {
      url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80',
      skinTone: 'Fair',
      undertone: 'Cool',
      description: 'Fair skin with cool undertones',
    },
    {
      url: 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=800&q=80',
      skinTone: 'Fair',
      undertone: 'Warm',
      description: 'Fair skin with warm undertones',
    },
    // Light skin models
    {
      url: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80',
      skinTone: 'Light',
      undertone: 'Cool',
      description: 'Light skin with cool undertones',
    },
    {
      url: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800&q=80',
      skinTone: 'Light',
      undertone: 'Warm',
      description: 'Light skin with warm undertones',
    },
    // Medium skin models
    {
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
      skinTone: 'Medium',
      undertone: 'Warm',
      description: 'Medium skin with warm undertones',
    },
    {
      url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      skinTone: 'Medium',
      undertone: 'Neutral',
      description: 'Medium skin with neutral undertones',
    },
    // Tan skin models
    {
      url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80',
      skinTone: 'Tan',
      undertone: 'Cool',
      description: 'Tan skin with cool undertones',
    },
    // Deep/Dark skin models
    {
      url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
      skinTone: 'Deep',
      undertone: 'Cool',
      description: 'Deep skin with cool undertones',
    },
    {
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
      skinTone: 'Deep',
      undertone: 'Warm',
      description: 'Deep skin with warm undertones',
    },
    {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      skinTone: 'Deep',
      undertone: 'Neutral',
      description: 'Deep skin with neutral undertones',
    },
  ];

  // Filter models that match the skin tone category
  const matchingModels = allModels.filter(
    (model) => model.skinTone.toLowerCase() === normalizedSkinTone
  );

  // If we have matching models, return them, otherwise return similar tones
  if (matchingModels.length >= count) {
    return matchingModels.slice(0, count);
  }

  // Return similar skin tones if exact match not available
  return allModels.slice(0, count);
}

/**
 * Get occasion-specific model poses
 * Returns model images that match the occasion vibe
 */
export function getOccasionModel(
  skinTone: string,
  undertone: string,
  occasion: string
): ModelImage {
  const baseModel = getModelForComplexion(skinTone, undertone);
  
  // You could customize the image query parameters based on occasion
  // For now, we'll use the base model but this could be expanded
  return {
    ...baseModel,
    description: `${baseModel.description} - ${occasion} look`,
  };
}
