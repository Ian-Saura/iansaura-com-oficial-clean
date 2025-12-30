/**
 * BETA FEATURES CONFIGURATION
 * Controls which features are in beta and who can access them
 */

export interface BetaFeature {
  id: string;
  name: string;
  description: string;
  allowedEmails: string[];
  enabled: boolean;
}

export const BETA_FEATURES: Record<string, BetaFeature> = {
  'spec-databricks': {
    id: 'spec-databricks',
    name: 'Databricks Specialization',
    description: 'Full access to Databricks specialization content',
    allowedEmails: [
      'iansauradata@gmail.com',
      // Add more beta testers here as needed
    ],
    enabled: true,
  },
  // Add more beta features here as needed
};

/**
 * Check if a user has beta access to a specific feature
 */
export const hasBetaAccess = (featureId: string, userEmail?: string | null): boolean => {
  if (!userEmail) return false;
  
  const feature = BETA_FEATURES[featureId];
  if (!feature || !feature.enabled) return false;
  
  const normalizedEmail = userEmail.toLowerCase().trim();
  return feature.allowedEmails.some(
    email => email.toLowerCase().trim() === normalizedEmail
  );
};

/**
 * Get all beta features a user has access to
 */
export const getUserBetaFeatures = (userEmail?: string | null): string[] => {
  if (!userEmail) return [];
  
  return Object.keys(BETA_FEATURES).filter(
    featureId => hasBetaAccess(featureId, userEmail)
  );
};

/**
 * Check if user is a beta tester (has access to any beta feature)
 */
export const isBetaTester = (userEmail?: string | null): boolean => {
  return getUserBetaFeatures(userEmail).length > 0;
};

