
export const colors = {
  primary: '#2563EB', // Vibrant Blue
  primaryDark: '#1E40AF',
  primaryLight: '#60A5FA',
  secondary: '#F97316', // Vibrant Orange
  secondaryDark: '#C2410C',
  background: '#F8FAFC', // Very light blue-grey
  card: '#FFFFFF',
  text: '#0F172A', // Slate 900
  textSecondary: '#64748B', // Slate 500
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 20,
  round: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
};

export const shadows = {
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  light: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  }
};
