// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import react from "@astrojs/react";

export default defineConfig({
  integrations: [icon(), react()],
  site: 'https://wooczak.github.io',
  base: '/portfolio',
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },
});