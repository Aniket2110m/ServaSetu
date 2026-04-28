import type { CapacitorConfig } from "@capacitor/cli";

const appUrl = process.env.CAPACITOR_APP_URL || "https://servasetu.com";

const config: CapacitorConfig = {
  appId: "com.servasetu.app",
  appName: "ServaSetu",
  webDir: "public",
  server: {
    url: appUrl,
    cleartext: appUrl.startsWith("http://"),
    androidScheme: "https",
  },
};

export default config;
