import { useTheme } from "@/components/theme-picker/theme-provider";

export function useThemeRelatedAssetUrl() {
  const theme = useTheme();
  return (asset: string) => `/${theme.theme || "light"}/${asset}`;
}
