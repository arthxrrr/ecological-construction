/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// 🎨 Paleta de cores - Tema Construção & Segurança
const PRIMARY = '#F57C00'; // Laranja forte - energia e ação
const SECONDARY = '#424242'; // Cinza escuro - estabilidade
const SUCCESS = '#2E7D32'; // Verde construtivo - confirmação
const LIGHT_BG = '#FAFAFA'; // Cinza claro - fundo principal
const DARK_GRAY = '#757575'; // Cinza médio - textos secundários

const tintColorLight = PRIMARY;
const tintColorDark = PRIMARY;

export const Colors = {
  light: {
    text: SECONDARY,
    background: LIGHT_BG,
    tint: tintColorLight,
    icon: DARK_GRAY,
    tabIconDefault: DARK_GRAY,
    tabIconSelected: PRIMARY,
  },
  dark: {
    text: '#FFFFFF',
    background: '#1a1a1a',
    tint: PRIMARY,
    icon: DARK_GRAY,
    tabIconDefault: DARK_GRAY,
    tabIconSelected: PRIMARY,
  },
};

// Cores adicionais para uso específico
export const BrandColors = {
  primary: PRIMARY,
  secondary: SECONDARY,
  success: SUCCESS,
  warning: '#FF9800',
  danger: '#D32F2F',
  lightBg: LIGHT_BG,
  darkGray: DARK_GRAY,
  white: '#FFFFFF',
  border: '#E0E0E0',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
