import { useTheme } from "@/components/theme-picker/theme-provider";

export function useThemeRelatedAssetUrl() {
  const theme = useTheme();
  if (theme.theme === "system")
    return (asset: string) =>
      `/${window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}/${asset}`;
  return (asset: string) => `/${theme.theme || "light"}/${asset}`;
}
