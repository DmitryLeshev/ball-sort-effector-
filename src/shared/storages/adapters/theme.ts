import * as storage from "../storage";

type Theme = string;

export async function setTheme(theme: Theme): Promise<void> {
  storage.setItem("theme", theme);
}

export async function getTheme(): Promise<Theme> {
  return await storage.getItem("theme");
}
