import { theme } from "antd";

const defaultThemeConfig = {
  token: {
    fontFamily:
      "'Bricolage Grotesque', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

export const darkTheme = {
  algorithm: theme.darkAlgorithm,
  ...defaultThemeConfig,
};
export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  ...defaultThemeConfig,
};
