export type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

export interface StrengthResult {
  level: StrengthLevel;
  score: number;
  label: string;
}

export function calculateStrength(password: string): StrengthResult {
  if (!password) {
    return { level: 'weak', score: 0, label: 'Too short' };
  }

  let score = 0;

  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety scoring
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  let level: StrengthLevel;
  let label: string;

  if (score <= 2) {
    level = 'weak';
    label = 'Weak';
  } else if (score <= 4) {
    level = 'fair';
    label = 'Fair';
  } else if (score <= 6) {
    level = 'good';
    label = 'Good';
  } else {
    level = 'strong';
    label = 'Strong';
  }

  return { level, score, label };
}