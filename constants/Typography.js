export const Typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },
};

// Pre-defined text styles
export const TextStyles = {
  h1: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.fontSize['4xl'] * Typography.lineHeight.tight,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  h2: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.fontSize['3xl'] * Typography.lineHeight.tight,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  h3: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semibold,
    lineHeight: Typography.fontSize['2xl'] * Typography.lineHeight.snug,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  h4: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    lineHeight: Typography.fontSize.xl * Typography.lineHeight.snug,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  body: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  bodyLarge: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  caption: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  small: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.fontSize.xs * Typography.lineHeight.normal,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
};